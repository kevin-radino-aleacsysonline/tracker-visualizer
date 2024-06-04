import { QueryInfoType } from '../types/queryInfoType';

export interface OnQueryResetArgs {}
export interface OnFiltersClearArgs {}
export interface OnViewLoadingArgs {}
export interface OnQueryChangedArgs {
    type: QueryInfoType;
    data: any;
    remove?: boolean;
}
export interface OnViewUpdateArgs {
    list: string[];
}
export interface OnFilterChangedArgs {
    type: QueryInfoType;
    data: string[];
}
