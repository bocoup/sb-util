export interface Queryable {
	query(selector: String);
}

export interface ScratchProjectOptions {
	file?: String,
	uri?: String,
	cloudId?: number
}