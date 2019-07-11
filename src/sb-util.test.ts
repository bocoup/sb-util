import { ScratchProjectInitializer } from './sb-util';

it('creates a ScratchProject object', () => {
	expect(ScratchProjectInitializer.ready({})).toBeInstanceOf(Promise);
})