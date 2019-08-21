**[sb-util](../README.md)**

[Globals](../globals.md) › ["sb-util"](../modules/_sb_util_.md) › [ScratchProject](_sb_util_.scratchproject.md)

# Class: ScratchProject

## Hierarchy

* **ScratchProject**

## Index

### Constructors

* [constructor](_sb_util_.scratchproject.md#constructor)

### Properties

* [projectJSON](_sb_util_.scratchproject.md#projectjson)

### Methods

* [blocks](_sb_util_.scratchproject.md#blocks)
* [prop](_sb_util_.scratchproject.md#prop)
* [sprites](_sb_util_.scratchproject.md#sprites)
* [stage](_sb_util_.scratchproject.md#stage)

## Constructors

###  constructor

\+ **new ScratchProject**(`projectJSON`: [SB3ProjectJSON](../interfaces/_abstracts_.sb3projectjson.md) | JSON): *[ScratchProject](_sb_util_.scratchproject.md)*

*Defined in [sb-util.ts:19](https://github.com/bocoup/sb-util/blob/565edc9/src/sb-util.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`projectJSON` | [SB3ProjectJSON](../interfaces/_abstracts_.sb3projectjson.md) \| JSON |

**Returns:** *[ScratchProject](_sb_util_.scratchproject.md)*

## Properties

###  projectJSON

• **projectJSON**: *[SB3ProjectJSON](../interfaces/_abstracts_.sb3projectjson.md)*

*Defined in [sb-util.ts:19](https://github.com/bocoup/sb-util/blob/565edc9/src/sb-util.ts#L19)*

The project JSON as read from the project.

## Methods

###  blocks

▸ **blocks**(): *[BlockCollection](_blocks_.blockcollection.md)*

*Defined in [sb-util.ts:46](https://github.com/bocoup/sb-util/blob/565edc9/src/sb-util.ts#L46)*

**Returns:** *[BlockCollection](_blocks_.blockcollection.md)*

___

###  prop

▸ **prop**(`property`: string): *any*

*Defined in [sb-util.ts:27](https://github.com/bocoup/sb-util/blob/565edc9/src/sb-util.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | string |

**Returns:** *any*

___

###  sprites

▸ **sprites**(`selector?`: string): *[SpriteCollection](_sprites_.spritecollection.md)*

*Defined in [sb-util.ts:31](https://github.com/bocoup/sb-util/blob/565edc9/src/sb-util.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`selector?` | string |

**Returns:** *[SpriteCollection](_sprites_.spritecollection.md)*

___

###  stage

▸ **stage**(): *[Sprite](_sprites_.sprite.md)*

*Defined in [sb-util.ts:42](https://github.com/bocoup/sb-util/blob/565edc9/src/sb-util.ts#L42)*

**Returns:** *[Sprite](_sprites_.sprite.md)*