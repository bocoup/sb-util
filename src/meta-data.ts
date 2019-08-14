import { SpriteProperties, BlockProperties, VariableProperties } from './abstracts';
import { ScratchProject } from './sb-util';
import { makeIterable, map } from './generators';

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
