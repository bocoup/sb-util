import { initialize } from './sb-util';

it('creates a ScratchProject object', () => {
	expect(initialize({})).toBeInstanceOf(Promise);
})