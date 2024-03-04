import { IIdentifiable } from './identifiable';
import { ProjectType } from './projectTypes';
import { Reference } from './references';

export interface Project extends IIdentifiable {
    description: string;
    repository: string;
    type: ProjectType;
    commits: string[];
    versions: string[];
    updates: Reference[];
    environments: Reference[];
}
