import { PropertiesWrapper } from './PropertiesWrapper';
import { SpriteProperties, SpritePosition, BlockProperties, VariableProperties } from './abstracts';
import { BlockCollection } from './BlockCollection';
import { VariableCollection } from './VariableCollection';
import { makeIterable, chain } from './generators';
import {
    deserializeBlocks,
    deserializeVariables,
    deserializeBroadcastVariables,
    deserializeListVariables,
} from './sb3-serialize';
import { setMetaIterable, getBlockMeta, getSpriteMeta, setVariableMetaSprite } from './meta-data';
import { SpriteAttributes } from './enum';

export class Sprite extends PropertiesWrapper<SpriteProperties> {
    /**
     * Is this sprite the stage?
     */
    public isStage(): boolean {
        const { isStage } = this.props();
        return Boolean(isStage);
    }
    /**
     * Return position {x, y} of Sprite.
     */
    public position(): SpritePosition {
        const x = this.prop('x');
        const y = this.prop('y');
        return { x, y };
    }
    /**
     * Get blocks from the sprite
     * @param query optional query string to query the collection
     */
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
    /**
     * @return {VariableCollection}
     *
     * In the Scratch VM, broadcasts are variables, and
     *  in the Scratch GUI are always global
     */
    public broadcasts(): VariableCollection {
        const stage = getSpriteMeta(this.props()).project.stage();
        const deserializedBroadcastVars: Iterable<VariableProperties> = makeIterable(
            stage.prop(SpriteAttributes.BROADCASTS),
            deserializeBroadcastVariables,
        );
        const broadcastVariables = setVariableMetaSprite(deserializedBroadcastVars, stage.props());
        return new VariableCollection(broadcastVariables);
    }
    /**
     * @return {VariableCollection}
     *
     * In the Scratch VM, lists are a variable type. They can
     *  be local or global to a Sprite
     */
    public lists(): VariableCollection {
        let listVariables: Iterable<VariableProperties>;
        // Handle Local LIST vars
        const deserializedLocalListVars: Iterable<VariableProperties> = makeIterable(
            this.prop(SpriteAttributes.LISTS),
            deserializeListVariables,
        );
        const localListVariableIterable = setVariableMetaSprite(deserializedLocalListVars, this.props());
        listVariables = localListVariableIterable;
        // Add global lists vars to local scope
        if (!this.isStage()) {
            listVariables = chain(
                localListVariableIterable,
                getSpriteMeta(this.props())
                    .project.stage()
                    .lists()
                    .props(),
            );
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
        // Handle Local SCALAR vars
        const deserializedLocalScalarVars = makeIterable(
            this.prop(SpriteAttributes.VARIABLES),
            deserializeVariables,
        );
        const localScalarVariableIterable = setVariableMetaSprite(deserializedLocalScalarVars, this.props());
        scalarVariables = localScalarVariableIterable;
        if (!this.isStage()) {
            // Handle Global SCALAR vars
            scalarVariables = chain(
                localScalarVariableIterable,
                getSpriteMeta(this.props())
                    .project.stage()
                    .variables()
                    .props(),
            );
        }
        return new VariableCollection(scalarVariables);
    }
}
