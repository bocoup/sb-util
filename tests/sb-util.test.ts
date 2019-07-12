import { initialize, ScratchProject } from '../src/sb-util';
import process from 'process';

test('ScratchProject not initialized on invalid options', () => {
	expect.assertions(2);
	
	// Empty options object
	try {
		initialize({});
	} catch (e) {
		expect(e.message).toContain('Please provide one of the following options');
	}

	// Multiple options object
	try {
		initialize({ 'file' : 'foo.sb3', 'cloudId': 12345 });
	} catch (e) {
		expect(e.message).toContain('Multiple options found.');
	}
});

test('ScratchProject intialized', async () => {
	// Test init on sb3 file
	await expect(initialize({ 'file': `${process.cwd()}/tests/data/test.sb3` })).resolves.toBeInstanceOf(ScratchProject);
	
	// Test init on project.json
	await expect(initialize({ 'file': `${process.cwd()}/tests/data/project.json`})).resolves.toBeInstanceOf(ScratchProject);

	await expect(initialize({ 'cloudId': 319383115 })).resolves.toBeInstanceOf(ScratchProject);
});



