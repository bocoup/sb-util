**[sb-util](../README.md)**

[Globals](../globals.md) › ["variables"](../modules/_variables_.md) › [VariableCollection](_variables_.variablecollection.md)

# Class: VariableCollection

Class representing a variable collection

## Hierarchy

* [CollectionWrapper](_base_.collectionwrapper.md)‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md), [Variable](_variables_.variable.md)›

  * **VariableCollection**

## Index

### Constructors

* [constructor](_variables_.variablecollection.md#constructor)

### Properties

* [WrapperClass](_variables_.variablecollection.md#static-protected-wrapperclass)

### Methods

* [__@iterator](_variables_.variablecollection.md#__@iterator)
* [byId](_variables_.variablecollection.md#byid)
* [count](_variables_.variablecollection.md#count)
* [first](_variables_.variablecollection.md#first)
* [index](_variables_.variablecollection.md#index)
* [props](_variables_.variablecollection.md#props)

## Constructors

###  constructor

\+ **new VariableCollection**(`iterable`: Iterable‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›): *[VariableCollection](_variables_.variablecollection.md)*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[constructor](_base_.collectionwrapper.md#constructor)*

*Defined in [base.ts:36](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`iterable` | Iterable‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)› |

**Returns:** *[VariableCollection](_variables_.variablecollection.md)*

## Properties

### `Static` `Protected` WrapperClass

▪ **WrapperClass**: *[Variable](_variables_.variable.md)* =  Variable

*Overrides [CollectionWrapper](_base_.collectionwrapper.md).[WrapperClass](_base_.collectionwrapper.md#static-protected-wrapperclass)*

*Defined in [variables.ts:24](https://github.com/bocoup/sb-util/blob/565edc9/src/variables.ts#L24)*

## Methods

###  __@iterator

▸ **__@iterator**(): *Iterator‹[Variable](_variables_.variable.md)›*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[__@iterator](_base_.collectionwrapper.md#__@iterator)*

*Defined in [base.ts:52](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L52)*

Iterate the collection mapping to a utility class for additional query.

**Returns:** *Iterator‹[Variable](_variables_.variable.md)›*

___

###  byId

▸ **byId**(`id`: string): *[Variable](_variables_.variable.md)*

*Defined in [variables.ts:30](https://github.com/bocoup/sb-util/blob/565edc9/src/variables.ts#L30)*

Find the variable by a given ID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string | the id string of a variable  |

**Returns:** *[Variable](_variables_.variable.md)*

___

###  count

▸ **count**(): *number*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[count](_base_.collectionwrapper.md#count)*

*Defined in [base.ts:67](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L67)*

Return the length of the collection.

**Returns:** *number*

___

###  first

▸ **first**(): *[Variable](_variables_.variable.md)*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[first](_base_.collectionwrapper.md#first)*

*Defined in [base.ts:60](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L60)*

Return first item in collection.

**Returns:** *[Variable](_variables_.variable.md)*

___

###  index

▸ **index**(`n`: number): *[Variable](_variables_.variable.md)*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[index](_base_.collectionwrapper.md#index)*

*Defined in [base.ts:75](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L75)*

Get the wrapped item from the collection at a specific index.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`n` | number | index of collection to retrieve  |

**Returns:** *[Variable](_variables_.variable.md)*

___

###  props

▸ **props**(): *Iterable‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[props](_base_.collectionwrapper.md#props)*

*Defined in [base.ts:45](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L45)*

Return the raw iterable that returns raw properties instead of wrapped properties.

**Returns:** *Iterable‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›*