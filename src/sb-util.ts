import { Queryable, ScratchProjectOptions } from './abstracts';
import { SpOptionsEmptyError, SpMultipleSourceOptionsError } from './errors';

enum ProjectSource {
	FILE = "file"
}

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
const initialize = function(options: ScratchProjectOptions): Promise<ScratchProject> {
	// Check project options before initializing a ScratchProject
	if (!options || Object.keys(options).length === 0) { 
		throw new SpOptionsEmptyError('Please provide one of the following options: file, uri, or cloudId.'); 
	} if (Object.keys(options).length > 1) {
		throw new SpMultipleSourceOptionsError('Multiple options found. Please supply only one of the following: file, uri, or cloudId');
	}

	return new Promise<ScratchProject>((resolve, reject) => {
		resolve(new ScratchProject({}));
	});
}

export { initialize };

