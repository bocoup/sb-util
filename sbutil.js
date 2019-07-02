const jp = require('jsonpath');
const fs = require('fs');
const util = require('util');

let wm = new WeakMap();

class Queryable {
  constructor(targets) {
    wm.set(this, targets);
  }

  get(property = '*') {
      return property == '*' ? wm.get(this) : wm.get(this)[property];
  }

  [util.inspect.custom](depth, options) {
    return wm.get(this);
  }


  * query(selector='') {
    const data = wm.get(this);
    yield* jp.query(data, selector).map(d => new Queryable(d));
  }
}

class Sprite extends Queryable {
  constructor(target) {
    super(target);
  }
}

class SpriteCollection extends Sprite {
  constructor(targets) {
    super(targets);
  }

  query(selector) {
    let [type, ...selectors] = selector.split(" ");
    const properties = selectors.filter(s => s.includes(":")).map(s => s.substring(1));
    const collection = this.get('*');

    let unfilteredTargets, unfilteredBlocks;

    if (type === 'stage') {
      unfilteredTargets = jp.query(collection, '$..[?(@.isStage==true)]');
    } else if (type === 'sprite') {
      unfilteredTargets = jp.query(collection, '$..[?(@.isStage==false)]');
    } else if (type === 'blocks') {
      unfilteredTargets = [];
      unfilteredBlocks = jp.query(collection, '$..blocks');
      unfilteredBlocks.map(u => {
        Object.keys(u).map(k => unfilteredTargets.push(Object.assign({},{id: k}, u[k])));
        return unfilteredTargets;
      })
    } else {
      return this.get('*').map(s => new Sprite(s));
    }

    //Filter the attributes
    let sprites = !Array.isArray(selectors) || !selectors.length ? unfilteredTargets : unfilteredTargets.map(s => {
        let newObj = {}
        properties.forEach(p => {
          newObj[p] = s[p]
        })
        return newObj;
      });


    return sprites.map(s => new Sprite(s));
  }
}

/**
  The ScratchProject class will have functionality to read a project.json, an .sb* file, and a JSON input.
*/
class ScratchProject extends SpriteCollection {
  constructor(targets) {
    super(targets);
  }

  query(selector) {
    return super.query(selector)
  }
}

//----------------------------------
// Main
//----------------------------------

const fileTargets = JSON.parse(fs.readFileSync('/Users/erikamiguelyeo/repos/evmiguel/sb3s/simple/project.json', 'utf-8')).targets;
const sp = new ScratchProject(fileTargets);

let sprites = sp.query('sprite :currentCostume');
console.log('Logging sprites:');
for( let s of sprites ){
  console.log(s);
}
console.log('\n\n\n');

let blocks = sp.query('blocks :id :opcode');
console.log('Logging blocks:');
for (let b of blocks){
  console.log(b);
}
console.log('\n\n\n');


let stage = sp.query('stage');
console.log('Logging stage:');
for( let s of sprites ){
  console.log(s);
}




