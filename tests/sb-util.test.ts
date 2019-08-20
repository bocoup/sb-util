/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {
    loadSb3,
    loadProjectJson,
    loadCloudId,
    ScratchProject,
    SpriteCollection,
    Sprite,
    BlockCollection,
    Block,
} from '../src/sb-util';
import process from 'process';
import { BlockProperties } from '../src/abstracts';
import { BlockOpcodeToShape } from '../src/block-shapes';

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
            expect(
                sp
                    .sprites()
                    .first()
                    .prop('isStage'),
            ).toBeDefined();
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

            test('to get prop that does not exist', () => {
                const stage = sp.stage();
                expect(stage.prop('doesNotExist')).toBeUndefined();
            });

            test('to get first when sprites are empty', () => {
                const emptySprites = sp.sprites('[layerOrder=200]');
                expect(emptySprites.first()).toBeNull();
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
                const sprite = sp.sprites('[name="Sprite1"]');
                expect(sprite).toBeInstanceOf(SpriteCollection);
                expect(sprite.first().prop('name')).toEqual('Sprite1');
            });

            test('to query sprites where value is a string with single quotes', () => {
                const sprite = sp.sprites("[name='Sprite1']");
                expect(sprite).toBeInstanceOf(SpriteCollection);
                expect(sprite.first().prop('name')).toEqual('Sprite1');
            });
        });

        describe('blocks()', () => {
            let sp;

            beforeAll(async () => {
                sp = await loadProjectJson(`${process.cwd()}/tests/data/accelerator.json`);
            });

            test('get all blocks in a project', () => {
                const blocks = sp.blocks();
                expect(blocks).toBeInstanceOf(BlockCollection);
            });
        });
    });
});

/* The implementation of ScratchProject#sprites() method is tightly
	 coupled to SpriteCollection#query() method. Testing the query()
	 method can be done, but it is redundant.
*/
describe('Sprite class -------------------------', () => {
    let sp, spBig, sprite, spriteWithVars;

    beforeAll(async () => {
        sp = await loadProjectJson(`${process.cwd()}/tests/data/project.json`);
        spBig = await loadProjectJson(`${process.cwd()}/tests/data/accelerator.json`);
        sprite = sp.sprites('[name="Sprite1"]').first(); // know the sprite's name because of knowledge of project.json file
        spriteWithVars = spBig.sprites('[name="alt_othersprites"]').first();
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
    });

    test('can get all blocks', () => {
        const blocks = sprite.blocks();
        expect(blocks).toBeInstanceOf(BlockCollection);
    });

    describe('global variables tests on stage', () => {
        let stageVariables;
        beforeAll(() => {
            stageVariables = spBig.stage().variables();
        });

        test('get global variable on stage', () => {
            const globalVar = stageVariables.byId('1B!G;|;P6ALif|?9(Tum-glitch_Acceleration');
            expect(globalVar.global()).toBeTruthy();
            expect(globalVar.prop('name')).toEqual('glitch_Acceleration');
        });

        test('local scalar vars not on stage', () => {
            // ensure that scalar vars outside of global scope are not included
            const localScalarVar = stageVariables.byId('58`Aw=nriuw[2/#s@20!-X vel');
            expect(localScalarVar).toBeNull();
        });

        test('local list var not on stage', () => {
            // ensure that list vars outside of global scope are not included
            const localListVar = stageVariables.byId('2Q_=y9u5Qq|~fG25;O7V');
            expect(localListVar).toBeNull();
        });

        test('broadcast var on stage is global', () => {
            const globalBroadcastVar = spBig
                .stage()
                .broadcasts()
                .byId('broadcastMsgId-start glowing (accelerator)');
            expect(globalBroadcastVar.global()).toBeTruthy();
        });

        test('list var on stage is global', () => {
            const globalListVar = spBig
                .stage()
                .lists()
                .byId('Pi3E!fcsKWLQ}5(ugkcS');
            expect(globalListVar.global()).toBeTruthy();
        });
    });

    describe('variable tests on sprite', () => {
        let variables;

        beforeAll(() => {
            variables = spriteWithVars.variables();
        });

        test('get a local scalar variable on a Sprite', () => {
            const localScalarVar = variables.byId('58`Aw=nriuw[2/#s@20!-X vel');
            expect(localScalarVar.prop('name')).toEqual('X vel');
            expect(localScalarVar.prop('value')).toEqual(-0.44432764720836493);
            expect(localScalarVar.global()).toBeFalsy();
        });

        test('get a local list variable on a Sprite', () => {
            const localListVar = spriteWithVars.lists().byId('2Q_=y9u5Qq|~fG25;O7V');
            expect(localListVar.prop('name')).toEqual('sprite-list');
            expect(
                localListVar
                    .prop('value')
                    .map(Number)
                    .reduce((a: number, b: number) => a + b),
            ).toEqual(66);
        });

        test('global scalar var from stage available', () => {
            // scalar variable in global scope
            const globalScalarVar = variables.byId('1B!G;|;P6ALif|?9(Tum-glitch_Acceleration');
            expect(globalScalarVar.prop('name')).toEqual('glitch_Acceleration');
            expect(globalScalarVar.prop('value')).toEqual('50');
            expect(globalScalarVar.global()).toBeTruthy();
        });

        test('global broadcast var from stage available', () => {
            // broadcast variable in global scope
            const globalBroadcastVar = spriteWithVars
                .broadcasts()
                .byId('broadcastMsgId-start glowing (accelerator)');
            expect(globalBroadcastVar.prop('name')).toEqual('start glowing (accelerator)');
            expect(globalBroadcastVar.prop('value')).toEqual('start glowing (accelerator)');
            expect(globalBroadcastVar.global()).toBeTruthy();
        });

        test('global list var from stage available', () => {
            const globalListVar = spriteWithVars.lists().byId('Pi3E!fcsKWLQ}5(ugkcS');
            expect(globalListVar.prop('name')).toEqual('global-list');
            expect(
                globalListVar
                    .prop('value')
                    .map(Number)
                    .reduce((a: number, b: number) => a + b),
            ).toEqual(55);
        });
    });
});

describe('BlockCollection class ----------------', () => {
    let sp, blocks;

    beforeAll(async () => {
        // Choosing this file because it has a lot of blocks
        sp = await loadProjectJson(`${process.cwd()}/tests/data/accelerator.json`);
        blocks = sp.blocks();
    });

    test('query for opcode of serialized block', () => {
        expect.assertions(4);
        const eventFlagBlocks = blocks.query('event_whenflagclicked');
        for (const block of eventFlagBlocks) {
            expect(block.prop('opcode')).toEqual('event_whenflagclicked');
        }
    });

    test('query for opcode of deserialized block', () => {
        expect.assertions(65);
        for (const block of blocks.query('math_number')) {
            expect(block.prop('opcode')).toEqual('math_number');
        }
    });

    test('query for opcode not present', () => {
        const invalidOpcodeBlocks = blocks.query('some_opcode');
        expect(invalidOpcodeBlocks.first()).toBeNull();
    });

    test('query for block type', () => {
        const motionBlocks = blocks.query('.motion');
        const first = motionBlocks.first();
        expect(first).not.toBeNull();
        expect(first).toBeInstanceOf(Block);
        expect(first.prop('opcode')).toContain('motion');
    });

    test('query for invalid block type', () => {
        const invalidTypeBlocks = blocks.query(':invalid');
        expect(invalidTypeBlocks.first()).toBeNull();
    });

    test('query for block shape', () => {
        const reporterBlocks = blocks.query(':reporter');
        expect(BlockOpcodeToShape[reporterBlocks.first().prop('opcode')]).toEqual('reporter');
    });

    test('query for block type and shape', () => {
        const reporterBlocks = blocks.query('.operator :reporter');
        const first = reporterBlocks.first();
        expect(first.prop('opcode')).toContain('operator');
        expect(BlockOpcodeToShape[first.prop('opcode')]).toEqual('reporter');
    });

    test('query for block type and shape, order does not matter', () => {
        const reporterBlocks = blocks.query(':reporter .operator');
        const first = reporterBlocks.first();
        expect(first.prop('opcode')).toContain('operator');
        expect(BlockOpcodeToShape[first.prop('opcode')]).toEqual('reporter');
    });
});

describe('Block class -------------------------', () => {
    let sp, blocks;

    beforeAll(async () => {
        // Choosing this file because it has a lot of blocks
        sp = await loadProjectJson(`${process.cwd()}/tests/data/accelerator.json`);
        blocks = sp.blocks();
    });

    test('the first block exists', () => {
        expect(blocks.first()).toBeInstanceOf(Block);
    });

    test('can find top blocks', () => {
        expect.assertions(10);
        for (const block of blocks.top()) {
            expect(block.prop('topLevel')).toBeTruthy();
        }
    });

    test('get all properties of a block as an object', () => {
        const blockProps: BlockProperties = blocks.first().props();
        expect(blockProps).toBeInstanceOf(Object);
        expect(blockProps).toHaveProperty('id');
    });

    test('can find block by id', () => {
        const block = blocks.byId('8RrT-%*Y/x{|LPTvspp_');
        expect(block.prop('opcode')).toEqual('motion_changexby');
    });

    test('can find parent block', () => {
        const block = blocks.byId('8RrT-%*Y/x{|LPTvspp_');
        expect(block.parent().prop('opcode')).toEqual('control_if');
    });

    test('Walking parent tree', () => {
        let block = blocks.byId('Mcy_y_f^@Ag~9t=i]Nq6');
        expect(block.prop('id')).toEqual('Mcy_y_f^@Ag~9t=i]Nq6');
        block = block.parent();
        expect(block.prop('id')).toEqual('q[yiIaRe%!BrOtywvIl)');
        block = block.parent();
        expect(block.prop('id')).toEqual('9.BsT/=;}v36:]Bl*z8x');
        block = block.parent();
        expect(block.prop('id')).toEqual('GpW}XGe^n|-l,IYd.}}T');
        block = block.parent();
        expect(block.prop('id')).toEqual('J%zJt7edHvK]!OSrFLhU');
        block = block.parent();
        expect(block).toEqual(null);
    });

    test('Find input block', () => {
        let block = blocks.byId('GpW}XGe^n|-l,IYd.}}T').input('VALUE');
        expect(block.prop('id')).toEqual('xo,i:*{j^3jkOsM:EBwY');
    });

    test('Find shadow block', () => {
        let block = blocks.byId('GpW}XGe^n|-l,IYd.}}T').shadow('VALUE');
        expect(block.prop('opcode')).toEqual('text');
        expect(block.prop('shadow')).toEqual(true);
    });
});
