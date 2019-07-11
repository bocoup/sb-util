import { initialize } from './sb-util';

it('ScratchProject not initialized on invalid options', () => {

	expect(() => initialize({})).toThrow();
	expect(() => initialize({ 'file' : 'foo.sb3', 'cloudId': 12345 })).toThrow();
})