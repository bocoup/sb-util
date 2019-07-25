import { BlockQueryProperties } from './abstracts';

enum SelectorSyntax {
	OPEN_BRACKET = '[',
	CLOSED_BRACKET = ']',
	EQUALS = '=',
	DOUBLE_QUOTE = '\"',
    SINGLE_QUOTE = '\'',
    TYPE_SELECTOR = '.'
}

export function validateSpriteSelector(selector: string){
    if(selector.length < 2 || selector[0] !== SelectorSyntax.OPEN_BRACKET
        && selector.slice(-1) !== SelectorSyntax.CLOSED_BRACKET){
        throw new Error('Invalid selector syntax for SpriteCollection. \
            [attr] and [attr=value] format is accepted. Selector must not be empty');
    }
}

export function isSelectorAttrValue(selector: string) {
    return selector.includes(SelectorSyntax.EQUALS);
}

export function getAttributeAndValueInSelector(selector: string) {
    return selector.split(SelectorSyntax.EQUALS);
}

export function attrValueContainsQuotes(value: string) {
    return (value[0] === SelectorSyntax.DOUBLE_QUOTE || value[0] === SelectorSyntax.SINGLE_QUOTE)
					&& (value.slice(-1) === SelectorSyntax.DOUBLE_QUOTE || value.slice(-1) === SelectorSyntax.SINGLE_QUOTE);
}

export function parseBlockQuerySelector(selector: string): BlockQueryProperties {
    let value = selector;
    let isType = false;
    

    if (selector.includes(SelectorSyntax.TYPE_SELECTOR)) {
        isType = true
        value = selector.substring(1);
    };

    return {
        attr: 'opcode',
        value,
        isType
    }
}