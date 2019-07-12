import { Queryable, ScratchProjectOptions } from './abstracts';
import { SpOptionsEmptyError, SpMultipleSourceOptionsError } from './errors';
import AdmZip from 'adm-zip';
import fs from 'fs';
import fetch from 'isomorphic-fetch';

enum ProjectSource {
	FILE = 'file',
	URI = 'uri',
	CLOUD_ID = 'cloudId',
	PROJECT_JSON = 'project.json',
	MIT_PROJECT_URI = 'https://projects.scratch.mit.edu'
}


export class ScratchProject implements Queryable {
	constructor(projectJSON: Object, assetFetcher?: any) {

	}

	query(selector?: String) {
		return [];
	}
}

/*
  The AssetFetcher is responsible for handing different
  project sources and the asset files within or referred
  to in a project.
*/
const AssetFetcher = {
	parseSb3: (sb3File: string) => {
		return new Promise((resolve, reject) => {
			const sb3 = new AdmZip(sb3File);
			const projectJSONString = sb3.readAsText(ProjectSource.PROJECT_JSON);
			resolve(JSON.parse(projectJSONString));
		})
	},

	parseJSON: (jsonFile: string) => {
		return new Promise((resolve, reject) => {
			fs.readFile(jsonFile, (err, data) => {
				resolve(JSON.parse(data.toString()));
			})
		})
	},

	parseFromCloudID: (cloudId: number) => {
		return new Promise(async (resolve, reject) => {
			const data = await fetch(`${ProjectSource.MIT_PROJECT_URI}/${cloudId}`);
			const projectJSON = await data.json();
			resolve(projectJSON);
		})
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

export { initialize };

