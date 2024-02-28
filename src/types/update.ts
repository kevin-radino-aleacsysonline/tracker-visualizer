import { IIdentifiable } from './identifiable';
import { UpdateGit } from './updateGit';
import { UpdateOutput } from './updateOutput';
import { UpdateType } from './updateTypes';

export interface Update extends IIdentifiable {
    environment: string;
    project: string;
    type: UpdateType;
    output: UpdateOutput;
    version: string;
    timestamp?: string;
    link?: string;
    git: UpdateGit;
}
