export class SpOptionsEmptyError extends Error {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
    }
 }

 export class SpMultipleSourceOptionsError extends Error {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
    }
 }