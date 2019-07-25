import { Queryable, AssetFetcher, SpriteProperties, SpritePosition, BlockProperties } from './abstracts';
import { Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';
import { validateSpriteSelector, isSelectorAttrValue, getAttributeAndValueInSelector, attrValueContainsQuotes, parseBlockQuerySelector } from './selector-parse';
import { map, filter, makeIterable, first, chain } from './generators';

enum CollectionTypes {
	SPRITES = 'sprites',
	BLOCKS = 'blocks',
	ASSETS = 'assets'
}

enum ScratchProjectKeys {
	TARGETS = 'targets'
}

enum SpriteAttributes {
	BLOCKS = 'blocks',
	BROADCASTS = 'broadcasts',
	LISTS = 'lists'
}

enum BlockAttributes {
	ID = 'id'
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
		const sprites = this.sprites();
		const iters = [];
		for(const sprite of sprites) {
			const spriteBlocks: BlockCollection = sprite.blocks();

			// Iterating over a BlockCollection will return a Block as each element.
			// Therefore, we should convert the Block to a raw BlockProperties object
			//	which can be obtained by accessing the Block in storage and retrieving
			//	the first element
			const spriteBlocksProps = makeIterable(spriteBlocks, (s: Block) => map(s, s => storage.get(s).slice().pop()));
			iters.push(spriteBlocksProps);
		}

		const chained: Iterable<BlockProperties> = chain(...iters);
		return new BlockCollection(chained)
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

	blocks(selector?: string) {
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

	query(selector: string) {
		const allBlocks = storage.get(this);
		const [attr, value] = parseBlockQuerySelector(selector)
		const blocks: Iterable<BlockProperties> = makeIterable(allBlocks, b => filter(b, (b: BlockProperties) => b[attr] === value));
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