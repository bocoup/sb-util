import { loadSb3, loadProjectJson, loadCloudId, ScratchProject, SpriteCollection } from '../src/sb-util';
import process from 'process';

describe('ScratchProject', () => {
	let sb3, projectJson, cloudJson;

	beforeAll(async () => {
		sb3 = await loadSb3(`${process.cwd()}/tests/data/test.sb3`);
		projectJson = await loadProjectJson(`${process.cwd()}/tests/data/project.json`);
		cloudJson = await loadCloudId(319383115);
	});

	test('is intialized with sb3 file', () => {
		expect(sb3).toBeInstanceOf(ScratchProject);
	});

	test('is intialized with project.json file', async () => {
		expect(projectJson).toBeInstanceOf(ScratchProject);
	});

	test('is intialized with cloud ID', async () => {
		expect(cloudJson).toBeInstanceOf(ScratchProject);
	});
})

describe('Sprite(s)', () => {
	let sp, sprites;

	beforeAll(async () => {
		sp = await loadProjectJson(`${process.cwd()}/tests/data/project.json`);
	});

	test('to be returned from a ScratchProject', async () => {
		sprites = sp.sprites();
		expect(sprites).toBeInstanceOf(SpriteCollection);
	});

	test('to fail with empty string query on ScratchProject sprites() API', () => {
		expect(() => sp.sprites('')).toThrowError();
	});

	test('to fail with invalid query on ScratchProject sprites() API', () => {
		expect(() => sp.sprites('[')).toThrowError();
	});

	test('to query stage with ScratchProject sprites() API', () => {
		const stage = sp.sprites('[isStage=true]')
	});
})
