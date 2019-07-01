const jp = require('jsonpath');
const fs = require('fs');

let wm = new WeakMap();

class Queryable {
  constructor(targets) {
    wm.set(this, targets);
  }

  get(property = '*') {
      return property == '*' ? wm.get(this) : wm.get(this)[property];
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
    let sprites;
    if (selector === 'stage') {
      sprites = jp.query(wm.get(this), '$..[?(@.isStage==true)]').map(s => new Sprite(s));
    } else if (selector === 'sprite') {
      sprites = jp.query(wm.get(this), '$..[?(@.isStage==false)]').map(s => new Sprite(s));
    }

    return sprites;
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

let sprites = sp.query('sprite');
for (let s of sprites) {
  console.log(s.get('*'))
}



