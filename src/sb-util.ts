interface Queryable {
	query(selector: String);
}

export class ScratchProject implements Queryable {
	query(selector?: String) {
		return [];
	}
}

/*
	initialize() is a factory method that returns a
	Promise to a ScratchProject while it does the
	necessary I/O or HTTP requests needed to populate 
	the ScratchProject
*/
const initialize = function(options: Object): Promise<ScratchProject> {
	return new Promise<ScratchProject>((resolve, reject) => {
		resolve(new ScratchProject);
	});
}


export { initialize };

