
# sb-util

## Table of Contents
- [sb-util Proposal (RFC)](https://github.com/bocoup/sb-util/tree/readme-api-proposal#sb-util-proposal-rfc)
  - [JavaScript API Proposal](https://github.com/bocoup/sb-util/tree/readme-api-proposal#sb-util-proposal-rfc)
  - [CLI Proposal](https://github.com/bocoup/sb-util/tree/readme-api-proposal#sb-util-proposal-rfc)
- [Development](https://github.com/bocoup/sb-util/tree/readme-api-proposal#development)

---

## sb-util Proposal (RFC)

We, at Bocoup, propose **sb-util**, a JavaScript and CLI utility that allows developers to query a Scratch Project for collections of sprites, blocks, assets, and project metadata.

sb-util will accomplish this by consuming **.sb3** files generate by Scratch. **.sb3** files are used to save and load projects, and within an *.sb3 file there is a **project.json**, which is the JSON representation of the entities within a Scratch project. sb-util will provide an API that allows developers to query the project.json for project information.

The resulting tool should be usable in test suites, scripts, and applications.

## Javascript API Proposal

- [Loading a Scratch Project](https://github.com/bocoup/sb-util/tree/readme-api-proposal#javascript-api-proposal)
- [ScratchProject](https://github.com/bocoup/sb-util/tree/readme-api-proposal#scratchproject)
- [SpriteCollection](https://github.com/bocoup/sb-util/tree/readme-api-proposal#spritecollection)
- [Sprite](https://github.com/bocoup/sb-util/tree/readme-api-proposal#sprite)
- [BlockCollection](https://github.com/bocoup/sb-util/tree/readme-api-proposal#blockcollection)
- [Block](https://github.com/bocoup/sb-util/tree/readme-api-proposal#block)
- [AssetCollection](https://github.com/bocoup/sb-util/tree/readme-api-proposal#assetcollection)
- [Asset](https://github.com/bocoup/sb-util/tree/readme-api-proposal#asset)


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
Return: *Sprite* a stage
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

A *SpriteCollection* represents an iterable collection of objects that represent Sprites. Array methods such as *map()*, *filter()*, and *pop()* are available.

**Methods**

**query(selector)**
Parameter(s): *selector* string in the CSS selector syntax style.
Return: *SpriteCollection*

```
let stage = sp.sprites('[isStage=true]');
let sprite1 = sp.sprites('[name="Cat"]');
```

Possible selector syntax, in attribute selector style:  

| Sprite Attribute | Selector Syntax                                                  |
| ---------------- |------------------------------------------------------------------|
| isStage          | [isStage={true or false}]                                        |
| layerOrder       | [layerOrder={a number}]                                          |
| draggable        | [draggable={true or false}]                                      |
| rotationStyle    | [rotationStyle={"all around" or "left-right" or "don't rotate"}] |

---

### Sprite

A *Sprite* is a singleton of *SpriteCollection*, with additional methods that are specific to a single Sprite. A Sprite can be a stage or an individual sprite.

**Methods**   

**blocks()**  
Return: *BlockCollection*
```
const sprite = sp.sprites('[name="Cat"]');
const blocks = sprite.blocks();
```

**assets()**  
Return: *AssetCollection*
```
const assets = sprite.assets();
```

**position()**  
Return: the (X, Y) cooredinates of a Sprite in Object notation
```
const { x, y } = sprite.position();
```

**broadcasts()**  
Return: a list of Objects representing a broadcast, which contains an id and a message
```
const broadcasts = sprite.broadcasts();

// A mapping example
broadcasts.map(({id: messageId, message}) => ({ messageId, message }));
```

**lists()**  
Return: a list of Objects representing a list, which contains an id, name, and an  Array of values

```
const lists = sprite.lists();

lists.map(({id: listId, name: listName, values}) => ({listId, listName, values}));
```

---
### BlockCollection

A *BlockCollection* represents and iterable collection of objects that represent Blocks. Array methods such as *map()*, *filter()*, and *pop()* are available.

**Methods**

**query(selector)**
Parameter(s): *selector*, a string with the convention similar to CSS selector syntax  
Return: *BlockCollection*

This is a mapping of Block object attributes to selector syntax:  

| Block Attribute     | CSS-like Selector Syntax      |
| --------------------|-------------------------------|
| opcode ([Full set of opcodes](https://github.com/LLK/scratch-vm/tree/develop/src/blocks )) | Type selector. `blocks.query('event_whenflagclicked')` or `blocks.query('control_if_else')`| 
| block type ([Full set of block types](https://en.scratch-wiki.info/wiki/Blocks#List_of_Blocks)) | Class selector. `blocks.query('.motion')` or `blocks.query('.sensing')` |
| block shape ([Full set of block shapes](https://en.scratch-wiki.info/wiki/Blocks#Block_Shapes))| Pseudo class selector. `blocks.query(':hat')` or `blocks.query(':reporter')` |

The selector syntax can be combined for more fine-grained filtering.  

**Get all motion reporter blocks**
```
const motionReporterBlocks = blocks.query('.motion :reporter');
```

**renderToText()**  
Return: a text representation of blocks that are connected. The output will be a consumable JSON format, which can be written to a file and also be converted to YAML

```
const sprite1Blocks = sp.sprites({name: 'Sprite1'}).blocks();
const blockTextRepresentation = sprite1Blocks.renderToText()

// Output
{
    "blockGroups" : [
        // First group of blocks
        {
            "output": [
                "event_whenflagclicked",
                {
                    "control_if_else" : {
                        "if": {
                            "condition" : {
                                "sensing_keypressed": {
                                    "sensing_keyoptions": "space"
                                }
                            }
                        },
                        "then": [
                            {
                                "data_changevariableby": {
                                    "variable": "my variable",
                                    "value": 10
                                }
                            },
                            {
                                "motion_gotoxy": {
                                    "X": "my variable",
                                    "Y": 10
                                }
                            }
                        ],
                        "else": [
                            {
                                "control_wait_until": {
                                    "sensing_keypressed": {
                                        "sensing_keyoptions": "space"
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        },
        // Second group of blocks
        {
            "output": { ... }
        }
    ]
}
```
---

### Block

A *Block* is a singleton of *BlockCollection*. It has additional methods, specific to the data held by an individual block.

**Methods**

**args(selector)**  
This method is similar to *query*. *args* returns the inputs or fields (depending on the query string) of a block using one of the strings defined below. Certain query strings can return an input or a field.

A sample of selector values for the *args* method is defined in this table: 

| Inputs                       | Fields                      | Both Input and Field   |
|------------------------------|-----------------------------|------------------------|
| X, Y, DURATION, MESSAGE, SECS CONDITION, SUBSTACK, OPERAND, TIMES, CHANGE, FROM, VALUE, BROADCAST_INPUT, BACKDROP, VOLUME, NUM1, NUM2 | EFFECT, BROADCAST_OPTION, VARIABLE, STOP_OPTION | COSTUME, TOUCHINGOBJECTMENU, TO, SOUND_MENU |

```
const condition = block.args('CONDITION');
const variable = block.args('VARIABLE');
const operand = block.args('OPERAND');
```

**substacks()**  
Returns the substacks for the block as an list of Objects representing a substack. If a block is not capable of having a substack, the list will be empty.


---

### AssetCollection  
An *AssetCollection* represents an interable collection of objects that represent Assets, which are static files included in an *.sb3 file or somwhere the user designates, used for costumes and sounds.

**Methods**

**query(selector)**  
Parameter(s): A string in the CSS selector style
Return: *AssetCollection*

Possible selector syntax:

| Asset Attribute | Selector Syntax |
|-----------------|-----------------|
| name            | Attribute selector. `assets.query('name="83a9787d4cb6f3b7632b4ddfebf74367.wav")`|
| dataFormat      | Type Selector. `assets.query('wav')`|

---

### Asset

An *Asset* is a singleton of *AssetCollection*.

**Methods**

**toBuffer()**
Return: *Promise* to the file buffer of this Asset

 ## CLI Proposal

 *Coming soon*

---

## Development
sb-util is implemented in TypeScript and will be available as a JavaScript library on [npm](https://www.npmjs.com/package/sb-util) and as a CLI tool.

# Development
## Install Dependencies
```
npm install
```

## Build
```
npm run build
```

## Run Tests
```
npm test
```
