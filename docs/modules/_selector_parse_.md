**[sb-util](../README.md)**

[Globals](../globals.md) › ["selector-parse"](_selector_parse_.md)

# External module: "selector-parse"

## Index

### Enumerations

* [SelectorSyntax](../enums/_selector_parse_.selectorsyntax.md)

### Functions

* [attrValueContainsQuotes](_selector_parse_.md#attrvaluecontainsquotes)
* [getAttributeAndValueInSelector](_selector_parse_.md#getattributeandvalueinselector)
* [isSelectorAttrValue](_selector_parse_.md#isselectorattrvalue)
* [parseBlockQuerySelector](_selector_parse_.md#parseblockqueryselector)
* [validateSpriteSelector](_selector_parse_.md#validatespriteselector)

## Functions

###  attrValueContainsQuotes

▸ **attrValueContainsQuotes**(`value`: string): *boolean*

*Defined in [selector-parse.ts:33](https://github.com/bocoup/sb-util/blob/565edc9/src/selector-parse.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |

**Returns:** *boolean*

___

###  getAttributeAndValueInSelector

▸ **getAttributeAndValueInSelector**(`selector`: string): *string[]*

*Defined in [selector-parse.ts:29](https://github.com/bocoup/sb-util/blob/565edc9/src/selector-parse.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`selector` | string |

**Returns:** *string[]*

___

###  isSelectorAttrValue

▸ **isSelectorAttrValue**(`selector`: string): *boolean*

*Defined in [selector-parse.ts:25](https://github.com/bocoup/sb-util/blob/565edc9/src/selector-parse.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`selector` | string |

**Returns:** *boolean*

___

###  parseBlockQuerySelector

▸ **parseBlockQuerySelector**(`selector`: string): *[BlockQueryProperties](../interfaces/_abstracts_.blockqueryproperties.md)*

*Defined in [selector-parse.ts:40](https://github.com/bocoup/sb-util/blob/565edc9/src/selector-parse.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`selector` | string |

**Returns:** *[BlockQueryProperties](../interfaces/_abstracts_.blockqueryproperties.md)*

___

###  validateSpriteSelector

▸ **validateSpriteSelector**(`selector`: string): *void*

*Defined in [selector-parse.ts:13](https://github.com/bocoup/sb-util/blob/565edc9/src/selector-parse.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`selector` | string |

**Returns:** *void*