import { Queryable, ScratchProjectOptions, AssetFetcher } from './abstracts';
import { ProjectSource, Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';

export class ScratchProject implements Queryable {
	constructor(projectJSON: Object, assetFetcher?: AssetFetcher) {
	}

	query(selector?: String) {
		return [];
	}
}

export const loadSB3 = function(source: string) {
	return new Promise<ScratchProject>(async (resolve, reject) => {
		const projectJSON = await new Sb3Fetcher().parse(source);
		resolve(new ScratchProject(projectJSON))
	});
}

export const loadProjectJson = function(source: string) {
	return new Promise<ScratchProject>(async (resolve, reject) => {
		const projectJSON = await new ProjectJsonFetcher().parse(source);
		resolve(new ScratchProject(projectJSON))
	});
}

export const loadCloudId = function(cloudId: number) {
	return new Promise<ScratchProject>(async (resolve, reject) => {
		const projectJSON = await new ProjectByCloudIdFetcher().parse(cloudId);
		resolve(new ScratchProject(projectJSON))
	});
}