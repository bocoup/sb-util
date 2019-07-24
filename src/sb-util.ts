import { Queryable, AssetFetcher, SpriteProperties, SpritePosition, BlockProperties } from './abstracts';
import { Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';
import { validateSpriteSelector, isSelectorAttrValue, getAttrValue, attrValueContainsQuotes } from './selector-parse';

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

export class ScratchProject implements Queryable {
	constructor(projectJSON: Object, assetFetcher?: AssetFetcher) {
		storage.set(this, projectJSON);
	}

	prop(property: string) {
		return storage.get(this)[property];
	}

	query(selector: string) {
		if(selector === CollectionTypes.SPRITES) {
			// The key for sprites in the project JSON is called 'targets'
			return this.prop(ScratchProjectKeys.TARGETS);
		}
	}

	sprites(selector?: string){
		const sprites = this.query(CollectionTypes.SPRITES);

		if (!selector && typeof selector !== 'string') return new SpriteCollection(sprites);

		return new SpriteCollection(sprites).query(selector);
	}

	stage() {
		return this.sprites('[isStage=true]');
	}

	blocks() {
		let blocks = [];
		let sprites = this.sprites();
		for (let s of sprites) {
			const blocksObj = s.prop(SpriteAttributes.BLOCKS);
			Object.entries(blocksObj).forEach(([key, val]) => {
				let block = val;
				block[BlockAttributes.ID] = key;
				blocks.push(block);
			})
		}
		return new BlockCollection(blocks);
	}
}

export class SpriteCollection implements Queryable  {
	constructor(sprites: Iterable<SpriteProperties>){
		storage.set(this, sprites);
	}

	prop(attribute: string) {
		const first = storage.get(this).slice().shift();
		return first[attribute];
	}

	/*
		Currently, the query selector syntax only supports
		attribute selector style in the form of [attr] and
		[attr=value]
	*/
	query(selector: string){
		validateSpriteSelector(selector);

		// string between brackets
		const selectorBody = selector.substring(1, selector.length-1);

		let sprites, allSprites = storage.get(this);

		// case when selector string is in [attr=value] form
		if(isSelectorAttrValue(selectorBody)) {
			const [attr, valueString] = getAttrValue(selectorBody);

			this['value'] = valueString;

			// handle case when booleans are strings
			if (valueString === 'true' || valueString === 'false') {
				this['value'] = Boolean(valueString);
			}
			// handle case when numbers are strings
			else if (!isNaN(+valueString)) {
				this['value'] = +valueString;
			}
			// handle case when strings have quotes
			else if (attrValueContainsQuotes(valueString)) {
				this['value'] = valueString.replace(/^"(.*)"$/, '$1');
			}

			sprites = allSprites.filter((s: SpriteProperties) => s[attr] === this['value']);
		}
		// case when selector string is in [attr] form
		else {
			const attr = selectorBody;
			sprites = allSprites.filter((s: SpriteProperties) => attr in s);
		}

		return sprites.length === 1 ? new Sprite(sprites.pop()) : new SpriteCollection(sprites);
	}

	[Symbol.iterator]() {
		const sprites = storage.get(this);
		return {
			next(): IteratorResult<Sprite> {
				let sprite = sprites.pop();
				if(sprite){
					return {value: new Sprite(sprite), done: false};
				}
				return {done: true, value: null};
			}
		}
	}
}

export class Sprite extends SpriteCollection implements Queryable {
	constructor(sprite: SpriteProperties) {
		// Per documentation, Sprite is a singleton SpriteCollection
		super([sprite]);
	}

	prop(property: string){
		const sprite = storage.get(this).slice(-1).pop();
		return sprite[property];
	}

	query(selector: string) {
		return super.query(selector);
	}

	position(): SpritePosition {
		const x = this.prop('x');
		const y = this.prop('y');
		return { x, y };
	}

	broadcasts() {
		return this.prop(SpriteAttributes.BROADCASTS);
	}

	lists() {
		return this.prop(SpriteAttributes.LISTS);
	}
}

export class BlockCollection implements Queryable {
	constructor(blocks: Array<BlockProperties>) {
		storage.set(this, blocks);
	}

	query() {
		throw new Error('BlockCollection queryable not implemented yet!')
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