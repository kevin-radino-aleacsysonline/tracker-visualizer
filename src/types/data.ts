import { Environment } from './environment';
import { Project } from './project';
import { Update } from './update';

export interface Data {
    environments: Environment[];
    projects: Project[];
    updates: Update[];
}
