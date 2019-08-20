import { PropertiesWrapper, CollectionWrapper } from './base';
import { BlockProperties, BlockQueryProperties } from './abstracts';
import { Sprite } from './sb-util';
import { getBlockMeta } from './meta-data';
import { filterIterable } from './generators';
import { parseBlockQuerySelector } from './selector-parse';
import { BlockOpcodeToShape } from './block-shapes';

export class Block extends PropertiesWrapper<BlockProperties> {
    /**
     * The sprite which owns the block
     */
    public sprite(): Sprite {
        return new Sprite(getBlockMeta(this.props()).sprite);
    }

    /**
     * Block which is the "parent" of this block.
     */
    public parent(): Block {
        const parentId: string = this.prop('parent');
        if (parentId) {
            return this.sprite()
                .blocks()
                .byId(parentId);
        }
        return null;
    }

    /**
     * Return the block in the named input slot.
     * @param name The input name I.E. "VALUE"
     */
    public input(name: string): Block {
        const { inputs } = this.props();
        const blockId = inputs[name] && inputs[name].block;
        if (blockId) {
            return this.sprite()
                .blocks()
                .byId(blockId);
        }
        return null;
    }

    /**
     * Return the shadow of the named input slot.
     * @param name The input name I.E. "VALUE"
     */
    public shadow(name: string): Block {
        const { inputs } = this.props();
        const blockId = inputs[name] && inputs[name].shadow;
        if (blockId) {
            return this.sprite()
                .blocks()
                .byId(blockId);
        }
        return null;
    }
}

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
