import { Block } from './Block';
import { BlockOpcodeToShape } from './block-shapes';
import { BlockProperties, BlockQueryProperties } from './abstracts';
import { CollectionWrapper } from './CollectionWrapper';
import { filterIterable } from './generators';
import { parseBlockQuerySelector } from './selector-parse';

/**
 * A collection of Block objects, has helper methods to filter and do operations appropriate to blocks.
 */
export class BlockCollection extends CollectionWrapper<BlockProperties, Block> {
    protected static WrapperClass = Block;
    /**
     * Return the Block matching the provided id.
     * @param id block ID
     */
    public byId(id: string): Block {
        // todo: eventually this should be able to be written as return this.query(`[id="${id}"]`).first()
        for (const block of this) {
            if (block.prop('id') === id) {
                return block;
            }
        }
        return null;
    }
    /**
     * Filter the collection to only top level (first block in a stack) blocks.
     */
    public top(): BlockCollection {
        return new BlockCollection(filterIterable(this.props(), ({ topLevel }): boolean => topLevel));
    }
    /**
     * Query the colelction for matching blocks
     * @param selector block selector
     */
    public query(selector: string): BlockCollection {
        const {
            attr,
            queryValues: { type, shape, opcode },
        }: BlockQueryProperties = parseBlockQuerySelector(selector);
        const allBlocks = this.props();
        let filterFunction = (b: BlockProperties): boolean => b[attr] === opcode;
        // Check that the query is asking for block type
        if (type) filterFunction = (b: BlockProperties): boolean => b[attr].includes(type);
        if (shape) {
            if (type) {
                filterFunction = (b: BlockProperties): boolean =>
                    b[attr].includes(type) && BlockOpcodeToShape[b.opcode] === shape;
            } else {
                filterFunction = (b: BlockProperties): boolean => BlockOpcodeToShape[b.opcode] === shape;
            }
        }
        const blocks: Iterable<BlockProperties> = filterIterable(allBlocks, filterFunction);
        return new BlockCollection(blocks);
    }
}
