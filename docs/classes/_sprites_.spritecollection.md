**[sb-util](../README.md)**

[Globals](../globals.md) › ["sprites"](../modules/_sprites_.md) › [SpriteCollection](_sprites_.spritecollection.md)

# Class: SpriteCollection

Multiple sprites in a collection.

## Hierarchy

* [CollectionWrapper](_base_.collectionwrapper.md)‹[SpriteProperties](../interfaces/_abstracts_.spriteproperties.md), [Sprite](_sprites_.sprite.md)›

  * **SpriteCollection**

## Index

### Constructors

* [constructor](_sprites_.spritecollection.md#constructor)

### Properties

* [WrapperClass](_sprites_.spritecollection.md#static-protected-wrapperclass)

### Methods

* [__@iterator](_sprites_.spritecollection.md#__@iterator)
* [blocks](_sprites_.spritecollection.md#blocks)
* [count](_sprites_.spritecollection.md#count)
* [first](_sprites_.spritecollection.md#first)
* [index](_sprites_.spritecollection.md#index)
* [props](_sprites_.spritecollection.md#props)
* [query](_sprites_.spritecollection.md#query)

## Constructors

###  constructor

\+ **new SpriteCollection**(`iterable`: Iterable‹[SpriteProperties](../interfaces/_abstracts_.spriteproperties.md)›): *[SpriteCollection](_sprites_.spritecollection.md)*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[constructor](_base_.collectionwrapper.md#constructor)*

*Defined in [base.ts:36](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`iterable` | Iterable‹[SpriteProperties](../interfaces/_abstracts_.spriteproperties.md)› |

**Returns:** *[SpriteCollection](_sprites_.spritecollection.md)*

## Properties

### `Static` `Protected` WrapperClass

▪ **WrapperClass**: *[Sprite](_sprites_.sprite.md)* =  Sprite

*Overrides [CollectionWrapper](_base_.collectionwrapper.md).[WrapperClass](_base_.collectionwrapper.md#static-protected-wrapperclass)*

*Defined in [sprites.ts:154](https://github.com/bocoup/sb-util/blob/565edc9/src/sprites.ts#L154)*

## Methods

###  __@iterator

▸ **__@iterator**(): *Iterator‹[Sprite](_sprites_.sprite.md)›*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[__@iterator](_base_.collectionwrapper.md#__@iterator)*

*Defined in [base.ts:52](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L52)*

Iterate the collection mapping to a utility class for additional query.

**Returns:** *Iterator‹[Sprite](_sprites_.sprite.md)›*

___

###  blocks

▸ **blocks**(): *[BlockCollection](_blocks_.blockcollection.md)*

*Defined in [sprites.ts:203](https://github.com/bocoup/sb-util/blob/565edc9/src/sprites.ts#L203)*

Return the blocks for all sprites in collection.

**Returns:** *[BlockCollection](_blocks_.blockcollection.md)*

___

###  count

▸ **count**(): *number*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[count](_base_.collectionwrapper.md#count)*

*Defined in [base.ts:67](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L67)*

Return the length of the collection.

**Returns:** *number*

___

###  first

▸ **first**(): *[Sprite](_sprites_.sprite.md)*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[first](_base_.collectionwrapper.md#first)*

*Defined in [base.ts:60](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L60)*

Return first item in collection.

**Returns:** *[Sprite](_sprites_.sprite.md)*

___

###  index

▸ **index**(`n`: number): *[Sprite](_sprites_.sprite.md)*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[index](_base_.collectionwrapper.md#index)*

*Defined in [base.ts:75](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L75)*

Get the wrapped item from the collection at a specific index.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`n` | number | index of collection to retrieve  |

**Returns:** *[Sprite](_sprites_.sprite.md)*

___

###  props

▸ **props**(): *Iterable‹[SpriteProperties](../interfaces/_abstracts_.spriteproperties.md)›*

*Inherited from [CollectionWrapper](_base_.collectionwrapper.md).[props](_base_.collectionwrapper.md#props)*

*Defined in [base.ts:45](https://github.com/bocoup/sb-util/blob/565edc9/src/base.ts#L45)*

Return the raw iterable that returns raw properties instead of wrapped properties.

**Returns:** *Iterable‹[SpriteProperties](../interfaces/_abstracts_.spriteproperties.md)›*

___

###  query

▸ **query**(`selector`: string): *[SpriteCollection](_sprites_.spritecollection.md)*

*Defined in [sprites.ts:160](https://github.com/bocoup/sb-util/blob/565edc9/src/sprites.ts#L160)*

Query sprites

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`selector` | string | Query Selector  |

**Returns:** *[SpriteCollection](_sprites_.spritecollection.md)*