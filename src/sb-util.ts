interface Queryable {
	query(selector: String);
}

export class ScratchProject implements Queryable {
	query(selector?: String) {
		return [];
	}
}

let ScratchProjectInitializer = {
	ready: function(options: Object): Promise<ScratchProject> {
		return new Promise((res, rej) => {
			res(new ScratchProject());
		});
	}
}

export { ScratchProjectInitializer };

