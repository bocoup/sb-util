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
export enum SB3SerializedInputType {
    INPUT_SAME_BLOCK_SHADOW = 1,
    INPUT_BLOCK_NO_SHADOW = 2,
    INPUT_DIFF_BLOCK_SHADOW = 3,
}

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

export type SB3SerializedField = [string?, string?];

export interface SB3SerializedFields {
    [name: string]: SB3SerializedField;
}

export type SB3SerializedInput = [
    SB3SerializedInputType,
    SB3SerializedBlockArray | string,
    (SB3SerializedBlockArray | string)?,
];
export interface SB3SerializedInputs {
    [name: string]: SB3SerializedInput;
}

export interface SB3SharedBlockProperties {
    opcode: string;
    parent: string;
    next: string;
    shadow: boolean;
    topLevel?: boolean;
    x?: number;
    y?: number;
}

export interface SB3SerializedBlockObject extends SB3SharedBlockProperties {
    inputs: SB3SerializedInputs;
    fields: SB3SerializedFields;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SB3SerializedBlockArray = [SB3SerializedBlockType, ...any[]];

export type SB3SerializedBlock = SB3SerializedBlockObject | SB3SerializedBlockArray;

export interface SB3SerializedBlocks {
    [id: string]: SB3SerializedBlock;
}

export interface SB3ScalarVariables {
    [id: string]: SB3ScalarVariableProperties;
}

export type SB3ScalarVariableProperties = [string, (string | number), boolean];

export interface SB3BroadcastVariables {
    [id: string]: string;
}

export type SB3ListVariableProperties = [string, string[]];

export interface SB3ListVariables {
    [id: string]: SB3ListVariableProperties;
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

export interface BlockField {
    name: string;
    value: string | number;
    id?: string;
    variableType?: ScratchVariableTypes;
}

export interface BlockFields {
    [name: string]: BlockField;
}

export interface BlockInput {
    name: string;
    block: string;
    shadow: string;
}

export interface BlockProperties extends SB3SharedBlockProperties {
    id: string;
    inputs: {
        [name: string]: BlockInput;
    };
    fields: BlockFields;
}

export interface BlockQueryProperties {
    attr: string;
    queryValues: {
        opcode: string;
        type: string;
        shape: string;
    };
}

export interface VariableQueryProperties {
    type: string
}

export interface VariableProperties {
    id: string;
    name: string;
    type: string;
    isCloud?: boolean; // this only applies to scalar type varibles
    value: number | string | string[];
}
