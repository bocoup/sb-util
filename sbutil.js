const jp = require('jsonpath');
const fs = require('fs');
const util = require('util');

let wm = new WeakMap();

class Queryable {
  constructor(targets) {
    wm.set(this, targets);
    this.validTypes = [ 'stage', 'sprite', 'block', 'asset']
    this.index = 0;
  }

  get(property = '*') {
      return property == '*' ? wm.get(this) : wm.get(this)[property];
  }

  [util.inspect.custom](depth, options) {
    return wm.get(this);
  }

  parseQuery(selector) {
    if (selector.charAt(0) === ':') selector = "* "+selector;
    let selectors = selector.split(" ");

    const type = selectors.filter(s => this.validTypes.includes(s)).pop();
    const properties = selectors.filter(s => s.includes(":")).map(s => s.substring(1));
    const node = selectors.filter(s => !s.includes(':') && !s.includes('.') && !this.validTypes.includes(s)).pop();
    const blockTypes = selector.split(' ').filter(s => s.includes('.')).map(s => s.substring(1));


    return { type, properties, node, blockTypes };
  }

  filterProperties(targets, properties){
    //Filter the attributes
    return !Array.isArray(properties) || !properties.length ? targets : targets.map(s => {
      let newObj = {};
      properties.forEach(p => {
        newObj[p] = s[p];
      })
      return newObj;
    });
  }


  query(selector) {
    const { type, properties, node, blockTypes } = this.parseQuery(selector);
    const collection = this.get('*');

    let unfilteredTargets, unfilteredBlocks;

    if (type === 'stage') {
      unfilteredTargets = jp.query(collection, '$..[?(@.isStage==true)]');
    } else if (type === 'sprite') {
      unfilteredTargets = jp.query(collection, '$..[?(@.isStage==false)]');
    } else if (type === 'block') {
      unfilteredTargets = [];
      unfilteredBlocks = jp.query(collection, '$..blocks');
      unfilteredBlocks.map(u => {
        Object.keys(u).map(k => unfilteredTargets.push(Object.assign({},{id: k}, u[k])));
        return unfilteredTargets;
      })

      if(node) {
        unfilteredTargets = jp.query(unfilteredTargets, `$..[?(@.opcode=="${node}")]`);
      } else if (blockTypes.length > 1) {
        for (let type of blockTypes) {
          unfilteredTargets = unfilteredTargets.concat(collection.filter(c => c.get('opcode').includes(type)));
        }  
      }
    } else {
      unfilteredTargets = this.get('*');
    }

    return this.filterProperties(unfilteredTargets, properties);
  }

  toObject(){
    let obj = {}
    Object.entries(this.get('*')).forEach(([k, v]) => {
      obj[k] = v;
    })

    return obj;
  }

  [Symbol.iterator]() {
    const collection = this.get('*');
    return {
      next: () => {
        if (this.index < collection.length) {
          return {value: collection[this.index++], done: false};
        } else {
          this.index = 0; //If we would like to iterate over this again without forcing manual update of the index
          return {done: true};
        }
      }
    };
  }
}

class Sprite extends Queryable {
  constructor(target) {
    super(target);
  }
}

class SpriteCollection extends Sprite {
  constructor(target) {
    super(target);
  }
}

class Block extends Queryable {
  constructor(target) {
    super(target);
  }
}

class BlockCollection extends Block {
  constructor(target) {
    super(target);
  }


  query(selector) {
    // Only interested in properties and node because the implicit type is 'block'
    const { properties, node, blockTypes } = this.parseQuery(selector);
    const collection = this.get('*');

    let blocks;
    if (blockTypes.length > 0) {
      blocks = super.query(`block ${selector}`);
    } else {
      const blocksObjs = collection.map(b => b.toObject());
      blocks = jp.query(blocksObjs, `$..[?(@.opcode=="${node}")]`);
    }
    
    return new BlockCollection(this.filterProperties(blocks, properties).map(b => new Block(b)));
  }

  text(node = this.get('*')[0]) {
    console.log(node.get('opcode'))
    if (node.get('next') === null) {
      return;
    }
    const next = this.get('*').filter(b => b.get('id') === node.get('next')).pop();
    this.text(next);
  }
}

/**
  The ScratchProject class will have functionality to read a project.json, an .sb* file, and a JSON input.
*/
class ScratchProject extends Queryable {
  constructor(targets) {
    super(targets);
  }

  query(selector) {
    const { type, properties } = this.parseQuery(selector);
    const collection = super.query(selector);
    if ( type === 'stage' || type === 'sprite') {
      return new SpriteCollection(collection);
    } else if (type === 'block') {
      return new BlockCollection(collection.map(c => new Block(c)));
    } else {
      return new SpriteCollection(collection);
    }
  }
}

//----------------------------------
// Main
//----------------------------------

const fileTargets = JSON.parse(fs.readFileSync('/Users/erikamiguelyeo/repos/evmiguel/sb3s/simple/project.json', 'utf-8')).targets;
const sp = new ScratchProject(fileTargets);

// let stage = sp.query('stage');
// console.log('Logging stage:');
// for( let s of stage ){
//   console.log(s);
// }
// console.log('\n\n\n');

// let sprites = sp.query('sprite :name :currentCostume :layerOrder');
// console.log('Logging sprites:');
// for( let s of sprites ){
//   console.log(s);
// }
// console.log('\n\n\n');

// let blockIds = sp.query('block :id :opcode');
// console.log('Logging blocks with attributes:');
// for (let b of blockIds){
//   console.log(b);
// }
// console.log('\n\n\n');


// let ifElseBlocks = sp.query('block control_if_else');
// console.log('Logging control_if_else blocks:')
// console.log(ifElseBlocks)
// console.log('\n\n\n');

// let blocks = sp.query('block');
// let controlIfElseBlock = blocks.query('control_if_else');
// let controlAndSendingBlocks = blocks.query('.control .sensing');

let spriteOfBlock = sp.query('sprite block');
spriteOfBlock.text();
