import {
    BlockProperties,
    SerializedBlock,
    SerializedBlocks,
    SerializedBlockObject,
    SerializedBlockArray,
    SB3SerializedBlockType,
    ScratchVariableTypes,
} from './abstracts';

let blockCounter = 0;
const newBlockId = (): string => `sb-util-deserialized-block-${blockCounter++}`;
export function _resetCounterForTests(): void {
    blockCounter = 0;
}

const deserializedCache = new WeakMap<SerializedBlock, BlockProperties>();

export function* deserializeBlocks(blocks: SerializedBlocks): Iterator<BlockProperties> {
    for (const id in blocks) {
        if (deserializedCache.has(blocks[id])) {
            yield deserializedCache.get(blocks[id]);
        }

        let block: BlockProperties;
        const serialized = blocks[id];
        if (Array.isArray(serialized)) {
            block = deserializeBlockArray(serialized);
        } else {
            block = {
                id,
                ...(serialized as SerializedBlockObject),
            };
        }

        deserializedCache.set(blocks[id], block);
        yield block;
    }
}

const NUMBER_PRIMITIVE_MAP = {
    [SB3SerializedBlockType.MATH_NUM_PRIMITIVE]: 'math_number',
    [SB3SerializedBlockType.POSITIVE_NUM_PRIMITIVE]: 'math_positive_number',
    [SB3SerializedBlockType.WHOLE_NUM_PRIMITIVE]: 'math_whole_number',
    [SB3SerializedBlockType.INTEGER_NUM_PRIMITIVE]: 'math_integer',
    [SB3SerializedBlockType.ANGLE_NUM_PRIMITIVE]: 'math_angle',
};

export function deserializeBlockArray(
    data: SerializedBlockArray,
    parentId: string = null,
    shadow: boolean = false,
): BlockProperties {
    const block: BlockProperties = {
        id: newBlockId(),
        opcode: null,
        next: null,
        parent: parentId,
        shadow,
        inputs: {},
        fields: {},
        topLevel: false,
    };

    const [type] = data;
    switch (type) {
        case SB3SerializedBlockType.MATH_NUM_PRIMITIVE:
        case SB3SerializedBlockType.POSITIVE_NUM_PRIMITIVE:
        case SB3SerializedBlockType.WHOLE_NUM_PRIMITIVE:
        case SB3SerializedBlockType.INTEGER_NUM_PRIMITIVE:
        case SB3SerializedBlockType.ANGLE_NUM_PRIMITIVE:
            block.opcode = NUMBER_PRIMITIVE_MAP[type];
            block.fields['NUM'] = {
                name: 'NUM',
                value: data[1],
            };
            break;

        case SB3SerializedBlockType.COLOR_PICKER_PRIMITIVE:
            block.opcode = 'colour_picker';
            block.fields['COLOUR'] = {
                name: 'COLOUR',
                value: data[1],
            };
            break;

        case SB3SerializedBlockType.TEXT_PRIMITIVE:
            block.opcode = 'text';
            block.fields['TEXT'] = {
                name: 'TEXT',
                value: data[1],
            };
            break;

        case SB3SerializedBlockType.BROADCAST_PRIMITIVE:
            block.opcode = 'event_broadcast_menu';
            block.fields['BROADCAST_OPTION'] = {
                name: 'BROADCAST_OPTION',
                value: data[1],
                id: data[2],
                variableType: ScratchVariableTypes.BROADCAST_MESSAGE_TYPE,
            };
            break;

        case SB3SerializedBlockType.VAR_PRIMITIVE:
            block.opcode = 'data_variable';
            block.fields['VARIABLE'] = {
                name: 'VARIABLE',
                value: data[1],
                id: data[2],
                variableType: ScratchVariableTypes.SCALAR_TYPE,
            };
            if (data.length > 3) {
                block.topLevel = true;
                block.x = data[3];
                block.y = data[4];
            }
            break;

        case SB3SerializedBlockType.LIST_PRIMITIVE:
            block.opcode = 'data_listcontents';
            block.fields['LIST'] = {
                name: 'LIST',
                value: data[1],
                id: data[2],
                variableType: ScratchVariableTypes.LIST_TYPE,
            };
            if (data.length > 3) {
                block.topLevel = true;
                block.x = data[3];
                block.y = data[4];
            }
            break;

        default:
            throw new Error(`sb-util: Unknown serialized block type ${type}`);
    }
    return block;
}
