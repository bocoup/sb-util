import { Queryable, AssetFetcher } from './abstracts';
import { ProjectSource, Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';

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
		throw Error('ScratchProject query() is not implemented');
	}

	sprites(selector?: string){
		throw Error('ScratchProject sprites() is not implemented')
	}
}

export class SpriteCollection implements Queryable {
	query(selector: string){
		throw Error('SpriteCollection query() is not implemented!')
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