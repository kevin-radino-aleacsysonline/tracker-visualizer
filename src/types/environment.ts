import { EnvironmentType } from './environmentTypes';
import { IIdentifiable } from './identifiable';
import { ProjectReference } from './references';

export interface Environment extends IIdentifiable {
    description: string;
    link: string;
    type: EnvironmentType;
    updates: string[];
    projects: ProjectReference[];
}
