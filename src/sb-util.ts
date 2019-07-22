import { Queryable, AssetFetcher, SpriteProperties } from './abstracts';
import { ProjectSource, Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';

enum CollectionTypes {
	SPRITES = 'sprites',
	BLOCKS = 'blocks',
	ASSETS = 'assets'
}

enum ScratchProjectKeys {
	TARGETS = 'targets'
}

enum SelectorSyntax {
	OPEN_BRACKET = '[',
	CLOSED_BRACKET = ']',
	EQUALS = '='
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

	get(property: string) {
		return storage.get(this)[property];
	}

	query(selector: string) {
		if(selector === CollectionTypes.SPRITES) {
			// The key for sprites in the project JSON is called 'targets'
			return this.get(ScratchProjectKeys.TARGETS);
		}
	}

	sprites(selector?: string){
		const sprites = this.query(CollectionTypes.SPRITES);

		if (!selector && typeof selector !== 'string') return new SpriteCollection(sprites);

		return new SpriteCollection(sprites).query(selector);
	}
}

export class SpriteCollection implements Queryable {
	constructor(sprites: Array<SpriteProperties>){
		storage.set(this, sprites);
	}

	/*
		Currently, the query selector syntax only supports
		attribute selector style in the form of [attr] and
		[attr=value]
	*/
	query(selector: string){
		if(selector.length < 2 || selector[0] !== SelectorSyntax.OPEN_BRACKET
			&& selector.slice(-1) !== SelectorSyntax.CLOSED_BRACKET){
			throw new Error('Invalid selector syntax for SpriteCollection. \
				[attr] and [attr=value] format is accepted. Selector must not be empty');
		}

		// string between brackets
		const selectorBody = selector.substring(1, selector.length-1);

		throw new Error('query not finished implementing');
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

	query(selector: string) {
		return super.query(selector);
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