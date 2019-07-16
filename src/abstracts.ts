export interface Queryable {
	query(selector: string);
}

export interface ScratchProjectOptions {
	file?: string,
	uri?: string,
	cloudId?: number
}

export interface AssetFetcher {
	parse(source: any);
}
