**[sb-util](../README.md)**

[Globals](../globals.md) › ["abstracts"](_abstracts_.md)

# External module: "abstracts"

## Index

### Enumerations

* [SB3SerializedBlockType](../enums/_abstracts_.sb3serializedblocktype.md)
* [SB3SerializedInputType](../enums/_abstracts_.sb3serializedinputtype.md)
* [ScratchVariableTypes](../enums/_abstracts_.scratchvariabletypes.md)

### Interfaces

* [AssetFetcher](../interfaces/_abstracts_.assetfetcher.md)
* [BlockField](../interfaces/_abstracts_.blockfield.md)
* [BlockFields](../interfaces/_abstracts_.blockfields.md)
* [BlockInput](../interfaces/_abstracts_.blockinput.md)
* [BlockProperties](../interfaces/_abstracts_.blockproperties.md)
* [BlockQueryProperties](../interfaces/_abstracts_.blockqueryproperties.md)
* [SB3BroadcastVariables](../interfaces/_abstracts_.sb3broadcastvariables.md)
* [SB3ListVariables](../interfaces/_abstracts_.sb3listvariables.md)
* [SB3ProjectJSON](../interfaces/_abstracts_.sb3projectjson.md)
* [SB3ScalarVariables](../interfaces/_abstracts_.sb3scalarvariables.md)
* [SB3SerializedBlockObject](../interfaces/_abstracts_.sb3serializedblockobject.md)
* [SB3SerializedBlocks](../interfaces/_abstracts_.sb3serializedblocks.md)
* [SB3SerializedFields](../interfaces/_abstracts_.sb3serializedfields.md)
* [SB3SerializedInputs](../interfaces/_abstracts_.sb3serializedinputs.md)
* [SB3SharedBlockProperties](../interfaces/_abstracts_.sb3sharedblockproperties.md)
* [SpritePosition](../interfaces/_abstracts_.spriteposition.md)
* [SpriteProperties](../interfaces/_abstracts_.spriteproperties.md)
* [VariableProperties](../interfaces/_abstracts_.variableproperties.md)

### Type aliases

* [SB3ListVariableProperties](_abstracts_.md#sb3listvariableproperties)
* [SB3ScalarVariableProperties](_abstracts_.md#sb3scalarvariableproperties)
* [SB3SerializedBlock](_abstracts_.md#sb3serializedblock)
* [SB3SerializedBlockArray](_abstracts_.md#sb3serializedblockarray)
* [SB3SerializedField](_abstracts_.md#sb3serializedfield)
* [SB3SerializedInput](_abstracts_.md#sb3serializedinput)

## Type aliases

###  SB3ListVariableProperties

Ƭ **SB3ListVariableProperties**: *[string, string[]]*

*Defined in [abstracts.ts:84](https://github.com/bocoup/sb-util/blob/565edc9/src/abstracts.ts#L84)*

___

###  SB3ScalarVariableProperties

Ƭ **SB3ScalarVariableProperties**: *[string, string | number, boolean]*

*Defined in [abstracts.ts:78](https://github.com/bocoup/sb-util/blob/565edc9/src/abstracts.ts#L78)*

___

###  SB3SerializedBlock

Ƭ **SB3SerializedBlock**: *[SB3SerializedBlockObject](../interfaces/_abstracts_.sb3serializedblockobject.md) | [SB3SerializedBlockArray](_abstracts_.md#sb3serializedblockarray)*

*Defined in [abstracts.ts:68](https://github.com/bocoup/sb-util/blob/565edc9/src/abstracts.ts#L68)*

___

###  SB3SerializedBlockArray

Ƭ **SB3SerializedBlockArray**: *[[SB3SerializedBlockType](../enums/_abstracts_.sb3serializedblocktype.md), Array]*

*Defined in [abstracts.ts:66](https://github.com/bocoup/sb-util/blob/565edc9/src/abstracts.ts#L66)*

___

###  SB3SerializedField

Ƭ **SB3SerializedField**: *[string, string]*

*Defined in [abstracts.ts:35](https://github.com/bocoup/sb-util/blob/565edc9/src/abstracts.ts#L35)*

___

###  SB3SerializedInput

Ƭ **SB3SerializedInput**: *[[SB3SerializedInputType](../enums/_abstracts_.sb3serializedinputtype.md), [SB3SerializedBlockArray](_abstracts_.md#sb3serializedblockarray) | string, string | [[SB3SerializedBlockType](../enums/_abstracts_.sb3serializedblocktype.md), any]]*

*Defined in [abstracts.ts:41](https://github.com/bocoup/sb-util/blob/565edc9/src/abstracts.ts#L41)*