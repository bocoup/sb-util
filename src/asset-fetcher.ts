import { AssetFetcher } from './abstracts';
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


export class Sb3Fetcher implements AssetFetcher {
	async parse(source: string){
		const zip = new JSZip();
		const sb3Content = await fsp.readFile(source);
		const data = await zip.loadAsync(sb3Content)
		const projectJSONString = await data.files[ProjectSource.PROJECT_JSON].async('string');
		return JSON.parse(projectJSONString);
	}
}

export class ProjectJsonFetcher implements AssetFetcher {
	async parse(source: string) {
		const data = await fsp.readFile(source);
		return JSON.parse(data.toString())
	}
}

export class ProjectByCloudIdFetcher implements AssetFetcher {
	async parse(cloudId: number) {
		const data = await fetch(`${ProjectSource.MIT_PROJECT_URI}/${cloudId}`);
		const projectJSON = await data.json();
		return projectJSON;
	}
}