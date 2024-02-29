import { IIdentifiable } from './identifiable';
import { ProjectType } from './projectTypes';
import { Reference } from './references';

export interface Project extends IIdentifiable {
    description: string;
    repository: string;
    type: ProjectType;
    updates: Reference[];
    commits: string[];
    versions: string[];
    environments: Reference[];
}
