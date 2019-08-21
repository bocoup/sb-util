**[sb-util](../README.md)**

[Globals](../globals.md) › ["blocks"](../modules/_blocks_.md) › [Block](_blocks_.block.md)

# Class: Block

## Hierarchy

* [PropertiesWrapper](_base_.propertieswrapper.md)‹[BlockProperties](../interfaces/_abstracts_.blockproperties.md)›

  * **Block**

## Index

### Constructors

* [constructor](_blocks_.block.md#constructor)

### Methods

* [input](_blocks_.block.md#input)
* [parent](_blocks_.block.md#parent)
* [prop](_blocks_.block.md#prop)
* [props](_blocks_.block.md#props)
* [shadow](_blocks_.block.md#shadow)
* [sprite](_blocks_.block.md#sprite)

## Constructors

###  constructor

\+ **new Block**(`props`: [BlockProperties](../interfaces/_abstracts_.blockproperties.md)): *[Block](_blocks_.block.md)*

*Inherited from [PropertiesWrapper](_base_.propertieswrapper.md).[constructor](_base_.propertieswrapper.md#constructor)*

*Defined in [base.ts:8](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [BlockProperties](../interfaces/_abstracts_.blockproperties.md) |

**Returns:** *[Block](_blocks_.block.md)*

## Methods

###  input

▸ **input**(`name`: string): *[Block](_blocks_.block.md)*

*Defined in [blocks.ts:34](https://github.com/bocoup/sb-util/blob/565edc9/src/blocks.ts#L34)*

Return the block in the named input slot.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The input name I.E. "VALUE"  |

**Returns:** *[Block](_blocks_.block.md)*

___

###  parent

▸ **parent**(): *[Block](_blocks_.block.md)*

*Defined in [blocks.ts:20](https://github.com/bocoup/sb-util/blob/565edc9/src/blocks.ts#L20)*

Block which is the "parent" of this block.

**Returns:** *[Block](_blocks_.block.md)*

___

###  prop

▸ **prop**(`property`: string): *any*

*Inherited from [PropertiesWrapper](_base_.propertieswrapper.md).[prop](_base_.propertieswrapper.md#prop)*

*Defined in [base.ts:26](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L26)*

Read a property from the stored properties object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`property` | string | The name of the property key  |

**Returns:** *any*

___

###  props

▸ **props**(): *[BlockProperties](../interfaces/_abstracts_.blockproperties.md)*

*Inherited from [PropertiesWrapper](_base_.propertieswrapper.md).[props](_base_.propertieswrapper.md#props)*

*Defined in [base.ts:16](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L16)*

Return the raw Properties objects

**Returns:** *[BlockProperties](../interfaces/_abstracts_.blockproperties.md)*

___

###  shadow

▸ **shadow**(`name`: string): *[Block](_blocks_.block.md)*

*Defined in [blocks.ts:49](https://github.com/bocoup/sb-util/blob/565edc9/src/blocks.ts#L49)*

Return the shadow of the named input slot.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The input name I.E. "VALUE"  |

**Returns:** *[Block](_blocks_.block.md)*

___

###  sprite

▸ **sprite**(): *[Sprite](_sprites_.sprite.md)*

*Defined in [blocks.ts:13](https://github.com/bocoup/sb-util/blob/565edc9/src/blocks.ts#L13)*

The sprite which owns the block

**Returns:** *[Sprite](_sprites_.sprite.md)*