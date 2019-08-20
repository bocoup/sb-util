import { SB3ProjectJSON } from './abstracts';

import { Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';

export { BlockShapes } from './block-shapes';
import { getSpriteMeta } from './meta-data';

import { SpriteCollection, Sprite } from './sprites';
import { Block, BlockCollection } from './blocks';
import { Variable, VariableCollection } from './variables';

// Export the collections and properties wrappers
export { Block, BlockCollection, SpriteCollection, Sprite, Variable, VariableCollection };

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
