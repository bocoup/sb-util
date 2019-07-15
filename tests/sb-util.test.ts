import { initialize, ScratchProject } from '../src/sb-util';
import process from 'process';

test('ScratchProject not initialized on empty options', () => {	
	// Empty options object
	try {
		initialize({});
	} catch (e) {
		expect(e.message).toContain('Please provide one of the following options');
	}
});

test('ScratchProject not initialized on multiple present options', () => {
	// Multiple options object
	try {
		initialize({ 'file' : 'foo.sb3', 'cloudId': 12345 });
	} catch (e) {
		expect(e.message).toContain('Multiple options found.');
	}
});

test('ScratchProject intialized with sb3 file', async () => {
	// Test init on sb3 file
	await expect(initialize({ 'file': `${process.cwd()}/tests/data/test.sb3` })).resolves.toBeInstanceOf(ScratchProject);
});

test('ScratchProject intialized with project.json file', async () => {
	// Test init on project.json
	await expect(initialize({ 'file': `${process.cwd()}/tests/data/project.json`})).resolves.toBeInstanceOf(ScratchProject);
});

test('ScratchProject intialized with cloud ID', async () => {
	await expect(initialize({ 'cloudId': 319383115 })).resolves.toBeInstanceOf(ScratchProject);
});


