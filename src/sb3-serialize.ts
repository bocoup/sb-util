import {
    BlockProperties,
    SB3SerializedBlock,
    SB3SerializedBlocks,
    SB3SerializedBlockObject,
    SB3SerializedBlockArray,
    SB3SerializedBlockType,
    ScratchVariableTypes,
    SB3SerializedFields,
    BlockFields,
    SB3SerializedInputs,
    BlockInput,
    SB3SerializedInputType,
    VariableProperties,
    SB3ScalarVariables,
    SB3BroadcastVariables,
    SB3ListVariables,
} from './abstracts';
import { flatmap, map } from './generators';

let blockCounter = 0;
// todo: slightly more scratch formula ids maybe?
const newBlockId = (): string => `sb-util-deserialized-block-${blockCounter++}`;
export function _resetCounterForTests(): void {
    blockCounter = 0;
}

const deserializedCache = new WeakMap<SB3SerializedBlock, BlockProperties[]>();

export function deserializeBlocks(blocks: SB3SerializedBlocks): Iterator<BlockProperties> {
    return flatmap(
        Object.entries(blocks),
        ([id, serialized]): Iterable<BlockProperties> => {
            if (!deserializedCache.has(serialized)) {
                let result: BlockProperties[];
                if (Array.isArray(serialized)) {
                    result = [deserializeBlockArray(serialized, id)];
                } else {
                    result = deserializeBlockObject(serialized, id);
                }

                deserializedCache.set(blocks[id], result);
            }

            return deserializedCache.get(serialized);
        },
    );
}

const NUMBER_PRIMITIVE_MAP = {
    [SB3SerializedBlockType.MATH_NUM_PRIMITIVE]: 'math_number',
    [SB3SerializedBlockType.POSITIVE_NUM_PRIMITIVE]: 'math_positive_number',
    [SB3SerializedBlockType.WHOLE_NUM_PRIMITIVE]: 'math_whole_number',
    [SB3SerializedBlockType.INTEGER_NUM_PRIMITIVE]: 'math_integer',
    [SB3SerializedBlockType.ANGLE_NUM_PRIMITIVE]: 'math_angle',
};

function deserializeBlockArray(
    data: SB3SerializedBlockArray,
    id: string = newBlockId(),
    parentId: string = null,
    shadow: boolean = false,
): BlockProperties {
    const block: BlockProperties = {
        id,
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

function deserializeFields(serialized: SB3SerializedFields): BlockFields {
    const fields: BlockFields = {};
    for (const [name, data] of Object.entries(serialized)) {
        if (Array.isArray(data)) {
            fields[name] = {
                name,
                value: data[0],
                id: data[1],
            };

            if (name === 'BROADCAST_OPTION') {
                fields[name].variableType = ScratchVariableTypes.BROADCAST_MESSAGE_TYPE;
            } else if (name === 'VARIABLE') {
                fields[name].variableType = ScratchVariableTypes.SCALAR_TYPE;
            } else if (name === 'LIST') {
                fields[name].variableType = ScratchVariableTypes.LIST_TYPE;
            }
        } else {
            fields[name] = data;
        }
    }
    return fields;
}

function deserializeInputs(
    serialized: SB3SerializedInputs,
    parentId: string,
): { inputs: BlockProperties['inputs']; newBlocks: BlockProperties[] } {
    const inputs: BlockProperties['inputs'] = {};
    const newBlocks: BlockProperties[] = [];

    function parse(data: SB3SerializedBlockArray | string, shadow: boolean = false): string {
        if (Array.isArray(data)) {
            const parsed = deserializeBlockArray(data, newBlockId(), parentId, shadow);
            newBlocks.push(parsed);
            return parsed.id;
        }
        return data;
    }

    for (const [name, data] of Object.entries(serialized)) {
        if (Array.isArray(data)) {
            const [type, blockData, shadowData] = data;
            let block = null;
            let shadow = null;
            if (type === SB3SerializedInputType.INPUT_SAME_BLOCK_SHADOW) {
                block = parse(blockData, true);
                shadow = block;
            } else if (type === SB3SerializedInputType.INPUT_BLOCK_NO_SHADOW) {
                block = parse(blockData);
            } else if (type === SB3SerializedInputType.INPUT_DIFF_BLOCK_SHADOW) {
                block = parse(blockData);
                shadow = parse(shadowData, true);
            }
            inputs[name] = { name, block, shadow };
        } else {
            inputs[name] = data as BlockInput;
        }
    }

    return { inputs, newBlocks };
}

function deserializeBlockObject(serialized: SB3SerializedBlockObject, id: string): BlockProperties[] {
    const { fields, inputs: serializedInputs, ...rest } = serialized;

    const { inputs, newBlocks } = deserializeInputs(serializedInputs, id);

    const block: BlockProperties = {
        id,
        fields: deserializeFields(fields),
        inputs,
        ...rest,
    };
    return [block, ...newBlocks];
}

export function deserializeVariables(serialized: SB3ScalarVariables): Iterator<VariableProperties> {
    return map(
        Object.entries(serialized),
        ([id, [name, value, isCloud]]): VariableProperties => ({
            id,
            name,
            value,
            isCloud: Boolean(isCloud), //when  isCloud is undefined
            type: ScratchVariableTypes.SCALAR_TYPE, // this means scalar type in https://github.com/LLK/scratch-vm/blob/33ef283787d4ea9a90c3d0d069a6b97dee24f51b/src/engine/variable.js#L49
        }),
    );
}

export function deserializeBroadcastVariables(
    serialized: SB3BroadcastVariables,
): Iterator<VariableProperties> {
    return map(
        Object.entries(serialized),
        // name and value are the same for broadcasts. documented here: https://github.com/LLK/scratch-vm/blob/5adf5ba8fcbd9099a7258c810fd9099ceb39aadf/src/serialization/sb3.js#L398
        ([id, value]): VariableProperties => ({
            id,
            name: value,
            value,
            type: ScratchVariableTypes.BROADCAST_MESSAGE_TYPE,
        }),
    );
}

export function deserializeListVariables(serialized: SB3ListVariables): Iterator<VariableProperties> {
    return map(
        Object.entries(serialized),
        ([id, [name, value]]): VariableProperties => ({
            id,
            name,
            value,
            type: ScratchVariableTypes.LIST_TYPE,
        }),
    );
}
