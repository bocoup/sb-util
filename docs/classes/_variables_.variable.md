**[sb-util](../README.md)**

[Globals](../globals.md) › ["variables"](../modules/_variables_.md) › [Variable](_variables_.variable.md)

# Class: Variable

Class representing a Scratch variable. It is a singleton VariableCollection

## Hierarchy

* [PropertiesWrapper](_base_.propertieswrapper.md)‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›

  * **Variable**

## Index

### Constructors

* [constructor](_variables_.variable.md#constructor)

### Methods

* [global](_variables_.variable.md#global)
* [prop](_variables_.variable.md#prop)
* [props](_variables_.variable.md#props)
* [sprite](_variables_.variable.md#sprite)

## Constructors

###  constructor

\+ **new Variable**(`props`: [VariableProperties](../interfaces/_abstracts_.variableproperties.md)): *[Variable](_variables_.variable.md)*

*Inherited from [PropertiesWrapper](_base_.propertieswrapper.md).[constructor](_base_.propertieswrapper.md#constructor)*

*Defined in [base.ts:8](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [VariableProperties](../interfaces/_abstracts_.variableproperties.md) |

**Returns:** *[Variable](_variables_.variable.md)*

## Methods

###  global

▸ **global**(): *boolean*

*Defined in [variables.ts:17](https://github.com/bocoup/sb-util/blob/565edc9/src/variables.ts#L17)*

**Returns:** *boolean*

boolean representing if this is a global variable or not

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

▸ **props**(): *[VariableProperties](../interfaces/_abstracts_.variableproperties.md)*

*Inherited from [PropertiesWrapper](_base_.propertieswrapper.md).[props](_base_.propertieswrapper.md#props)*

*Defined in [base.ts:16](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L16)*

Return the raw Properties objects

**Returns:** *[VariableProperties](../interfaces/_abstracts_.variableproperties.md)*

___

###  sprite

▸ **sprite**(): *[Sprite](_sprites_.sprite.md)*

*Defined in [variables.ts:11](https://github.com/bocoup/sb-util/blob/565edc9/src/variables.ts#L11)*

**Returns:** *[Sprite](_sprites_.sprite.md)*

Sprite that this variable belongs to