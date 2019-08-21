**[sb-util](../README.md)**

[Globals](../globals.md) › ["meta-data"](_meta_data_.md)

# External module: "meta-data"

## Index

### Interfaces

* [BlockMeta](../interfaces/_meta_data_.blockmeta.md)
* [SpriteMeta](../interfaces/_meta_data_.spritemeta.md)
* [VariableMeta](../interfaces/_meta_data_.variablemeta.md)

### Variables

* [blockMeta](_meta_data_.md#const-blockmeta)
* [spriteMeta](_meta_data_.md#const-spritemeta)
* [variableMeta](_meta_data_.md#const-variablemeta)

### Functions

* [getBlockMeta](_meta_data_.md#const-getblockmeta)
* [getSpriteMeta](_meta_data_.md#const-getspritemeta)
* [getVariableMeta](_meta_data_.md#const-getvariablemeta)
* [setMetaIterable](_meta_data_.md#setmetaiterable)
* [setVariableMetaIterable](_meta_data_.md#const-setvariablemetaiterable)
* [setVariableMetaSprite](_meta_data_.md#setvariablemetasprite)

## Variables

### `Const` blockMeta

• **blockMeta**: *WeakMap‹[BlockProperties](../interfaces/_abstracts_.blockproperties.md), [BlockMeta](../interfaces/_meta_data_.blockmeta.md)›* =  new WeakMap<BlockProperties, BlockMeta>()

*Defined in [meta-data.ts:21](https://github.com/bocoup/sb-util/blob/565edc9/src/meta-data.ts#L21)*

___

### `Const` spriteMeta

• **spriteMeta**: *WeakMap‹[SpriteProperties](../interfaces/_abstracts_.spriteproperties.md), [SpriteMeta](../interfaces/_meta_data_.spritemeta.md)›* =  new WeakMap<SpriteProperties, SpriteMeta>()

*Defined in [meta-data.ts:8](https://github.com/bocoup/sb-util/blob/565edc9/src/meta-data.ts#L8)*

___

### `Const` variableMeta

• **variableMeta**: *WeakMap‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md), [VariableMeta](../interfaces/_meta_data_.variablemeta.md)›* =  new WeakMap<VariableProperties, VariableMeta>()

*Defined in [meta-data.ts:34](https://github.com/bocoup/sb-util/blob/565edc9/src/meta-data.ts#L34)*

## Functions

### `Const` getBlockMeta

▸ **getBlockMeta**(`p`: [BlockProperties](../interfaces/_abstracts_.blockproperties.md)): *[BlockMeta](../interfaces/_meta_data_.blockmeta.md)*

*Defined in [meta-data.ts:22](https://github.com/bocoup/sb-util/blob/565edc9/src/meta-data.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [BlockProperties](../interfaces/_abstracts_.blockproperties.md) |

**Returns:** *[BlockMeta](../interfaces/_meta_data_.blockmeta.md)*

___

### `Const` getSpriteMeta

▸ **getSpriteMeta**(`p`: [SpriteProperties](../interfaces/_abstracts_.spriteproperties.md)): *[SpriteMeta](../interfaces/_meta_data_.spritemeta.md)*

*Defined in [meta-data.ts:9](https://github.com/bocoup/sb-util/blob/565edc9/src/meta-data.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [SpriteProperties](../interfaces/_abstracts_.spriteproperties.md) |

**Returns:** *[SpriteMeta](../interfaces/_meta_data_.spritemeta.md)*

___

### `Const` getVariableMeta

▸ **getVariableMeta**(`p`: [VariableProperties](../interfaces/_abstracts_.variableproperties.md)): *[VariableMeta](../interfaces/_meta_data_.variablemeta.md)*

*Defined in [meta-data.ts:35](https://github.com/bocoup/sb-util/blob/565edc9/src/meta-data.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [VariableProperties](../interfaces/_abstracts_.variableproperties.md) |

**Returns:** *[VariableMeta](../interfaces/_meta_data_.variablemeta.md)*

___

###  setMetaIterable

▸ **setMetaIterable**<**T**>(`iterable`: Iterable‹T›, `predicate`: function): *Iterable‹T›*

*Defined in [meta-data.ts:44](https://github.com/bocoup/sb-util/blob/565edc9/src/meta-data.ts#L44)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **iterable**: *Iterable‹T›*

▪ **predicate**: *function*

▸ (`item`: T): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *Iterable‹T›*

___

### `Const` setVariableMetaIterable

▸ **setVariableMetaIterable**(`iter`: Iterable‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›, `meta`: [VariableMeta](../interfaces/_meta_data_.variablemeta.md)): *Iterator‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›*

*Defined in [meta-data.ts:48](https://github.com/bocoup/sb-util/blob/565edc9/src/meta-data.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`iter` | Iterable‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)› |
`meta` | [VariableMeta](../interfaces/_meta_data_.variablemeta.md) |

**Returns:** *Iterator‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›*

___

###  setVariableMetaSprite

▸ **setVariableMetaSprite**(`deserialized`: Iterable‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›, `sprite`: [SpriteProperties](../interfaces/_abstracts_.spriteproperties.md)): *Iterable‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›*

*Defined in [meta-data.ts:65](https://github.com/bocoup/sb-util/blob/565edc9/src/meta-data.ts#L65)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`deserialized` | Iterable‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)› | iterable of VariableProperties |
`sprite` | [SpriteProperties](../interfaces/_abstracts_.spriteproperties.md) | A Sprite object  |

**Returns:** *Iterable‹[VariableProperties](../interfaces/_abstracts_.variableproperties.md)›*