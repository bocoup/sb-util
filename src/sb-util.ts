import { Queryable, AssetFetcher } from './abstracts';
import { ProjectSource, Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';

export class ScratchProject implements Queryable {
	constructor(projectJSON: Object, assetFetcher?: AssetFetcher) {
	}

	query(selector?: String) {
		return [];
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