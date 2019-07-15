import JSZip from 'jszip';
import { promises as fsp } from 'fs';
import fetch from 'isomorphic-fetch';

export enum ProjectSource {
	FILE = 'file',
	URI = 'uri',
	CLOUD_ID = 'cloudId',
	PROJECT_JSON = 'project.json',
	MIT_PROJECT_URI = 'https://projects.scratch.mit.edu'
}

/*
  The AssetFetcher is responsible for handing different
  project sources and the asset files within or referred
  to in a project.
*/
export const AssetFetcher = {
    // TODO: Check the contents of the source to be parsed
    //     for better parsing
	async parseSb3(sb3File: string) {
		const zip = new JSZip();
		const sb3Content = await fsp.readFile(sb3File);
		const data = await zip.loadAsync(sb3Content)
		const projectJSONString = await data.files[ProjectSource.PROJECT_JSON].async('string');
		return JSON.parse(projectJSONString);
	},

	async parseJSON(jsonFile: string) {
		const data = await fsp.readFile(jsonFile);
		return JSON.parse(data.toString())
	},

	async parseFromCloudID(cloudId: number) {
		const data = await fetch(`${ProjectSource.MIT_PROJECT_URI}/${cloudId}`);
		const projectJSON = await data.json();
		return projectJSON;
	},

	async parse(source: any) {
		let parser;

		if(typeof source === 'number'){
			parser = 'parseFromCloudID';
		}

		else {
			
			if(source.endsWith('.json')){
			parser = "parseJSON";
		}

		 	if(source.endsWith('.sb3')){
				parser = "parseSb3";
			}
		}

		return this[parser](source);
	}
}