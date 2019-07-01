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

    let unfilteredSprites;
    let sprites;

    if (type === 'stage') {
      unfilteredSprites = jp.query(this.get('*'), '$..[?(@.isStage==true)]');
    } else if (type === 'sprite') {
      unfilteredSprites = jp.query(this.get('*'), '$..[?(@.isStage==false)]');
    } else {
      return this.get('*').map(s => new Sprite(s));
    }

    //Filter the attributes
    sprites = !Array.isArray(selectors) || !selectors.length ? unfilteredSprites : unfilteredSprites.map(s => {
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
for( let s of sprites ){
  console.log(s)
}

let stage = sp.query('stage');
for( let s of sprites ){
  console.log(s)
}




