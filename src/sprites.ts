import { PropertiesWrapper, CollectionWrapper } from './base';
import { SpriteProperties, SpritePosition, BlockProperties, VariableProperties } from './abstracts';
import { BlockCollection, VariableCollection } from './sb-util';
import { makeIterable, chain, filterIterable, flatmapIterable } from './generators';
import {
    deserializeBlocks,
    deserializeVariables,
    deserializeBroadcastVariables,
    deserializeListVariables,
} from './sb3-serialize';
import { setMetaIterable, getBlockMeta, getSpriteMeta, setVariableMetaSprite } from './meta-data';
import {
    validateSpriteSelector,
    isSelectorAttrValue,
    getAttributeAndValueInSelector,
    attrValueContainsQuotes,
} from './selector-parse';

export enum SpriteAttributes {
    BLOCKS = 'blocks',
    BROADCASTS = 'broadcasts',
    LISTS = 'lists',
    VARIABLES = 'variables',
}

export class Sprite extends PropertiesWrapper<SpriteProperties> {
    public isStage(): boolean {
        const { isStage } = this.props();
        return Boolean(isStage);
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
                    .propsIterable(),
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
                    .propsIterable(),
            );
        }

        return new VariableCollection(scalarVariables);
    }
}

export class SpriteCollection extends CollectionWrapper<SpriteProperties, Sprite> {
    protected static PropClass = Sprite;

    public query(selector: string): SpriteCollection {
        validateSpriteSelector(selector);

        // string between brackets
        const selectorBody = selector.slice(1, -1);

        let filterFunction: (s: SpriteProperties) => boolean;
        // the attribute being queried for might be string, number, or bool
        let attrValue: string | number | boolean;

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

        return new SpriteCollection(filterIterable(this.propsIterable(), filterFunction));
    }

    /**
     * Return the blocks for all sprites in collection.
     */
    public blocks(): BlockCollection {
        return new BlockCollection(
            flatmapIterable(this, (sprite): Iterable<BlockProperties> => sprite.blocks().propsIterable()),
        );
    }
}
