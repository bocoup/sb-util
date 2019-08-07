export interface Queryable {
    query(selector: string);
}

export interface AssetFetcher {
    parse(source: string | number): Promise<JSON>;
}

export interface SB3ProjectJSON {
    targets: SpriteProperties[];
}

// Serialized Block Interfaces - We should maybe move the serialization typedefs some other file?

export enum SB3SerializedBlockType {
    MATH_NUM_PRIMITIVE = 4,
    POSITIVE_NUM_PRIMITIVE = 5,
    WHOLE_NUM_PRIMITIVE = 6,
    INTEGER_NUM_PRIMITIVE = 7,
    ANGLE_NUM_PRIMITIVE = 8,
    COLOR_PICKER_PRIMITIVE = 9,
    TEXT_PRIMITIVE = 10,
    BROADCAST_PRIMITIVE = 11,
    VAR_PRIMITIVE = 12,
    LIST_PRIMITIVE = 13,
}

export enum ScratchVariableTypes {
    SCALAR_TYPE = '',
    LIST_TYPE = 'list',
    BROADCAST_MESSAGE_TYPE = 'broadcast_msg',
}

export interface SerializedBlockObject {
    opcode: string;
    parent: string;
    next: string;
    inputs: object;
    fields: object;
    shadow: boolean;
    topLevel?: boolean;
    x?: number;
    y?: number;
}

export type SerializedBlockArray = [SB3SerializedBlockType, ...any[]];

export type SerializedBlock = SerializedBlockObject | SerializedBlockArray;

export interface SerializedBlocks {
    [id: string]: SerializedBlock;
}

export interface SpriteProperties {
    isStage: boolean;
    name: string;
    variables: object;
    lists: object;
    blocks: object;
    comments: object;
    currentCostume: number;
    costumes: Record<string, string>[];
    sounds: Record<string, string>[];
    volume: number;
    layerOrder: number;
    tempo?: number;
    videoTransparency?: number;
    videoState?: string;
    textToSpeechLanguage?: string;
    visible?: boolean;
    x?: number;
    y?: number;
    size?: number;
    direction?: number;
    draggable?: boolean;
    rotationStyle?: string;
}

export interface SpritePosition {
    x: number;
    y: number;
}

export interface BlockFields {
    [name: string]: {
        name: string;
        value: any;
    };
}

export interface BlockProperties extends SerializedBlockObject {
    id: string;
    fields: BlockFields | object;
}

export interface BlockQueryProperties {
    attr: string;
    queryValues: {
        opcode: string;
        type: string;
        shape: string;
    };
}
