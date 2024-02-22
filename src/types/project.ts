import { ProjectType } from './projectTypes';
import { EnvironmentReference } from './references';

export interface Project {
    id: string;
    name: string;
    description: string;
    repository: string;
    type: ProjectType;
    updates: string[];
    commits: string[];
    versions: string[];
    environments: EnvironmentReference[];
}
