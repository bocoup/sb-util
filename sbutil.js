const jp = require('jsonpath');
const fs = require('fs');
const util = require('util');

let wm = new WeakMap();

//--------------------------------------------------------------------------------------------------------------------------

class Queryable {
  constructor(targets) {
    wm.set(this, targets);
    this.validTypes = [ 'stage', 'sprite', 'block', 'asset']
    this.index = 0;
  }

  get(property = '*') {

      // Hacky but this is throwaway code; In the implementation, we do not want to expose the inputs.  
      Object.assign(this, wm.get(this));
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

//--------------------------------------------------------------------------------------------------------------------------

class Sprite extends Queryable {
  constructor(target) {
    super(target);
  }

  currentCostume() {
    return this.get('currentCostume')
  }
}

class SpriteCollection extends Sprite {
  constructor(target) {
    super(target);
  }

  currentCostume() {
    let costumes = [];
    this.get('*').forEach(s => costumes.push(s.currentCostume()));
    return costumes;
  }

  map(f) {
    const mapped = [];
    for (const s of this) {
      mapped.push(f(s.toObject()));
    }
    return new SpriteCollection(mapped.map(s => new Sprite(s)));
  }

  find(f) {
    const found = [];
    for (const s of this) {
      found.push(f(s));
    }
    return new SpriteCollection(found.map(s => new Sprite(s)));
  }

  blocks() {
    let blocks = [];
    for (const s of this){
      blocks = blocks.concat(s.query('block'));
    }
    return new BlockCollection(blocks.map(b => new Block(b)));
  }
}

//--------------------------------------------------------------------------------------------------------------------------

class Block extends Queryable {
  constructor(target) {
    super(target);
  }
}

//--------------------------------------------------------------------------------------------------------------------------

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

  filter(blockType) {
    return this.query(blockType);
  }

  text(node = this.get('*')[0], space='') {
    console.log(`${space}${node.get('opcode').trim()}`);
    const nextAttr = node.get('next');
    const inputs = node.get('inputs');
    const fields = node.get('fields');


    const substacks = Object.entries(inputs)
                          .filter(([k,v]) => k.includes('SUBSTACK')).map(([k,v]) => [k.replace('SUBSTACK', ''), v]).sort((a,b) => {
                            return b[0] < a[0];
                          }).map(([k,v]) => v[1]);

    
    if ('CONDITION' in inputs) {
      const [shadow, conditionId] = inputs['CONDITION'];
      const nextNode = this.get('*').filter(b => b.get('id') === conditionId).pop();
      this.text(nextNode, space+' ');
    }

    if ('KEY_OPTION' in inputs) {
      const [shadow, keyId] = inputs['KEY_OPTION'];
      const nextNode = this.get('*').filter(b => b.get('id') === keyId).pop();
      this.text(nextNode, space+' ');
    }

    if ('KEY_OPTION' in fields) {
      const [key, ...rest] = fields['KEY_OPTION'];
      console.log(`${space} ${key}`)
    }
    

    // explore the substack if there
    if (substacks) {
      let index = 0;
      substacks.forEach(s => {
        const nextNode = this.get('*').filter(b => b.get('id') === s).pop();
        this.text(nextNode, space+' ');
        index++;
      })
    }

    if (nextAttr === null) {
      return;
    }

    const nextNode = this.get('*').filter(b => b.get('id') === nextAttr).pop();
    this.text(nextNode, space+' ');
  }
}

//--------------------------------------------------------------------------------------------------------------------------

/**
  The ScratchProject class will have functionality to read a project.json, an .sb* file, and a JSON input.

  To send raw queries to the Queryable interface, use the query syntax as follows:

    Three main types: stage, sprite, block
    Object properties: use the CSS pseudo-class syntax, such as :currentCostume, :opcode, :layerOrder, etc
    Block type: will be filtered out from [stage, sprite, block], so do not add any punctuation. An example is
                  super.query('block control_if_else')
*/
class ScratchProject extends Queryable {
  constructor(targets) {
    super(targets);
  }

  sprites(options) {
    if (options) {
      const sprites = this.query('sprite');
      sprites.find(s => {
        Object.entries(options).forEach(([k,v]) => {
          if (s.get(k) === v) return s;
        })
      })
      //this.query('sprite').filter(s => )
    }
    return this.query('sprite');
  }

  stage() {
    return this.query('stage');
  }

  blocks() {
    return this.query('block');
  }

  query(selector) {
    const { type, properties } = this.parseQuery(selector);
    const collection = super.query(selector);
    if ( type === 'stage' || type === 'sprite') {
      return new SpriteCollection(collection.map(c => new Sprite(c)));
    } else if (type === 'block') {
      return new BlockCollection(collection.map(c => new Block(c)));
    } else {
      return new SpriteCollection(collection.map(c => new Sprite(c)));
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------------

//----------------------------------
// MAIN
//----------------------------------

const fileTargets = JSON.parse(fs.readFileSync('/Users/erikamiguelyeo/repos/evmiguel/sb3s/simple/project.json', 'utf-8')).targets;
const sp = new ScratchProject(fileTargets);

//----------------------------------
// STAGE EXAMPLE
//----------------------------------
let stage = sp.stage();
console.log('Logging stage:');
for( let s of stage ){
  console.log(s);
}
console.log('\n\n\n');

//----------------------------------
// SPRITES EXAMPLES
//----------------------------------
let sprites = sp.sprites();
console.log('Logging sprites:');
for( let s of sprites ){
  console.log(s);
}
console.log('\n\n\n');

console.log('Logging sprite costumes:');
console.log(sprites.currentCostume());
console.log('\n\n\n');

console.log('Logging sprite mapping:');
sprites.map(
  ({name, currentCostume, layerOrder, rotationStyle}) => console.log(
      {name, currentCostume, layerOrder, rotationStyle}));
console.log('\n\n\n');


let blocks = sp.blocks();
console.log('Logging blocks:');
for (let b of blocks){
  console.log(b);
}
console.log('\n\n\n');


let ifElseBlocks = blocks.filter('control_if_else');
console.log('Logging control_if_else blocks:');
console.log(ifElseBlocks);
console.log('\n\n\n');

console.log('Logging blocks for Sprite1:')
const sprite1Blocks = sp.sprites({name: 'Sprite1'}).blocks();
console.log(sprite1Blocks);
console.log('\n\n\n');

console.log('Logging control and sensing blocks for Sprite1:')
const controlAndSensing = sprite1Blocks.query('.control .sensing');
console.log(controlAndSensing);
console.log('\n\n\n');


console.log('Logging find of control if else for Sprite1:')
console.log(controlAndSensing.query('control_if_else'));
console.log('\n\n\n');


console.log('Logging text version of connected blocks:');
console.log('----------------------------------------');

sprite1Blocks.text();
