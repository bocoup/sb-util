import { Queryable, ScratchProjectOptions } from './abstracts'



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
const initialize = function(options: ScratchProjectOptions): Promise<ScratchProject> {
	if (!options || Object.keys(options).length === 0) { 
		throw new OptionsEmptyError('Please provide one of the following options: file, uri, or cloudId.'); 
	} else if (Object.keys(options).length > 1) {
		throw new MultipleSourceOptionsError('Multiple options found. Please supply only one of the following: file, uri, or cloudId');
	}

	return new Promise<ScratchProject>((resolve, reject) => {
		resolve(new ScratchProject);
	});
}

class OptionsEmptyError extends Error {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
    }
 }

 class MultipleSourceOptionsError extends Error {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
    }
 }


export { initialize };

