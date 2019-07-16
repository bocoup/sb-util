
# sb-util Proposal (RFC)

We at Bocoup propose **sb-util**, a JavaScript and CLI utility that allows developers to query a Scratch Project for collections of sprites, blocks, assets, and project metadata.

sb-util will accomplish this by consuming ***.sb3** files generate by Scratch. **.sb3** files are used to save and load projects, and within an *.sb3 file there is a **project.json**, which is the JSON representation of the entities within a Scratch project. sb-util will provide an API that allows developers to query the project.json for project information.

The resulting tool should be usable in test suites, scripts, and applications.

## Javascript API
### **Loading a Scratch Project**
sb-util exposes loading functions to instantiate a **ScratchProject**
 object:

 ---

**loadSb3(sb3File)**

Parameter(s): *sb3File*. String representing local file location of an *.sb3 file or a URI to an *.sb3 file   
Return: *Promise*. This Promise object will resolve to a ScratchProject

**loadProjectJson(projectJsonFile)**

Parameter(s): *projectJsonFile*. String representing local file location of an project.json file or a URI to an project.json file   
Return: *Promise*. This Promise object will resolve to a ScratchProject

**loadCloudId(cloudId)**

Parameter(s): *cloudId*. Number representing a Cloud ID in Scratch   
Return: *Promise*. This Promise object will resolve to a ScratchProject  

---

### ScratchProject
A **ScratchProject** gets initialized by a JSON object, represented by the project.json.

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
