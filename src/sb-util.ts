import { Queryable, ScratchProjectOptions } from './abstracts';
import { SpOptionsEmptyError, SpMultipleSourceOptionsError } from './errors';
import { ProjectSource, AssetFetcher } from './asset-fetcher';

export class ScratchProject implements Queryable {
	constructor(projectJSON: Object, assetFetcher?: any) {

	}

	query(selector?: String) {
		return [];
	}
}

/*
	initialize() is a factory method that returns a
	Promise to a ScratchProject while it does the
	necessary I/O or HTTP requests needed to populate
	the ScratchProject
*/
export const initialize = function(options: ScratchProjectOptions): Promise<ScratchProject> {
	// Check project options before initializing a ScratchProject
	const numProjectOptions = Object.keys(options).length;
	if (!options ||  numProjectOptions === 0) { 
		throw new SpOptionsEmptyError('Please provide one of the following options: file, uri, or cloudId.'); 
	} if (numProjectOptions > 1 && (ProjectSource.FILE in options || ProjectSource.CLOUD_ID in options)) {
		throw new SpMultipleSourceOptionsError('Multiple options found. Please supply only one of the following: file, uri, or cloudId');
	}

	let fileSource = options[ProjectSource.FILE] || options[ProjectSource.CLOUD_ID];

	return new Promise<ScratchProject>(async (resolve, reject) => {
		const projectJSON = await AssetFetcher.parse(fileSource);
		resolve(new ScratchProject(projectJSON));
	});
}
