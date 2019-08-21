**[sb-util](../README.md)**

[Globals](../globals.md) › ["blocks"](../modules/_blocks_.md) › [BlockCollection](_blocks_.blockcollection.md)

# Class: BlockCollection

## Hierarchy

* [CollectionWrapper](_base_.collectionwrapper.md)‹[BlockProperties](../interfaces/_abstracts_.blockproperties.md), [Block](_blocks_.block.md)›

  * **BlockCollection**

## Index

### Constructors

* [constructor](_blocks_.blockcollection.md#constructor)

### Properties

* [WrapperClass](_blocks_.blockcollection.md#static-protected-wrapperclass)

### Methods

* [__@iterator](_blocks_.blockcollection.md#__@iterator)
* [byId](_blocks_.blockcollection.md#byid)
* [count](_blocks_.blockcollection.md#count)
* [first](_blocks_.blockcollection.md#first)
* [index](_blocks_.blockcollection.md#index)
* [props](_blocks_.blockcollection.md#props)
* [query](_blocks_.blockcollection.md#query)
* [top](_blocks_.blockcollection.md#top)

## Constructors

###  constructor

\+ **new BlockCollection**(`iterable`: Iterable‹[BlockProperties](../interfaces/_abstracts_.blockproperties.md)›): *[BlockCollection](_blocks_.blockcollection.md)*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[constructor](_base_.collectionwrapper.md#constructor)*

*Defined in [base.ts:36](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`iterable` | Iterable‹[BlockProperties](../interfaces/_abstracts_.blockproperties.md)› |

**Returns:** *[BlockCollection](_blocks_.blockcollection.md)*

## Properties

### `Static` `Protected` WrapperClass

▪ **WrapperClass**: *[Block](_blocks_.block.md)* =  Block

*Overrides [CollectionWrapper](_base_.collectionwrapper.md).[WrapperClass](_base_.collectionwrapper.md#static-protected-wrapperclass)*

*Defined in [blocks.ts:62](https://github.com/bocoup/sb-util/blob/565edc9/src/blocks.ts#L62)*

## Methods

###  __@iterator

▸ **__@iterator**(): *Iterator‹[Block](_blocks_.block.md)›*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[__@iterator](_base_.collectionwrapper.md#__@iterator)*

*Defined in [base.ts:52](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L52)*

Iterate the collection mapping to a utility class for additional query.

**Returns:** *Iterator‹[Block](_blocks_.block.md)›*

___

###  byId

▸ **byId**(`id`: string): *[Block](_blocks_.block.md)*

*Defined in [blocks.ts:68](https://github.com/bocoup/sb-util/blob/565edc9/src/blocks.ts#L68)*

Return the Block matching the provided id.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string | block ID  |

**Returns:** *[Block](_blocks_.block.md)*

___

###  count

▸ **count**(): *number*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[count](_base_.collectionwrapper.md#count)*

*Defined in [base.ts:67](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L67)*

Return the length of the collection.

**Returns:** *number*

___

###  first

▸ **first**(): *[Block](_blocks_.block.md)*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[first](_base_.collectionwrapper.md#first)*

*Defined in [base.ts:60](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L60)*

Return first item in collection.

**Returns:** *[Block](_blocks_.block.md)*

___

###  index

▸ **index**(`n`: number): *[Block](_blocks_.block.md)*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[index](_base_.collectionwrapper.md#index)*

*Defined in [base.ts:75](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L75)*

Get the wrapped item from the collection at a specific index.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`n` | number | index of collection to retrieve  |

**Returns:** *[Block](_blocks_.block.md)*

___

###  props

▸ **props**(): *Iterable‹[BlockProperties](../interfaces/_abstracts_.blockproperties.md)›*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[props](_base_.collectionwrapper.md#props)*

*Defined in [base.ts:45](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L45)*

Return the raw iterable that returns raw properties instead of wrapped properties.

**Returns:** *Iterable‹[BlockProperties](../interfaces/_abstracts_.blockproperties.md)›*

___

###  query

▸ **query**(`selector`: string): *[BlockCollection](_blocks_.blockcollection.md)*

*Defined in [blocks.ts:89](https://github.com/bocoup/sb-util/blob/565edc9/src/blocks.ts#L89)*

Query the colelction for matching blocks

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`selector` | string | block selector  |

**Returns:** *[BlockCollection](_blocks_.blockcollection.md)*

___

###  top

▸ **top**(): *[BlockCollection](_blocks_.blockcollection.md)*

*Defined in [blocks.ts:81](https://github.com/bocoup/sb-util/blob/565edc9/src/blocks.ts#L81)*

Filter the collection to only top level (first block in a stack) blocks.

**Returns:** *[BlockCollection](_blocks_.blockcollection.md)*