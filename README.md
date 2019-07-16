
# sb-util Proposal (RFC)

We at Bocoup propose **sb-util**, a JavaScript and CLI utility that allows developers to query a Scratch Project for collections of sprites, blocks, assets, and project metadata.

sb-util will accomplish this by consuming ***.sb3** files generate by Scratch. **.sb3** files are used to save and load projects, and within an *.sb3 file there is a **project.json**, which is the JSON representation of the entities within a Scratch project. sb-util will provide an API that allows developers to query the project.json for project information.

The resulting tool should be usable in test suites, scripts, and applications.

## Javascript API Proposal

### **Loading a Scratch Project**
sb-util exposes loading functions to asynchronously instantiate a **ScratchProject**
 object. These loading functions handle file I/O and HTTP request handling, decoupling that process from the ScratchProject object itself.

 ---

**loadSb3(*sb3File*)**

Parameter(s): *sb3File*. String representing local file location of an *.sb3 file or a URI to an *.sb3 file   
Return: *Promise*. This Promise object will resolve to a ScratchProject

```
const sp = await loadSb3('foo.sb3');
```

**loadProjectJson(*projectJsonFile*)**

Parameter(s): *projectJsonFile*. String representing local file location of an project.json file or a URI to an project.json file   
Return: *Promise*. This Promise object will resolve to a ScratchProject

```
const sp = await loadProjectJson('project.json');
```

**loadCloudId(*cloudId*)**

Parameter(s): *cloudId*. Number representing a Cloud ID in Scratch   
Return: *Promise*. This Promise object will resolve to a ScratchProject  

```
const sp = await loadCloudId(123456);
```

---

### ScratchProject

**ScratchProject(*projectJSON*, *assetFetcher*)**  
A *ScratchProject* gets initialized by an object, represented by the project.json. The *assetFetcher* is an optional constructor argument that represents an object is responsible for retrieving asset buffers for an Asset object.

```
const { ScratchProject } - require('sb-util');

// Use the above loading methods or directly instantiate:
const sp = new ScratchProject(projectJson);
```

**Methods**

---

**assets()**  
Return: *AssetCollection* representing all the assets of a project
```
let assets = sp.assets()
```

**blocks()**  
Return: *BlockCollection* representing all the blocks in the project. This *BlockCollection* can be further filtered to get specific blocks
```
let blocks = sp.blocks();
```

**sprites(...args)**  
Return: *SpriteCollection* representing all sprites in the project. A selector syntax can be passed to this function to get sprites that meet the syntax criteria
```
let sprites = sp.sprites();

let stage = sp.sprites('[isStage=true]').pop();
let sprite1 = sp.sprites('[name="Cat"]').pop(); 
```

**stage()**
Return: *SpriteCollection* singleton collection containing a Sprite object for stage
```
let stage = sp.stage();
```

**variables()**
Return: a list of *Variable* objects in the project
```
let vars = sp.variables();
``` 
---

### SpriteCollection

A *SpriteCollection* represents an iterable collection of Sprite objects. Array methods such as *map()*, *filter()*, and *pop()* are available.

**Methods**

---

**query(selector)**
Paramter: *selector* string in the CSS selector syntax style.
Return: *SpriteCollection*

```
let stage = sp.sprites('[isStage=true]').pop();
let sprite1 = sp.sprites('[name="Cat"]').pop();
```

Possible selector syntax:  
| Sprite Attribute | Selector Syntax                                                  |
| ---------------- |:----------------------------------------------------------------:|
| isStage          | [isStage={true or false}]                                        |
| layerOrder       | [layerOrder={a number}]                                          |
| draggable        | [draggable={true or false}]                                      |
| rotationStyle    | [rotationStyle={"all around" or "left-right" or "don't rotate"}] |

---

 ## CLI Proposal

 *Coming soon*

---

# Development
sb-util is implemented in TypeScript and will be available as a JavaScript library on [npm](https://www.npmjs.com/package/sb-util) and as a CLI tool.

## Build
```
npm run build
```

## Run Tests
```
npm test
```
