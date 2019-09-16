import { BlockCollection } from './BlockCollection';
import { getSpriteMeta } from './meta-data';
import { SB3ProjectJSON } from './abstracts';
import { Sprite } from './Sprite';
import { SpriteCollection } from './SpriteCollection';

/**
 * The main wrapper for a loaded Scratch Project
 */

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
