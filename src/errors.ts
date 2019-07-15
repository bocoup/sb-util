export class SpOptionsEmptyError extends Error {
    constructor(message?: string) {
        super(message);
        Error.captureStackTrace(this, SpOptionsEmptyError);
    }
 }

 export class SpMultipleSourceOptionsError extends Error {
    constructor(message?: string) {
        super(message);
        Error.captureStackTrace(this, SpMultipleSourceOptionsError);
    }
 }
