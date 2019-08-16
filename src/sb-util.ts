import {
    Queryable,
    SpriteProperties,
    SpritePosition,
    BlockProperties,
    BlockQueryProperties,
    SB3ProjectJSON,
    VariableProperties,
} from './abstracts';

import { Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';

import {
    validateSpriteSelector,
    isSelectorAttrValue,
    getAttributeAndValueInSelector,
    attrValueContainsQuotes,
    parseBlockQuerySelector,
} from './selector-parse';

import { map, filter, makeIterable, first, flatmap, chain } from './generators';
import { BlockOpcodeToShape } from './block-shapes';
export { BlockShapes } from './block-shapes';
import {
    deserializeBlocks,
    deserializeVariables,
    deserializeBroadcastVariables,
    deserializeListVariables,
} from './sb3-serialize';
import {
    getSpriteMeta,
    getBlockMeta,
    getVariableMeta,
    setMetaIterable,
    setVariableMetaIterable,
    setVariableMetaSprite,
} from './meta-data';

enum SpriteAttributes {
    BLOCKS = 'blocks',
    BROADCASTS = 'broadcasts',
    LISTS = 'lists',
    VARIABLES = 'variables',
}

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

    public blocks(): BlockCollection {
        return new BlockCollection(
            makeIterable(
                this,
                (iter): Iterator<BlockProperties> =>
                    flatmap(iter, (sp): Iterable<BlockProperties> => sp.blocks().propsIterable()),
            ),
        );
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

    public isStage(): boolean {
        return this.prop('isStage');
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
        return this.props()[property];
    }

    public props(): SpriteProperties {
        return storage.get(this)[0];
    }

    public position(): SpritePosition {
        const x = this.prop('x');
        const y = this.prop('y');
        return { x, y };
    }

    public blocks(query?: string): BlockCollection {
        const deserialized = makeIterable(this.prop('blocks'), deserializeBlocks);
        const tagOwnerIterator = setMetaIterable(
            deserialized,
            (b): BlockProperties => {
                getBlockMeta(b).sprite = this.props();
                return b;
            },
        );
        const blocks = new BlockCollection(tagOwnerIterator);
        if (query !== undefined) {
            return blocks.query(query);
        }
        return blocks;
    }

    public broadcasts(): Record<string, string> {
        // DISABLING ESLINT: broadcasts are a nested object
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.prop(SpriteAttributes.BROADCASTS);
    }

    /**
     * @return {VariableCollection}
     *
     * In the Scratch VM, lists are a variable type. They can
     *  be local or global to a Sprite
     */
    public lists(): VariableCollection {
        let listVariables: Iterable<VariableProperties>;
        const stage = getSpriteMeta(this.props()).project.stage();

        // Handle Global SCALAR vars
        const deserializedGlobalListVars: Iterable<VariableProperties> = makeIterable(
            stage.prop(SpriteAttributes.LISTS),
            deserializeListVariables,
        );

        const globalListVariableIterable = setVariableMetaSprite(deserializedGlobalListVars, stage.props());

        listVariables = globalListVariableIterable;

        // Handle Local SCALAR vars
        if (!this.isStage()) {
            const deserializedLocalListVars: Iterable<VariableProperties> = makeIterable(
                this.prop(SpriteAttributes.LISTS),
                deserializeListVariables,
            );

            const localListVariableIterable = setVariableMetaSprite(deserializedLocalListVars, this.props());
            listVariables = chain(globalListVariableIterable, localListVariableIterable);
        }

        return new VariableCollection(listVariables);
    }

    /**
     * @return {VariableCollection}. The variables available to a Sprite include the
     *      variables attached to the sprite as well as variables in the
     *      global scope, which are attached to the stage. Also included in variables
     *      are broadcasts (which are always global) and lists, which can be global
     *      or local.
     */
    public variables(): VariableCollection {
        let scalarVariables: Iterable<VariableProperties>;

        const stage = getSpriteMeta(this.props()).project.stage();

        // Handle Global SCALAR vars
        const deserializedGlobalScalarVars: Iterable<VariableProperties> = makeIterable(
            stage.prop(SpriteAttributes.VARIABLES),
            deserializeVariables,
        );
        const globalScalarVariableIterable = setVariableMetaSprite(
            deserializedGlobalScalarVars,
            stage.props(),
        );

        scalarVariables = globalScalarVariableIterable;

        if (!this.isStage()) {
            // Handle Local SCALAR vars
            const deserializedLocalScalarVars = makeIterable(
                this.prop(SpriteAttributes.VARIABLES),
                deserializeVariables,
            );
            const localScalarVariableIterable = setVariableMetaSprite(
                deserializedLocalScalarVars,
                this.props(),
            );

            scalarVariables = chain(globalScalarVariableIterable, localScalarVariableIterable);
        }

        return new VariableCollection(scalarVariables);
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
        return new BlockCollection(
            makeIterable(
                this.propsIterable(),
                (iter): Iterator<BlockProperties> => filter(iter, ({ topLevel }): boolean => topLevel),
            ),
        );
    }

    public first(): Block {
        return first(makeIterable(this, (): Iterator<Block> => this[Symbol.iterator]()));
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
