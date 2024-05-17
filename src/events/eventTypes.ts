import { QueryInfoType } from '../types/queryInfoType';

export interface OnQueryChangedArgs {
    type: QueryInfoType;
    data: any;
    remove?: boolean;
}

export interface OnQueryResetArgs {}

export interface OnViewUpdateArgs {
    list: string[];
}

export interface OnViewLoadingArgs {}
