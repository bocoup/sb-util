interface Queryable {
	query(selector: String);
}

export class ScratchProject implements Queryable {
	query(selector?: String) {
		return [];
	}
}