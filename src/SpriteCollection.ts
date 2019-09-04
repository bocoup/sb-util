import { CollectionWrapper } from './CollectionWrapper';
import { SpriteProperties, BlockProperties } from './abstracts';
import { BlockCollection } from './BlockCollection';
import { filterIterable, flatmapIterable } from './generators';
import {
    validateSpriteSelector,
    isSelectorAttrValue,
    getAttributeAndValueInSelector,
    attrValueContainsQuotes,
} from './selector-parse';
import { Sprite } from './Sprite';
/**
 * Multiple sprites in a collection.
 */
export class SpriteCollection extends CollectionWrapper<SpriteProperties, Sprite> {
    protected static WrapperClass = Sprite;
    /**
     * Query sprites
     * @param selector Query Selector
     */
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
        return new SpriteCollection(filterIterable(this.props(), filterFunction));
    }
    /**
     * Return the blocks for all sprites in collection.
     */
    public blocks(): BlockCollection {
        return new BlockCollection(
            flatmapIterable(this, (sprite): Iterable<BlockProperties> => sprite.blocks().props()),
        );
    }
}
