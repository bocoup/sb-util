import { BlockProperties, SerializedBlock, SerializedBlocks, SerializedBlockObject } from './abstracts';

const deserializedCache = new WeakMap<SerializedBlock, BlockProperties>();

export function* deserializeBlocks(blocks: SerializedBlocks): Iterator<BlockProperties> {
    for (const id in blocks) {
        if (deserializedCache.has(blocks[id])) {
            yield deserializedCache.get(blocks[id]);
        }

        let block: BlockProperties;
        const seralized = blocks[id];
        if (Array.isArray(seralized)) {
            // not yet implemented...
        } else {
            block = {
                id,
                ...(blocks[id] as SerializedBlockObject),
            };
        }

        deserializedCache.set(blocks[id], block);
        yield block;
    }
}
