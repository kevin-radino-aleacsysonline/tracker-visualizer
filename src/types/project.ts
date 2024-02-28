import { IIdentifiable } from './identifiable';
import { ProjectType } from './projectTypes';
import { EnvironmentReference } from './references';

export interface Project extends IIdentifiable {
    description: string;
    repository: string;
    type: ProjectType;
    updates: string[];
    commits: string[];
    versions: string[];
    environments: EnvironmentReference[];
}
