**[sb-util](../README.md)**

[Globals](../globals.md) › ["base"](../modules/_base_.md) › [CollectionWrapper](_base_.collectionwrapper.md)

# Class: CollectionWrapper <**T, U**>

Generic Collection wrapper

## Type parameters

▪ **T**

▪ **U**

## Hierarchy

* **CollectionWrapper**

  * [VariableCollection](_variables_.variablecollection.md)

  * [SpriteCollection](_sprites_.spritecollection.md)

  * [BlockCollection](_blocks_.blockcollection.md)

## Index

### Constructors

* [constructor](_base_.collectionwrapper.md#constructor)

### Properties

* [WrapperClass](_base_.collectionwrapper.md#static-protected-wrapperclass)

### Methods

* [__@iterator](_base_.collectionwrapper.md#__@iterator)
* [count](_base_.collectionwrapper.md#count)
* [first](_base_.collectionwrapper.md#first)
* [index](_base_.collectionwrapper.md#index)
* [props](_base_.collectionwrapper.md#props)

## Constructors

###  constructor

\+ **new CollectionWrapper**(`iterable`: Iterable‹T›): *[CollectionWrapper](_base_.collectionwrapper.md)*

*Defined in [base.ts:36](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`iterable` | Iterable‹T› |

**Returns:** *[CollectionWrapper](_base_.collectionwrapper.md)*

## Properties

### `Static` `Protected` WrapperClass

▪ **WrapperClass**: *object* =  PropertiesWrapper

*Defined in [base.ts:36](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L36)*

#### Type declaration:

## Methods

###  __@iterator

▸ **__@iterator**(): *Iterator‹U›*

*Defined in [base.ts:52](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L52)*

Iterate the collection mapping to a utility class for additional query.

**Returns:** *Iterator‹U›*

___

###  count

▸ **count**(): *number*

*Defined in [base.ts:67](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L67)*

Return the length of the collection.

**Returns:** *number*

___

###  first

▸ **first**(): *U*

*Defined in [base.ts:60](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L60)*

Return first item in collection.

**Returns:** *U*

___

###  index

▸ **index**(`n`: number): *U*

*Defined in [base.ts:75](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L75)*

Get the wrapped item from the collection at a specific index.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`n` | number | index of collection to retrieve  |

**Returns:** *U*

___

###  props

▸ **props**(): *Iterable‹T›*

*Defined in [base.ts:45](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L45)*

Return the raw iterable that returns raw properties instead of wrapped properties.

**Returns:** *Iterable‹T›*