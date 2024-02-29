import { EnvironmentType } from './environmentTypes';
import { IIdentifiable } from './identifiable';
import { Reference } from './references';

export interface Environment extends IIdentifiable {
    description: string;
    link: string;
    type: EnvironmentType;
    updates: Reference[];
    projects: Reference[];
}
