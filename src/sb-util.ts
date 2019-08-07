import {
    Queryable,
    SpriteProperties,
    SpritePosition,
    BlockProperties,
    BlockQueryProperties,
} from './abstracts';

import { Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';

import {
    validateSpriteSelector,
    isSelectorAttrValue,
    getAttributeAndValueInSelector,
    attrValueContainsQuotes,
    parseBlockQuerySelector,
} from './selector-parse';

import { map, filter, makeIterable, first } from './generators';
import { BlockOpcodeToShape } from './block-shapes';
import { BlockOpcodes } from './block-opcodes';
import { SensingBlockArgs, ControlBlocksArgs, DataBlockArgs, MotionBlockArgs } from './block-args';

enum ScratchProjectKeys {
    TARGETS = 'targets',
}

enum SpriteAttributes {
    BLOCKS = 'blocks',
    BROADCASTS = 'broadcasts',
    LISTS = 'lists',
}

/*
sb-util CLASSES.

The classes below make up the sb-util API.
*/

// This is the global storage for project data
const storage = new WeakMap();

export class ScratchProject {
    public constructor(projectJSON: JSON) {
        storage.set(this, projectJSON);
    }

    // DISABLING ESLINT: a prop can be a string, number, object, or boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public prop(property: string): any {
        return storage.get(this)[property];
    }

    public sprites(selector?: string): SpriteCollection {
        if (selector && typeof selector !== 'string')
            throw new Error('SpriteCollection selector should be a string!');

        const sprites: Iterable<SpriteProperties> = this.prop(ScratchProjectKeys.TARGETS);
        if (!selector && typeof selector !== 'string') return new SpriteCollection(sprites);
        return new SpriteCollection(sprites).query(selector);
    }

    public stage(): Sprite {
        return this.sprites('[isStage=true]').first();
    }

    public blocks(): BlockCollection {
        // Getting an iterable collection of block properties from all the sprites
        const blocks =
            // A transformation from an Iterable<Sprite> to Iterable<BlockProperties>
            makeIterable(this.sprites(), function*(sprites): Iterator<BlockProperties> {
                for (const sprite of sprites) {
                    yield* sprite.blocks().propsIterable();
                }
            });

        return new BlockCollection(blocks);
    }
}

export class SpriteCollection implements Queryable {
    public constructor(sprites: Iterable<SpriteProperties>) {
        storage.set(this, sprites);
    }

    public first(): Sprite {
        const props: SpriteProperties = first(storage.get(this));
        return props ? new Sprite(props) : null;
    }

    public propsIterable(): Iterable<SpriteProperties> {
        return storage.get(this);
    }

    // DISABLING ESLINT: a prop can be a string, number, object, or boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public prop(attribute: string): any {
        const first = this.first();
        if (!first) return null;
        return first.prop(attribute);
    }

    /*
		Currently, the query selector syntax only supports
		attribute selector style in the form of [attr] and
		[attr=value]
	*/
    public query(selector: string): SpriteCollection {
        validateSpriteSelector(selector);

        // string between brackets
        const selectorBody = selector.slice(1, -1);

        let sprites: Iterable<SpriteProperties>,
            filterFunction: (s: SpriteProperties) => boolean,
            attrValue: string | number | boolean, // the attribute being queried for might be string, number, or bool
            allSprites = this.propsIterable();

        // case when selector string is in [attr=value] form
        if (isSelectorAttrValue(selectorBody)) {
            const [attr, valueString] = getAttributeAndValueInSelector(selectorBody);

            attrValue = valueString;

            // handle case when booleans are strings
            if (valueString === 'true' || valueString === 'false') {
                attrValue = Boolean(valueString);
            }
            // handle case when numbers are strings
            else if (!isNaN(+valueString)) {
                attrValue = +valueString;
            }
            // handle case when strings have quotes
            else if (attrValueContainsQuotes(valueString)) {
                attrValue = valueString.replace(/^[",'](.*)[",']$/, '$1');
            }

            filterFunction = (s: SpriteProperties): boolean => s[attr] === attrValue;
        }
        // case when selector string is in [attr] form
        else {
            const attr = selectorBody;
            filterFunction = (s: SpriteProperties): boolean => attr in s;
        }

        sprites = makeIterable(
            allSprites,
            (s: Iterable<SpriteProperties>): Iterator<SpriteProperties> => filter(s, filterFunction),
        );
        return new SpriteCollection(sprites);
    }

    public [Symbol.iterator](): Iterator<Sprite> {
        const sprites: Iterable<SpriteProperties> = storage.get(this);
        return map(sprites, (props: SpriteProperties): Sprite => new Sprite(props));
    }
}

export class Sprite extends SpriteCollection {
    public constructor(sprite: SpriteProperties) {
        // Per documentation, Sprite is a singleton SpriteCollection
        super([sprite]);
    }

    // DISABLING ESLINT: a prop can be a string, number, object, or boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public prop(property: string): any {
        const sprite = storage
            .get(this)
            .slice(-1)
            .pop();
        return sprite[property];
    }

    public position(): SpritePosition {
        const x = this.prop('x');
        const y = this.prop('y');
        return { x, y };
    }

    public blocks(): BlockCollection {
        // DISABLING ESLINT: the blocks in a sprite are an object with many things nested inside
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blocksObj: Record<string, any> = this.prop('blocks');
        const allBlocks: Iterable<BlockProperties> = Object.entries(blocksObj).map(
            ([blockId, block]): BlockProperties => ({
                id: blockId,
                ...block,
            }),
        );
        return new BlockCollection(allBlocks);
    }

    public broadcasts(): Record<string, string> {
        // DISABLING ESLINT: broadcasts are a nested object
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.prop(SpriteAttributes.BROADCASTS);
    }

    // DISABLING ESLINT: lists are a nested object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public lists(): Record<string, any> {
        return this.prop(SpriteAttributes.LISTS);
    }
}

export class BlockCollection implements Queryable {
    public constructor(blocks: Iterable<BlockProperties>) {
        storage.set(this, blocks);
    }

    public propsIterable(): Iterable<BlockProperties> {
        return storage.get(this);
    }

    public first(): Block {
        return first(makeIterable(this, (): Iterator<Block> => this[Symbol.iterator]()));
    }

    public props(): BlockProperties {
        // Remember that a Block is a BlockCollection of one element
        return first(storage.get(this));
    }

    public query(selector: string): BlockCollection {
        const {
            attr,
            queryValues: { type, shape, opcode },
        }: BlockQueryProperties = parseBlockQuerySelector(selector);

        const allBlocks = this.propsIterable();

        let filterFunction = (b: BlockProperties): boolean => b[attr] === opcode;

        // Check that the query is asking for block type
        if (type) filterFunction = (b: BlockProperties): boolean => b[attr].includes(type);

        if (shape) {
            if (type) {
                filterFunction = (b: BlockProperties): boolean =>
                    b[attr].includes(type) && BlockOpcodeToShape[b.opcode] === shape;
            } else {
                filterFunction = (b: BlockProperties): boolean => BlockOpcodeToShape[b.opcode] === shape;
            }
        }

        const blocks: Iterable<BlockProperties> = makeIterable(
            allBlocks,
            (blockProps: Iterable<BlockProperties>): Iterator<BlockProperties> =>
                filter(blockProps, filterFunction),
        );

        return new BlockCollection(blocks);
    }

    public [Symbol.iterator](): Iterator<Block> {
        const blocks: Iterable<BlockProperties> = storage.get(this);
        return map(blocks, (props: BlockProperties): Block => new Block(props));
    }

    public renderToText(): Record<string, any> {
        return this.render(this.first(), []);
    }

    private getSubstackRef(block: Block, key: string) {
        return block.prop('inputs')[key][1];
    }

    private getOpBody(block: Block) {
        const opcode = block.prop('opcode');
        const inputs = block.prop('inputs');
        if (opcode === BlockOpcodes.DATA_CHANGEVARIABLEBY) {
            return {
                [opcode]: {
                    variable: block.prop('fields')[DataBlockArgs.VARIABLE][0],
                    value: block.prop('inputs')[DataBlockArgs.VALUE][1][1],
                },
            };
        }

        if (opcode === BlockOpcodes.MOTION_GOTOXY) {
            return {
                [opcode]: {
                    X: block.prop('inputs')[MotionBlockArgs.X][1][1],
                    Y: block.prop('inputs')[MotionBlockArgs.Y][1][1],
                },
            };
        }

        if (SensingBlockArgs.KEY_OPTION in inputs) {
            const keyOptionBlock = new Block(
                filter(
                    this.propsIterable(),
                    b => b.id === block.prop('inputs')[SensingBlockArgs.KEY_OPTION][1],
                ).next().value,
            );

            return {
                [opcode]: {
                    [keyOptionBlock.prop('opcode')]: keyOptionBlock.prop('fields')[
                        SensingBlockArgs.KEY_OPTION
                    ][0],
                },
            };
        }
        console.warn(`${opcode} body is not implemented yet`);
        return {};
    }

    private getNextBlock(block: Block) {
        return new Block(filter(this.propsIterable(), b => b.id === block.prop('next')).next().value);
    }

    private getBlockByID(id: string) {
        return new Block(filter(this.propsIterable(), b => b.id === id).next().value);
    }

    // This method assumes that there is an input body in a block
    private getSubstackBody(block: Block, substackType: string) {
        const opcode = block.prop('opcode');
        if (ControlBlocksArgs.CONDITION === substackType) {
            const conditionBlockRef = this.getSubstackRef(block, ControlBlocksArgs.CONDITION);
            const opBody = this.getOpBody(this.getBlockByID(conditionBlockRef));
            if (opcode === BlockOpcodes.CONTROL_IF_ELSE) {
                return {
                    if: {
                        condition: opBody,
                    },
                };
            }

            if (opcode === BlockOpcodes.CONTROL_WAIT_UNTIL) {
                return {
                    condition: opBody,
                };
            }
        }

        if (ControlBlocksArgs.SUBSTACK === substackType || ControlBlocksArgs.SUBSTACK2 === substackType) {
            const substack =
                ControlBlocksArgs.SUBSTACK2 === substackType
                    ? ControlBlocksArgs.SUBSTACK2
                    : ControlBlocksArgs.SUBSTACK;
            if (opcode === BlockOpcodes.CONTROL_IF_ELSE) {
                const substackBlockRef = this.getSubstackRef(block, substack);
                const firstSubstackBlock = this.getBlockByID(substackBlockRef);
                const body = this.render(firstSubstackBlock, []);
                const then = substack === ControlBlocksArgs.SUBSTACK2 ? 'else' : 'then';
                return {
                    [then]: body,
                };
            }
        }

        console.warn(`${substackType} not implemented yet!`);
        return {};
    }

    private render(block: Block, steps: any[], inputArgName?: string, fieldArgName?: string): string[] {
        // STOP CONDITION
        if (!block) {
            return steps;
        }

        const opBody = this.getOpBody(block);
        if (Object.keys(opBody).length === 0) {
            steps.push(block.prop('opcode'));
        } else {
            steps.push(opBody);
        }

        // Follow the tree down condition and substack branches
        const inputs = block.prop('inputs');
        if (ControlBlocksArgs.CONDITION in inputs) {
            const lastOpcode = steps.pop();
            steps.push({
                [lastOpcode]: this.getSubstackBody(block, ControlBlocksArgs.CONDITION),
            });
        }

        if (ControlBlocksArgs.SUBSTACK in inputs) {
            let substack = steps.pop();
            if (typeof substack === 'string') {
                substack = { [substack]: {} };
            }
            const lastOpcode = Object.keys(substack)[0];
            Object.assign(substack[lastOpcode], this.getSubstackBody(block, ControlBlocksArgs.SUBSTACK));
            steps.push(substack);
        }

        if (ControlBlocksArgs.SUBSTACK2 in inputs) {
            let substack2 = steps.pop();
            if (typeof substack2 === 'string') {
                substack2 = { [substack2]: {} };
            }
            const lastOpcode = Object.keys(substack2)[0];
            Object.assign(substack2[lastOpcode], this.getSubstackBody(block, ControlBlocksArgs.SUBSTACK2));
            steps.push(substack2);
        }

        const nextBlock = this.getNextBlock(block);
        return this.render(nextBlock.props() ? nextBlock : null, steps);
    }
}

export class Block extends BlockCollection {
    public constructor(block: BlockProperties) {
        super([block]);
    }

    // DISABLING ESLINT: a prop can be a string, number, object, or boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public prop(property: string): any {
        const props = this.props();
        if (!props) return null;
        return props[property];
    }
}

/*
LOADING FUNCTIONS.

The global methods below create ScratchProject objects based on the input source.
*/
export const loadSb3 = async function(source: string): Promise<ScratchProject> {
    const projectJSON = await new Sb3Fetcher().parse(source);
    return new ScratchProject(projectJSON);
};

export const loadProjectJson = async function(source: string): Promise<ScratchProject> {
    const projectJSON = await new ProjectJsonFetcher().parse(source);
    return new ScratchProject(projectJSON);
};

export const loadCloudId = async function(cloudId: number): Promise<ScratchProject> {
    const projectJSON = await new ProjectByCloudIdFetcher().parse(cloudId);
    return new ScratchProject(projectJSON);
};
