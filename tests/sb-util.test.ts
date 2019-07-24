import { loadSb3, loadProjectJson, loadCloudId, ScratchProject, SpriteCollection, Sprite, BlockCollection } from '../src/sb-util';
import process from 'process';

describe('ScratchProject class --------------------', () => {
	describe('loading functions', () => {
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
	});

	describe('class functions', () => {
		let sp, sprites;
		
		beforeAll(async () => {
			sp = await loadProjectJson(`${process.cwd()}/tests/data/project.json`);
		});

		test('props returns value for first sprite in SpriteCollection', () => {
			expect(sp.sprites().prop('isStage')).toBeDefined();
		});

		describe('sprites()', () => {
			test('to be returned from a ScratchProject', async () => {
				sprites = sp.sprites();
				expect(sprites).toBeInstanceOf(SpriteCollection);
			});
		
			test('to fail with empty string query string', () => {
				expect(() => sp.sprites('')).toThrowError();
			});
		
			test('to fail with invalid query string', () => {
				expect(() => sp.sprites('[')).toThrowError();
			});

			test('to fail with non-string query string', () => {
				expect(() => sp.sprites(12345)).toThrowError();
			});
		
			test('to query stage with ScratchProject', () => {
				const stage = sp.sprites('[isStage=true]');
				expect(stage).toBeInstanceOf(SpriteCollection);
			});
		
			test('to get stage with stage() function', () => {
				const stage = sp.stage();
				expect(stage).toBeInstanceOf(Sprite);
		
				const isStageProperty = stage.prop('isStage');
				expect(isStageProperty).toBeTruthy();
			});
		
			test('to query for sprites with an attribute that is numeric', () => {
				const sprites = sp.sprites('[layerOrder=1]');
				expect(sprites).toBeInstanceOf(SpriteCollection);
			});
		
			test('to query for sprites with single attribute with ScratchProject', () => {
				const sprites = sp.sprites('[x]');
				expect(sprites).toBeInstanceOf(SpriteCollection);
			});

			test('to query sprites where value is a string with double quotes', () => {
				const sprite = sp.sprites('[name="Sprite1"]');;
				expect(sprite).toBeInstanceOf(SpriteCollection);
			});

			test('to query sprites where value is a string with single quotes', () => {
				const sprite = sp.sprites("[name='Sprite1']");;
				expect(sprite).toBeInstanceOf(SpriteCollection);
			});
		});

		describe('blocks()', () => {
			let sp;
		
			beforeAll(async () => {
				sp = await loadProjectJson(`${process.cwd()}/tests/data/accelerator.json`);
			});
		});

	});
});

/* The implementation of ScratchProject#sprites() method is tightly
	 coupled to SpriteCollection#query() method. Testing the query()
	 method can be done, but it is redundant.
*/
describe('Sprite class -------------------------', () => {
	let sp, sprite;

	beforeAll(async () => {
		sp = await loadProjectJson(`${process.cwd()}/tests/data/project.json`);
		sprite = sp.sprites('[name="Sprite1"]').first(); // know the sprite's name because of knowledge of project.json file
	});

	test('can get sprite position', () => {
		const position = sprite.position();
		expect(position).toHaveProperty('x');
		expect(position).toHaveProperty('y');
	});

	test('can get broadcasts', () => {
		const broadcasts = sprite.broadcasts();
		expect(broadcasts).toBeInstanceOf(Object);
	});

	test('can get lists', () => {
		const lists = sprite.lists();
		expect(lists).toBeInstanceOf(Object);
	})
});
