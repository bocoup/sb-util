import { BlockProperties } from './abstracts';
import { getBlockMeta } from './meta-data';
import { PropertiesWrapper } from './PropertiesWrapper';
import { Sprite } from './Sprite';

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
