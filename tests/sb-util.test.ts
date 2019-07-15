import { loadSB3, loadProjectJson, loadCloudId, ScratchProject } from '../src/sb-util';
import process from 'process';

test('ScratchProject intialized with sb3 file', async () => {
	// Test init on sb3 file
	await expect(loadSB3(`${process.cwd()}/tests/data/test.sb3`)).resolves.toBeInstanceOf(ScratchProject);
});

test('ScratchProject intialized with project.json file', async () => {
	// Test init on project.json
	await expect(loadProjectJson(`${process.cwd()}/tests/data/project.json`)).resolves.toBeInstanceOf(ScratchProject);
});

test('ScratchProject intialized with cloud ID', async () => {
	await expect(loadCloudId(319383115)).resolves.toBeInstanceOf(ScratchProject);
});


