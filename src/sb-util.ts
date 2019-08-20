import {
    Queryable,
    BlockProperties,
    BlockQueryProperties,
    SB3ProjectJSON,
    VariableProperties,
} from './abstracts';

import { Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';

import { parseBlockQuerySelector } from './selector-parse';

import { map, first, filterIterable } from './generators';
import { BlockOpcodeToShape } from './block-shapes';
export { BlockShapes } from './block-shapes';
import { getSpriteMeta, getBlockMeta, getVariableMeta } from './meta-data';
import { SpriteCollection, Sprite } from './sprites';

export { SpriteCollection, Sprite };

/*
sb-util CLASSES.

The classes below make up the sb-util API.
*/

// This is the global storage for project data
const storage = new WeakMap();

export class ScratchProject {
    /**
     * The project JSON as read from the project.
     */
    public projectJSON: SB3ProjectJSON;

    public constructor(projectJSON: SB3ProjectJSON | JSON) {
        this.projectJSON = projectJSON as SB3ProjectJSON;
    }

    // DISABLING ESLINT: a prop can be a string, number, object, or boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public prop(property: string): any {
        return this.projectJSON[property];
    }

    public sprites(selector?: string): SpriteCollection {
        this.projectJSON.targets.forEach((p): void => {
            getSpriteMeta(p).project = this;
        });
        const collection = new SpriteCollection(this.projectJSON.targets);
        if (selector !== undefined) {
            return collection.query(selector);
        }
        return collection;
    }

    public stage(): Sprite {
        return this.sprites('[isStage=true]').first();
    }

    public blocks(): BlockCollection {
        return this.sprites().blocks();
    }
}

export class BlockCollection implements Queryable {
    public constructor(blocks: Iterable<BlockProperties>) {
        storage.set(this, blocks);
    }

    public propsIterable(): Iterable<BlockProperties> {
        return storage.get(this);
    }

    public top(): BlockCollection {
        return new BlockCollection(filterIterable(this.propsIterable(), ({ topLevel }): boolean => topLevel));
    }

    public first(): Block {
        return first(this);
    }

    public props(): BlockProperties {
        // Remember that a Block is a BlockCollection of one element
        return first(storage.get(this));
    }

    // todo: eventually this should be able to be written as return this.query(`[id="${id}"]`).first()
    public byId(id: string): Block {
        for (const block of this) {
            if (block.prop('id') === id) {
                return block;
            }
        }
        return null;
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

        const blocks: Iterable<BlockProperties> = filterIterable(allBlocks, filterFunction);

        return new BlockCollection(blocks);
    }

    public [Symbol.iterator](): Iterator<Block> {
        const blocks: Iterable<BlockProperties> = storage.get(this);
        return map(blocks, (props: BlockProperties): Block => new Block(props));
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

    public sprite(): Sprite {
        return new Sprite(getBlockMeta(this.props()).sprite);
    }

    public parent(): Block {
        const parentId: string = this.prop('parent');
        if (parentId) {
            return this.sprite()
                .blocks()
                .byId(parentId);
        }
        return null;
    }

    public input(name: string): Block {
        const { inputs } = this.props();
        const blockId = inputs[name] && inputs[name].block;
        if (blockId) {
            return this.sprite()
                .blocks()
                .byId(blockId);
        }
        return null;
    }

    public shadow(name: string): Block {
        const { inputs } = this.props();
        const blockId = inputs[name] && inputs[name].shadow;
        if (blockId) {
            return this.sprite()
                .blocks()
                .byId(blockId);
        }
        return null;
    }
}

/** Class representing a variable collection */
export class VariableCollection {
    /**
     *
     * @param variables an Iterable of VariableProperties
     */
    public constructor(variables: Iterable<VariableProperties>) {
        storage.set(this, variables);
    }

    /**
     * @returns The first variable in this collection and its props
     */
    public props(): VariableProperties {
        return first(storage.get(this));
    }

    /**
     *
     * @param property string representing property name
     * @returns a prop value. can be string, number, object, array, or boolean
     */
    // DISABLING ESLINT: a prop can be a string, number, object, array, or boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public prop(property: string): any {
        return this.props()[property];
    }

    /**
     * @returns Iterable of VariableProperties
     */
    public propsIterable(): Iterable<VariableProperties> {
        return storage.get(this);
    }

    /**
     *
     * @param id the id string of a variable
     * @returns Variable object
     */
    public byId(id: string): Variable {
        for (const variable of this) {
            if (variable.prop('id') === id) {
                return variable;
            }
        }
        return null;
    }

    public [Symbol.iterator](): Iterator<Variable> {
        const blocks: Iterable<VariableProperties> = storage.get(this);
        return map(blocks, (props: VariableProperties): Variable => new Variable(props));
    }
}

/** Class representing a Scratch variable. It is a singleton VariableCollection */
export class Variable extends VariableCollection {
    /**
     *
     * @param variable an object with fields of VariableProperties
     */
    public constructor(variable: VariableProperties) {
        super([variable]);
    }

    /**
     * @returns Sprite that this variable belongs to
     */
    public sprite(): Sprite {
        return new Sprite(getVariableMeta(this.props()).sprite);
    }

    /**
     * @returns boolean representing if this is a global variable or not
     */
    public global(): boolean {
        return this.sprite().isStage();
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
