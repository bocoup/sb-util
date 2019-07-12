export interface Queryable {
	query(selector: String);
}

export interface ScratchProjectOptions {
	file?: string,
	uri?: string,
	cloudId?: number
}