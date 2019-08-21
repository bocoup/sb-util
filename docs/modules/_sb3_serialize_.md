**[sb-util](../README.md)**

[Globals](../globals.md) › ["sb3-serialize"](_sb3_serialize_.md)

# External module: "sb3-serialize"

## Index

### Variables

* [blockCounter](_sb3_serialize_.md#let-blockcounter)
* [deserializedCache](_sb3_serialize_.md#const-deserializedcache)

### Functions

* [_resetCounterForTests](_sb3_serialize_.md#_resetcounterfortests)
* [deserializeBlockArray](_sb3_serialize_.md#deserializeblockarray)
* [deserializeBlockObject](_sb3_serialize_.md#deserializeblockobject)
* [deserializeBlocks](_sb3_serialize_.md#deserializeblocks)
* [deserializeBroadcastVariables](_sb3_serialize_.md#deserializebroadcastvariables)
* [deserializeFields](_sb3_serialize_.md#deserializefields)
* [deserializeInputs](_sb3_serialize_.md#deserializeinputs)
* [deserializeListVariables](_sb3_serialize_.md#deserializelistvariables)
* [deserializeVariables](_sb3_serialize_.md#deserializevariables)
* [newBlockId](_sb3_serialize_.md#const-newblockid)

### Object literals

* [NUMBER_PRIMITIVE_MAP](_sb3_serialize_.md#const-number_primitive_map)

## Variables

### `Let` blockCounter

• **blockCounter**: *number* = 0

*Defined in [sb3-serialize.ts:21](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L21)*

___

### `Const` deserializedCache

• **deserializedCache**: *WeakMap‹[[SB3SerializedBlockType](../enums/_abstracts_.sb3serializedblocktype.md), any] | [SB3SerializedBlockObject](../interfaces/_abstracts_.sb3serializedblockobject.md), [BlockProperties](../interfaces/_abstracts_.blockproperties.md)[]›* =  new WeakMap<SB3SerializedBlock, BlockProperties[]>()

*Defined in [sb3-serialize.ts:28](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L28)*

## Functions

###  _resetCounterForTests

▸ **_resetCounterForTests**(): *void*

*Defined in [sb3-serialize.ts:24](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L24)*

**Returns:** *void*

___

###  deserializeBlockArray

▸ **deserializeBlockArray**(`data`: [SB3SerializedBlockArray](_abstracts_.md#sb3serializedblockarray), `id`: string, `parentId`: string, `shadow`: boolean): *[BlockProperties](../interfaces/_abstracts_.blockproperties.md)*

*Defined in [sb3-serialize.ts:58](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L58)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | [SB3SerializedBlockArray](_abstracts_.md#sb3serializedblockarray) | - |
`id` | string |  newBlockId() |
`parentId` | string |  null |
`shadow` | boolean | false |

**Returns:** *[BlockProperties](../interfaces/_abstracts_.blockproperties.md)*

___

###  deserializeBlockObject

▸ **deserializeBlockObject**(`serialized`: [SB3SerializedBlockObject](../interfaces/_abstracts_.sb3serializedblockobject.md), `id`: string): *[BlockProperties](../interfaces/_abstracts_.blockproperties.md)[]*

*Defined in [sb3-serialize.ts:214](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L214)*

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | [SB3SerializedBlockObject](../interfaces/_abstracts_.sb3serializedblockobject.md) |
`id` | string |

**Returns:** *[BlockProperties](../interfaces/_abstracts_.blockproperties.md)[]*

___

###  deserializeBlocks

▸ **deserializeBlocks**(`blocks`: [SB3SerializedBlocks](../interfaces/_abstracts_.sb3serializedblocks.md)): *Iterator‹[BlockProperties](../interfaces/_abstracts_.blockproperties.md)›*

*Defined in [sb3-serialize.ts:30](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`blocks` | [SB3SerializedBlocks](../interfaces/_abstracts_.sb3serializedblocks.md) |

**Returns:** *Iterator‹[BlockProperties](../interfaces/_abstracts_.blockproperties.md)›*

___

###  deserializeBroadcastVariables

▸ **deserializeBroadcastVariables**(`serialized`: [SB3BroadcastVariables](../interfaces/_abstracts_.sb3broadcastvariables.md)): *Iterator‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›*

*Defined in [sb3-serialize.ts:241](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L241)*

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | [SB3BroadcastVariables](../interfaces/_abstracts_.sb3broadcastvariables.md) |

**Returns:** *Iterator‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›*

___

###  deserializeFields

▸ **deserializeFields**(`serialized`: [SB3SerializedFields](../interfaces/_abstracts_.sb3serializedfields.md)): *[BlockFields](../interfaces/_abstracts_.blockfields.md)*

*Defined in [sb3-serialize.ts:151](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L151)*

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | [SB3SerializedFields](../interfaces/_abstracts_.sb3serializedfields.md) |

**Returns:** *[BlockFields](../interfaces/_abstracts_.blockfields.md)*

___

###  deserializeInputs

▸ **deserializeInputs**(`serialized`: [SB3SerializedInputs](../interfaces/_abstracts_.sb3serializedinputs.md), `parentId`: string): *object*

*Defined in [sb3-serialize.ts:175](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L175)*

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | [SB3SerializedInputs](../interfaces/_abstracts_.sb3serializedinputs.md) |
`parentId` | string |

**Returns:** *object*

* **inputs**(): *object*

* **newBlocks**: *[BlockProperties](../interfaces/_abstracts_.blockproperties.md)[]*

___

###  deserializeListVariables

▸ **deserializeListVariables**(`serialized`: [SB3ListVariables](../interfaces/_abstracts_.sb3listvariables.md)): *Iterator‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›*

*Defined in [sb3-serialize.ts:256](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L256)*

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | [SB3ListVariables](../interfaces/_abstracts_.sb3listvariables.md) |

**Returns:** *Iterator‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›*

___

###  deserializeVariables

▸ **deserializeVariables**(`serialized`: [SB3ScalarVariables](../interfaces/_abstracts_.sb3scalarvariables.md)): *Iterator‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›*

*Defined in [sb3-serialize.ts:228](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L228)*

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | [SB3ScalarVariables](../interfaces/_abstracts_.sb3scalarvariables.md) |

**Returns:** *Iterator‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›*

___

### `Const` newBlockId

▸ **newBlockId**(): *string*

*Defined in [sb3-serialize.ts:23](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L23)*

**Returns:** *string*

## Object literals

### `Const` NUMBER_PRIMITIVE_MAP

### ▪ **NUMBER_PRIMITIVE_MAP**: *object*

*Defined in [sb3-serialize.ts:50](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L50)*

###  __computed

• **__computed**: *string* = "math_angle"

*Defined in [sb3-serialize.ts:51](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L51)*

*Defined in [sb3-serialize.ts:52](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L52)*

*Defined in [sb3-serialize.ts:53](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L53)*

*Defined in [sb3-serialize.ts:54](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L54)*

*Defined in [sb3-serialize.ts:55](https://github.com/bocoup/sb-util/blob/565edc9/src/sb3-serialize.ts#L55)*