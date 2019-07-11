import { ScratchProject } from './sb-util';

it('creates a ScratchProject object', () => {
	expect(new ScratchProject()).toBeInstanceOf(ScratchProject);
})