import { Sb3Fetcher, ProjectJsonFetcher, ProjectByCloudIdFetcher } from './asset-fetcher';

export { BlockShapes } from './block-shapes';

import { ScratchProject } from './ScratchProject';
export { ScratchProject };

export { Block } from './Block';
export { BlockCollection } from './BlockCollection';
export { Sprite } from './Sprite';
export { SpriteCollection } from './SpriteCollection';
export { Variable } from './Variable';
export { VariableCollection } from './VariableCollection';

export const loadSb3 = async function(source: string): Promise<ScratchProject> {
    const projectJSON = await new Sb3Fetcher().parse(source);
    return new ScratchProject(projectJSON);
};

export const loadProjectJson = async function(source: string): Promise<ScratchProject> {
    const projectJSON = await new ProjectJsonFetcher().parse(source);
    return new ScratchProject(projectJSON);
};

export const loadCloudId = async function(cloudId: number): Promise<ScratchProject> {
    const projectJSON = await new ProjectByCloudIdFetcher().parse(cloudId);
    return new ScratchProject(projectJSON);
};
