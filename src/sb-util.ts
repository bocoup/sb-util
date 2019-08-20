import { SB3ProjectJSON, VariableProperties } from './abstracts';

import { Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';

import { map, first } from './generators';
export { BlockShapes } from './block-shapes';
import { getSpriteMeta, getVariableMeta } from './meta-data';
import { SpriteCollection, Sprite } from './sprites';
import { Block, BlockCollection } from './blocks';

export { Block, BlockCollection, SpriteCollection, Sprite };

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
