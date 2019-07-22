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
		return new SpriteCollection(this.query(CollectionTypes.SPRITES));
	}
}

export class SpriteCollection implements Queryable {
	constructor(sprites: Array<SpriteProperties>){
		storage.set(this, sprites);
	}

	query(selector: string){
		throw new Error('SpriteCollection query() is not implemented!');
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
		throw new Error('Sprite query() not implemented yet!')
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