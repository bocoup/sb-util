**[sb-util](../README.md)**

[Globals](../globals.md) › ["generators"](_generators_.md)

# External module: "generators"

## Index

### Functions

* [chain](_generators_.md#chain)
* [count](_generators_.md#count)
* [filter](_generators_.md#filter)
* [filterIterable](_generators_.md#filteriterable)
* [first](_generators_.md#first)
* [flatmap](_generators_.md#flatmap)
* [flatmapIterable](_generators_.md#flatmapiterable)
* [getIndex](_generators_.md#getindex)
* [last](_generators_.md#last)
* [makeIterable](_generators_.md#makeiterable)
* [map](_generators_.md#map)
* [mapIterable](_generators_.md#mapiterable)

## Functions

###  chain

▸ **chain**<**T**>(...`iterables`: Iterable‹T›[]): *Iterable‹T›*

*Defined in [generators.ts:41](https://github.com/bocoup/sb-util/blob/565edc9/src/generators.ts#L41)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`...iterables` | Iterable‹T›[] |

**Returns:** *Iterable‹T›*

___

###  count

▸ **count**(`iterable`: Iterable‹unknown› | unknown[]): *number*

*Defined in [generators.ts:87](https://github.com/bocoup/sb-util/blob/565edc9/src/generators.ts#L87)*

Get count from iterable, using "length" property if it exists on the iterable.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`iterable` | Iterable‹unknown› \| unknown[] | Iterable or array to get length from  |

**Returns:** *number*

___

###  filter

▸ **filter**<**T**>(`iter`: Iterable‹T›, `predicate`: function): *Iterator‹T›*

*Defined in [generators.ts:29](https://github.com/bocoup/sb-util/blob/565edc9/src/generators.ts#L29)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **iter**: *Iterable‹T›*

▪ **predicate**: *function*

▸ (`item`: T): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *Iterator‹T›*

___

###  filterIterable

▸ **filterIterable**<**T**>(`iter`: Iterable‹T›, `predicate`: function): *Iterable‹T›*

*Defined in [generators.ts:37](https://github.com/bocoup/sb-util/blob/565edc9/src/generators.ts#L37)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **iter**: *Iterable‹T›*

▪ **predicate**: *function*

▸ (`item`: T): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *Iterable‹T›*

___

###  first

▸ **first**<**T**>(`iter`: Iterable‹T›): *T*

*Defined in [generators.ts:51](https://github.com/bocoup/sb-util/blob/565edc9/src/generators.ts#L51)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`iter` | Iterable‹T› |

**Returns:** *T*

___

###  flatmap

▸ **flatmap**<**T**, **O**>(`iter`: Iterable‹T›, `predicate`: function): *Iterator‹O›*

*Defined in [generators.ts:19](https://github.com/bocoup/sb-util/blob/565edc9/src/generators.ts#L19)*

**Type parameters:**

▪ **T**

▪ **O**

**Parameters:**

▪ **iter**: *Iterable‹T›*

▪ **predicate**: *function*

▸ (`item`: T): *Iterable‹O›*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *Iterator‹O›*

___

###  flatmapIterable

▸ **flatmapIterable**<**T**, **O**>(`iter`: Iterable‹T›, `predicate`: function): *Iterable‹O›*

*Defined in [generators.ts:25](https://github.com/bocoup/sb-util/blob/565edc9/src/generators.ts#L25)*

**Type parameters:**

▪ **T**

▪ **O**

**Parameters:**

▪ **iter**: *Iterable‹T›*

▪ **predicate**: *function*

▸ (`item`: T): *Iterable‹O›*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *Iterable‹O›*

___

###  getIndex

▸ **getIndex**<**T**>(`iter`: Iterable‹T› | T[], `index`: number): *T*

*Defined in [generators.ts:66](https://github.com/bocoup/sb-util/blob/565edc9/src/generators.ts#L66)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`iter` | Iterable‹T› \| T[] |
`index` | number |

**Returns:** *T*

___

###  last

▸ **last**<**T**>(`iter`: Iterable‹T›): *T*

*Defined in [generators.ts:58](https://github.com/bocoup/sb-util/blob/565edc9/src/generators.ts#L58)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`iter` | Iterable‹T› |

**Returns:** *T*

___

###  makeIterable

▸ **makeIterable**<**T**, **U**>(`iter`: T, `predicate`: function): *Iterable‹U›*

*Defined in [generators.ts:1](https://github.com/bocoup/sb-util/blob/565edc9/src/generators.ts#L1)*

**Type parameters:**

▪ **T**

▪ **U**

**Parameters:**

▪ **iter**: *T*

▪ **predicate**: *function*

▸ (`item`: T): *Iterator‹U›*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *Iterable‹U›*

___

###  map

▸ **map**<**T**, **O**>(`iter`: Iterable‹T›, `predicate`: function): *Iterator‹O›*

*Defined in [generators.ts:9](https://github.com/bocoup/sb-util/blob/565edc9/src/generators.ts#L9)*

**Type parameters:**

▪ **T**

▪ **O**

**Parameters:**

▪ **iter**: *Iterable‹T›*

▪ **predicate**: *function*

▸ (`item`: T): *O*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *Iterator‹O›*

___

###  mapIterable

▸ **mapIterable**<**T**, **O**>(`iter`: Iterable‹T›, `predicate`: function): *Iterable‹O›*

*Defined in [generators.ts:15](https://github.com/bocoup/sb-util/blob/565edc9/src/generators.ts#L15)*

**Type parameters:**

▪ **T**

▪ **O**

**Parameters:**

▪ **iter**: *Iterable‹T›*

▪ **predicate**: *function*

▸ (`item`: T): *O*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *Iterable‹O›*