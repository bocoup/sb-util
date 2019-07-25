export interface Queryable {
	query(selector: string);
}

export interface AssetFetcher {
	parse(source: any);
}

export interface SpriteProperties {
	isStage: boolean,
	name: string,
	variables: object,
	lists: object,
	blocks: object,
	comments: object,
	currentCostume: number,
	costumes: Array<Object>,
	sounds: Array<Object>,
	volume: number,
	layerOrder: number,
	tempo?: number,
	videoTransparency?: number,
	videoState?: string,
	textToSpeechLanguage?: any,
	visible?: boolean,
	x?: number,
	y?: number,
	size?: number,
	direction?: number,
	draggable?: boolean,
	rotationStyle?: string
}

export interface SpritePosition {
	x: number,
	y: number
}

export interface BlockProperties {
	id: string,
	opcode: string,
	parent: string,
	next: string,
	inputs: object,
	fields: object,
	shadow: boolean,
	topLevel: boolean
}
