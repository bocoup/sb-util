import { initialize } from './sb-util';

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
})

test('ScratchProject intialized with a local file', () => {
	expect(initialize({'file': 'foo.sb3'})).toBeInstanceOf(Promise);
})

