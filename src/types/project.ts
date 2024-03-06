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

export function isProject(obj: any): boolean {
    return 'description' in obj && 'repository' in obj && 'type' in obj && 'commits' in obj && 'versions' in obj && 'updates' in obj && 'environments' in obj;
}
