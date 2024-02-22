import { EnvironmentType } from './environmentTypes';
import { ProjectReference } from './references';

export interface Environment {
    id: string;
    name: string;
    description: string;
    link: string;
    type: EnvironmentType;
    updates: string[];
    projects: ProjectReference[];
}
