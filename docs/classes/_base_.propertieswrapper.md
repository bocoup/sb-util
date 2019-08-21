**[sb-util](../README.md)**

[Globals](../globals.md) › ["base"](../modules/_base_.md) › [PropertiesWrapper](_base_.propertieswrapper.md)

# Class: PropertiesWrapper <**T**>

Generic Class to use as a base for a Properties storage wrapper

## Type parameters

▪ **T**

## Hierarchy

* **PropertiesWrapper**

  * [Variable](_variables_.variable.md)

  * [Sprite](_sprites_.sprite.md)

  * [Block](_blocks_.block.md)

## Index

### Constructors

* [constructor](_base_.propertieswrapper.md#constructor)

### Methods

* [prop](_base_.propertieswrapper.md#prop)
* [props](_base_.propertieswrapper.md#props)

## Constructors

###  constructor

\+ **new PropertiesWrapper**(`props`: T): *[PropertiesWrapper](_base_.propertieswrapper.md)*

*Defined in [base.ts:8](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | T |

**Returns:** *[PropertiesWrapper](_base_.propertieswrapper.md)*

## Methods

###  prop

▸ **prop**(`property`: string): *any*

*Defined in [base.ts:26](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L26)*

Read a property from the stored properties object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`property` | string | The name of the property key  |

**Returns:** *any*

___

###  props

▸ **props**(): *T*

*Defined in [base.ts:16](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L16)*

Return the raw Properties objects

**Returns:** *T*