import { UpdateGit } from './updateGit';
import { UpdateOutput } from './updateOutput';
import { UpdateType } from './updateTypes';

export interface Update {
    id: string;
    environment: string;
    project: string;
    type: UpdateType;
    output: UpdateOutput;
    version: string;
    timestamp?: string;
    link?: string;
    git: UpdateGit;
}
