import { Queryable, ScratchProjectOptions } from './abstracts';
import { SpOptionsEmptyError, SpMultipleSourceOptionsError } from './errors';
import { ProjectSource, AssetFetcher } from '../common';

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
	if (!options || Object.keys(options).length === 0) { 
		throw new SpOptionsEmptyError('Please provide one of the following options: file, uri, or cloudId.'); 
	} if (Object.keys(options).length > 1) {
		throw new SpMultipleSourceOptionsError('Multiple options found. Please supply only one of the following: file, uri, or cloudId');
	}

	let fileSource, parse;

	if (ProjectSource.FILE in options) {
		fileSource = options[ProjectSource.FILE];
		
		if (fileSource.endsWith('.sb3')){
			parse = AssetFetcher.parseSb3; 
		} else if (fileSource.endsWith('.json')) {
			parse = AssetFetcher.parseJSON;
		}
	} else if (ProjectSource.CLOUD_ID in options) {
		fileSource = options[ProjectSource.CLOUD_ID];
		parse = AssetFetcher.parseFromCloudID;
	}

	return new Promise<ScratchProject>(async (resolve, reject) => {
		const projectJSON = await parse(fileSource);
		resolve(new ScratchProject(projectJSON));
	});
}

