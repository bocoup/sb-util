import { Queryable, AssetFetcher, SpriteProperties, SpritePosition, BlockProperties, BlockQueryProperties } from './abstracts';
import { Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';
import { validateSpriteSelector, isSelectorAttrValue, getAttributeAndValueInSelector, attrValueContainsQuotes, parseBlockQuerySelector } from './selector-parse';
import { map, filter, makeIterable, first, makeIterableFromDifferentTypes } from './generators';

enum ScratchProjectKeys {
	TARGETS = 'targets'
}

enum SpriteAttributes {
	BLOCKS = 'blocks',
	BROADCASTS = 'broadcasts',
	LISTS = 'lists'
}

/*
sb-util CLASSES.

The classes below make up the sb-util API.
*/

// This is the global storage for project data
const storage = new WeakMap();

export class ScratchProject {
	constructor(projectJSON: Object, assetFetcher?: AssetFetcher) {
		storage.set(this, projectJSON);
	}

	prop(property: string) {
		return storage.get(this)[property];
	}

	sprites(selector?: string){
		if (selector && typeof selector !== 'string') throw new Error('SpriteCollection selector should be a string!');

		const sprites = this.prop(ScratchProjectKeys.TARGETS);
		if (!selector && typeof selector !== 'string') return new SpriteCollection(sprites);
		return new SpriteCollection(sprites).query(selector);
	}

	stage(): Sprite {
		return this.sprites('[isStage=true]').first();
	}

	blocks() {
		// Getting an iterable collection of block properties from all the sprites
		const allBlocksInProject: Iterable<BlockProperties> =
			// A transformation from an Iterable<Sprite> to Iterable<BlockProperties>
			// 	which requires a new function makeIterableFromDifferentTypes
			makeIterableFromDifferentTypes(this.sprites(), function * (sprites) {
				for (const sprite of sprites) {
					yield* makeIterableFromDifferentTypes(sprite.blocks(), block => map(block, block => block.props()));
				}
			});

		return new BlockCollection(allBlocksInProject);
	}
}

export class SpriteCollection implements Queryable  {
	constructor(sprites: Iterable<SpriteProperties>){
		storage.set(this, sprites);
	}

	first(): Sprite {
		const props: SpriteProperties = first(storage.get(this));
		return props ? new Sprite(props) : null;
	}

	prop(attribute: string) {
		const first = this.first();
		if (!first) return null;
		return first.prop(attribute);
	}

	/*
		Currently, the query selector syntax only supports
		attribute selector style in the form of [attr] and
		[attr=value]
	*/
	query(selector: string){
		validateSpriteSelector(selector);

		// string between brackets
		const selectorBody = selector.slice(1, -1);

		let sprites: Iterable<SpriteProperties>, 
			filterFunction: (s: SpriteProperties) => boolean,
			attrValue: any, // the attribute being queried for might be string, number, or bool
			allSprites = storage.get(this);

		// case when selector string is in [attr=value] form
		if(isSelectorAttrValue(selectorBody)) {
			const [attr, valueString] = getAttributeAndValueInSelector(selectorBody);

			attrValue = valueString;

			// handle case when booleans are strings
			if (valueString === 'true' || valueString === 'false') {
				attrValue = Boolean(valueString);
			}
			// handle case when numbers are strings
			else if (!isNaN(+valueString)) {
				attrValue = +valueString;
			}
			// handle case when strings have quotes
			else if (attrValueContainsQuotes(valueString)) {
				attrValue = valueString.replace(/^[",'](.*)[",']$/, '$1');
			}

			filterFunction = (s: SpriteProperties) => s[attr] === attrValue;
		}
		// case when selector string is in [attr] form
		else {
			const attr = selectorBody;
			filterFunction = (s: SpriteProperties) => attr in s;
		}

		sprites = makeIterable(allSprites, s => filter(s, filterFunction));
		return new SpriteCollection(sprites);
	}

	[Symbol.iterator]() {
		const sprites: Iterable<SpriteProperties> = storage.get(this);
		return map(sprites, props => new Sprite(props));
	}
}

export class Sprite extends SpriteCollection {
	constructor(sprite: SpriteProperties) {
		// Per documentation, Sprite is a singleton SpriteCollection
		super([sprite]);
	}

	prop(property: string){
		const sprite = storage.get(this).slice(-1).pop();
		return sprite[property];
	}

	position(): SpritePosition {
		const x = this.prop('x');
		const y = this.prop('y');
		return { x, y };
	}

	blocks(): BlockCollection {
		const blocksObj: Object = this.prop('blocks');
		const allBlocks: Iterable<BlockProperties> = Object.entries(blocksObj).map(([blockId, block]) => ({id: blockId, ...block}));
		return new BlockCollection(allBlocks);
	}

	broadcasts() {
		return this.prop(SpriteAttributes.BROADCASTS);
	}

	lists() {
		return this.prop(SpriteAttributes.LISTS);
	}
}

export class BlockCollection implements Queryable {
	constructor(blocks: Iterable<BlockProperties>) {
		storage.set(this, blocks);
	}

	first(): Block {
		return first(makeIterable(this, () => this[Symbol.iterator]()));
	}

	props(): BlockProperties {
		// Remember that a Block is a BlockCollection of one element
		return first(storage.get(this));
	}

	query(selector: string) {
		const { attr, value, isType }: BlockQueryProperties = parseBlockQuerySelector(selector)
		const allBlocks = storage.get(this);

		let filterFunction = (b: BlockProperties) => b[attr] === value;

		// Check that the query is asking for block type
		if (isType) filterFunction = (b: BlockProperties) => b[attr].includes(value);

		const blocks: Iterable<BlockProperties> = makeIterable(allBlocks, (blockProps: Iterable<BlockProperties>) => filter(blockProps, filterFunction));

		return new BlockCollection(blocks);
	}

	[Symbol.iterator]() {
		const blocks: Iterable<BlockProperties> = storage.get(this);
		return map(blocks, props => new Block(props));
	}
}

export class Block extends BlockCollection {
	constructor(block: BlockProperties) {
		super([block]);
	}

	prop(property: string) {
		const props = this.props();
		if (!props) return null; return props[property];
	}
}

/*
LOADING FUNCTIONS.

The global methods below create ScratchProject objects based on the input source.
*/
export const loadSb3 = async function(source: string) {
		const projectJSON = await new Sb3Fetcher().parse(source);
		return new ScratchProject(projectJSON);
}

export const loadProjectJson = async function(source: string) {
		const projectJSON = await new ProjectJsonFetcher().parse(source);
		return new ScratchProject(projectJSON);
}

export const loadCloudId = async function(cloudId: number) {
		const projectJSON = await new ProjectByCloudIdFetcher().parse(cloudId);
		return new ScratchProject(projectJSON);
}