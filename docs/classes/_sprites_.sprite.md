**[sb-util](../README.md)**

[Globals](../globals.md) › ["sprites"](../modules/_sprites_.md) › [Sprite](_sprites_.sprite.md)

# Class: Sprite

## Hierarchy

* [PropertiesWrapper](_base_.propertieswrapper.md)‹[SpriteProperties](../interfaces/_abstracts_.spriteproperties.md)›

  * **Sprite**

## Index

### Constructors

* [constructor](_sprites_.sprite.md#constructor)

### Methods

* [blocks](_sprites_.sprite.md#blocks)
* [broadcasts](_sprites_.sprite.md#broadcasts)
* [isStage](_sprites_.sprite.md#isstage)
* [lists](_sprites_.sprite.md#lists)
* [position](_sprites_.sprite.md#position)
* [prop](_sprites_.sprite.md#prop)
* [props](_sprites_.sprite.md#props)
* [variables](_sprites_.sprite.md#variables)

## Constructors

###  constructor

\+ **new Sprite**(`props`: [SpriteProperties](../interfaces/_abstracts_.spriteproperties.md)): *[Sprite](_sprites_.sprite.md)*

*Inherited from [PropertiesWrapper](_base_.propertieswrapper.md).[constructor](_base_.propertieswrapper.md#constructor)*

*Defined in [base.ts:8](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [SpriteProperties](../interfaces/_abstracts_.spriteproperties.md) |

**Returns:** *[Sprite](_sprites_.sprite.md)*

## Methods

###  blocks

▸ **blocks**(`query?`: string): *[BlockCollection](_blocks_.blockcollection.md)*

*Defined in [sprites.ts:49](https://github.com/bocoup/sb-util/blob/565edc9/src/sprites.ts#L49)*

Get blocks from the sprite

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`query?` | string | optional query string to query the collection  |

**Returns:** *[BlockCollection](_blocks_.blockcollection.md)*

___

###  broadcasts

▸ **broadcasts**(): *[VariableCollection](_variables_.variablecollection.md)*

*Defined in [sprites.ts:71](https://github.com/bocoup/sb-util/blob/565edc9/src/sprites.ts#L71)*

**Returns:** *[VariableCollection](_variables_.variablecollection.md)*

In the Scratch VM, broadcasts are variables, and
 in the Scratch GUI are always global

___

###  isStage

▸ **isStage**(): *boolean*

*Defined in [sprites.ts:31](https://github.com/bocoup/sb-util/blob/565edc9/src/sprites.ts#L31)*

Is this sprite the stage?

**Returns:** *boolean*

___

###  lists

▸ **lists**(): *[VariableCollection](_variables_.variablecollection.md)*

*Defined in [sprites.ts:90](https://github.com/bocoup/sb-util/blob/565edc9/src/sprites.ts#L90)*

**Returns:** *[VariableCollection](_variables_.variablecollection.md)*

In the Scratch VM, lists are a variable type. They can
 be local or global to a Sprite

___

###  position

▸ **position**(): *[SpritePosition](../interfaces/_abstracts_.spriteposition.md)*

*Defined in [sprites.ts:39](https://github.com/bocoup/sb-util/blob/565edc9/src/sprites.ts#L39)*

Return position {x, y} of Sprite.

**Returns:** *[SpritePosition](../interfaces/_abstracts_.spriteposition.md)*

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

▸ **props**(): *[SpriteProperties](../interfaces/_abstracts_.spriteproperties.md)*

*Inherited from [PropertiesWrapper](_base_.propertieswrapper.md).[props](_base_.propertieswrapper.md#props)*

*Defined in [base.ts:16](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L16)*

Return the raw Properties objects

**Returns:** *[SpriteProperties](../interfaces/_abstracts_.spriteproperties.md)*

___

###  variables

▸ **variables**(): *[VariableCollection](_variables_.variablecollection.md)*

*Defined in [sprites.ts:123](https://github.com/bocoup/sb-util/blob/565edc9/src/sprites.ts#L123)*

**Returns:** *[VariableCollection](_variables_.variablecollection.md)*

. The variables available to a Sprite include the
     variables attached to the sprite as well as variables in the
     global scope, which are attached to the stage. Also included in variables
     are broadcasts (which are always global) and lists, which can be global
     or local.