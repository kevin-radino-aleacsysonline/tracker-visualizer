import { QueryInfoType } from '../types/queryInfoType';

export interface OnQueryChangedArgs {
    type: QueryInfoType;
    data: any;
    remove?: boolean;
}

export interface OnQueryResetArgs {}
export interface OnFiltersClearArgs {}

export interface OnViewUpdateArgs {
    list: string[];
}

export interface OnViewLoadingArgs {}

export interface OnFilterChangedArgs {
    type: QueryInfoType;
    data: string[];
}
