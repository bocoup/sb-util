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
import { ControlBlocksArgs, SensingBlockArgs } from './block-args';

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

    // eslint-disable-next-line
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

    // eslint-disable-next-line
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

    // eslint-disable-next-line
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
        // eslint-disable-next-line
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
        // eslint-disable-next-line
        return this.prop(SpriteAttributes.BROADCASTS);
    }

    // eslint-disable-next-line
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

    private render(block: Block, steps: any[], inputArgName?: string, fieldArgName?: string): string[] {
        if (inputArgName) {
            if (inputArgName === ControlBlocksArgs.CONDITION) {
                const controlOpcode = steps[steps.length - 1];
                steps.pop();
                const opcode = block.prop('opcode');
                steps.push({
                    [controlOpcode]: {
                        if: {
                            condition: {
                                [opcode]: {},
                            },
                        },
                    },
                });
            }
        } else if (fieldArgName) {
            if (fieldArgName === SensingBlockArgs.KEY_OPTION) {
                const lastStep = steps.pop();
                if (Object.keys(lastStep)[0] === BlockOpcodes.CONTROL_IF_ELSE) {
                    steps.push({
                        [Object.keys(lastStep)[0]]: {
                            if: {
                                [BlockOpcodes.SENSING_KEYPRESSED]: {
                                    [BlockOpcodes.SENSING_KEYOPTIONS]: block.prop('fields')[
                                        SensingBlockArgs.KEY_OPTION
                                    ][0],
                                },
                            },
                        },
                    });
                }
            }
        } else {
            steps.push(block.prop('opcode'));
        }

        if (block.prop('inputs')) {
            const blockInputs = block.prop('inputs');
            if (ControlBlocksArgs.CONDITION in blockInputs) {
                // The CONDITION arg in Control-If* blocks is an array of length 2, the first element being shadow, the second being the block id
                const next = new Block(
                    filter(
                        this.propsIterable(),
                        b => b.id === block.prop('inputs')[ControlBlocksArgs.CONDITION][1],
                    ).next().value,
                );
                steps = this.render(next, steps, ControlBlocksArgs.CONDITION);
            }

            if (SensingBlockArgs.KEY_OPTION in blockInputs) {
                const next = new Block(
                    filter(
                        this.propsIterable(),
                        b => b.id === block.prop('inputs')[SensingBlockArgs.KEY_OPTION][1],
                    ).next().value,
                );
                steps = this.render(next, steps, '', SensingBlockArgs.KEY_OPTION);
            }
        }

        // STOP CONDITION
        if (block.prop('next') === null) {
            return steps;
        }

        const next = new Block(filter(this.propsIterable(), b => b.id === block.prop('next')).next().value);
        return this.render(next, steps);
    }
}

export class Block extends BlockCollection {
    public constructor(block: BlockProperties) {
        super([block]);
    }

    // eslint-disable-next-line
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
