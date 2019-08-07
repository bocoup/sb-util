export interface Queryable {
    query(selector: string);
}

export interface AssetFetcher {
    parse(source: string | number): Promise<JSON>;
}

export interface SB3ProjectJSON {
    targets: SpriteProperties[];
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

export interface BlockProperties {
    id: string;
    opcode: string;
    parent: string;
    next: string;
    inputs: object;
    fields: object;
    shadow: boolean;
    topLevel: boolean;
}

export interface BlockQueryProperties {
    attr: string;
    queryValues: {
        opcode: string;
        type: string;
        shape: string;
    };
}
