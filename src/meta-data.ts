import { SpriteProperties, BlockProperties, VariableProperties } from './abstracts';
import { ScratchProject } from './ScratchProject';
import { makeIterable, map } from './generators';

export const propsStorage = new WeakMap();

export interface SpriteMeta {
    project: ScratchProject;
}
const spriteMeta = new WeakMap<SpriteProperties, SpriteMeta>();
export const getSpriteMeta = (p: SpriteProperties): SpriteMeta => {
    if (!spriteMeta.has(p)) {
        spriteMeta.set(p, {
            project: null,
        });
    }
    return spriteMeta.get(p);
};

export interface BlockMeta {
    sprite: SpriteProperties;
}
const blockMeta = new WeakMap<BlockProperties, BlockMeta>();
export const getBlockMeta = (p: BlockProperties): BlockMeta => {
    if (!blockMeta.has(p)) {
        blockMeta.set(p, {
            sprite: null,
        });
    }
    return blockMeta.get(p);
};

export interface VariableMeta {
    sprite: SpriteProperties;
}
const variableMeta = new WeakMap<VariableProperties, VariableMeta>();
export const getVariableMeta = (p: VariableProperties): VariableMeta => {
    if (!variableMeta.has(p)) {
        variableMeta.set(p, {
            sprite: null,
        });
    }
    return variableMeta.get(p);
};

export function setMetaIterable<T>(iterable: Iterable<T>, predicate: (item: T) => T): Iterable<T> {
    return makeIterable(iterable, (d): Iterator<T> => map(d, predicate));
}

export const setVariableMetaIterable = (
    iter: Iterable<VariableProperties>,
    meta: VariableMeta,
): Iterator<VariableProperties> =>
    map(
        iter,
        (props): VariableProperties => {
            Object.assign(getVariableMeta(props), meta);
            return props;
        },
    );

/**
 *
 * @param deserialized iterable of VariableProperties
 * @param sprite A Sprite object
 */
export function setVariableMetaSprite(
    deserialized: Iterable<VariableProperties>,
    sprite: SpriteProperties,
): Iterable<VariableProperties> {
    return makeIterable(
        deserialized,
        (d: Iterable<VariableProperties>): Iterator<VariableProperties> =>
            setVariableMetaIterable(d, { sprite }),
    );
}
