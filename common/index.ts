import AdmZip from 'adm-zip';
import fs from 'fs';
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
	parseSb3: function (sb3File: string) {
		return new Promise((resolve, reject) => {
			const sb3 = new AdmZip(sb3File);
			const projectJSONString = sb3.readAsText(ProjectSource.PROJECT_JSON);
			resolve(JSON.parse(projectJSONString));
		})
	},

	parseJSON: function(jsonFile: string) {
		return new Promise((resolve, reject) => {
			fs.readFile(jsonFile, (err, data) => {
				resolve(JSON.parse(data.toString()));
			})
		})
	},

	parseFromCloudID: async function (cloudId: number) {
		const data = await fetch(`${ProjectSource.MIT_PROJECT_URI}/${cloudId}`);
		const projectJSON = await data.json();
		return projectJSON;
	}
}
