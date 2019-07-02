const jp = require('jsonpath');
const fs = require('fs');
const util = require('util');

let wm = new WeakMap();

class Queryable {
  constructor(targets) {
    wm.set(this, targets);
    this.validTypes = [ 'stage', 'sprite', 'block', 'asset']
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
    const node = selectors.filter(s => !s.includes(':') && !this.validTypes.includes(s)).pop();

    return { type, properties, node };
  }


  query(selector) {
    const { type, properties, node } = this.parseQuery(selector);
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
      }
    } else {
      unfilteredTargets = this.get('*');
    }


    //Filter the attributes
    let targets = !Array.isArray(properties) || !properties.length ? unfilteredTargets : unfilteredTargets.map(s => {
        let newObj = {};
        properties.forEach(p => {
          newObj[p] = s[p];
        })
        return newObj;
      });

    return targets;
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

    this.sprites = [];
    if (Array.isArray(target)) {
      this.sprites = target.map(t => new Sprite(t));
    }

    this.index = 0;
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.index < this.sprites.length) {
          return {value: this.sprites[this.index++], done: false};
        } else {
          this.index = 0; //If we would like to iterate over this again without forcing manual update of the index
          return {done: true};
        }
      }
    };
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

    this.blocks = [];
    if (Array.isArray(target)) {
      this.blocks = target.map(t => new Block(t));
    }

    this.index = 0;
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.index < this.blocks.length) {
          return {value: this.blocks[this.index++], done: false};
        } else {
          this.index = 0; //If we would like to iterate over this again without forcing manual update of the index
          return {done: true};
        }
      }
    };
  }

  query(selector) {

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
      return new BlockCollection(collection);
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

let sprites = sp.query('sprite :name :currentCostume :layerOrder');
console.log('Logging sprites:');
for( let s of sprites ){
  console.log(s);
}
console.log('\n\n\n');

let blockIds = sp.query('block :id :opcode');
console.log('Logging blocks with attributes:');
for (let b of blockIds){
  console.log(b);
}
console.log('\n\n\n');


let blocks = sp.query('block control_if_else');
console.log('Logging control_if_else blocks:')
console.log(blocks)
console.log('\n\n\n');


let stage = sp.query('stage');
console.log('Logging stage:');
for( let s of stage ){
  console.log(s);
}


