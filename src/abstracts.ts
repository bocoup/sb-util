export interface Queryable {
	query(selector: string);
}

export interface AssetFetcher {
	parse(source: any);
}
