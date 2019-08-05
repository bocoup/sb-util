import { BlockQueryProperties } from './abstracts';

enum SelectorSyntax {
    OPEN_BRACKET = '[',
    CLOSED_BRACKET = ']',
    EQUALS = '=',
    DOUBLE_QUOTE = '"',
    SINGLE_QUOTE = "'",
    TYPE_SELECTOR = '.',
    SHAPE_SELECTOR = ':',
}

export function validateSpriteSelector(selector: string): void {
    if (
        selector.length < 2 ||
        (selector[0] !== SelectorSyntax.OPEN_BRACKET && selector.slice(-1) !== SelectorSyntax.CLOSED_BRACKET)
    ) {
        throw new Error(
            'Invalid selector syntax for SpriteCollection. \
            [attr] and [attr=value] format is accepted. Selector must not be empty',
        );
    }
}

export function isSelectorAttrValue(selector: string): boolean {
    return selector.includes(SelectorSyntax.EQUALS);
}

export function getAttributeAndValueInSelector(selector: string): string[] {
    return selector.split(SelectorSyntax.EQUALS);
}

export function attrValueContainsQuotes(value: string): boolean {
    return (
        (value[0] === SelectorSyntax.DOUBLE_QUOTE || value[0] === SelectorSyntax.SINGLE_QUOTE) &&
        (value.slice(-1) === SelectorSyntax.DOUBLE_QUOTE || value.slice(-1) === SelectorSyntax.SINGLE_QUOTE)
    );
}

export function parseBlockQuerySelector(selector: string): BlockQueryProperties {
    let queryStrings = selector.split(' ');
    let shape, type, opcode;

    if (!selector.includes(SelectorSyntax.TYPE_SELECTOR) && !selector.includes(SelectorSyntax.SHAPE_SELECTOR))
        opcode = selector;

    if (selector.includes(SelectorSyntax.TYPE_SELECTOR)) {
        type = queryStrings
            .filter((s: string): boolean => s.includes(SelectorSyntax.TYPE_SELECTOR))
            .map((s: string): string => s.substring(1))
            .pop();
    }

    if (selector.includes(SelectorSyntax.SHAPE_SELECTOR)) {
        shape = queryStrings
            .filter((s: string): boolean => s.includes(SelectorSyntax.SHAPE_SELECTOR))
            .map((s: string): string => s.substring(1))
            .pop();
    }

    return {
        attr: 'opcode',
        queryValues: {
            type,
            shape,
            opcode,
        },
    };
}
