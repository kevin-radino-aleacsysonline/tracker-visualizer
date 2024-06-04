import { Environment } from '../types/environment';
import { Project } from '../types/project';
import { Update } from '../types/update';
import { wait } from '../utils';
import { IIdentifiable } from '../types/identifiable';
import { DataType } from '../types/dataTypes';
import { QueryInfoType } from '../types/queryInfoType';
import * as updateData from '../data/updates.json';
import * as projectData from '../data/projects.json';
import * as environmentData from '../data/environments.json';
import _ from 'lodash';

async function fetchData<T extends IIdentifiable>(dataType: DataType): Promise<Map<string, T>> {
    const jsonData = getDataByType(dataType) as object[];
    const dataArray: Map<string, T> = new Map<string, T>();

    for (let i = 0; i < jsonData.length; i++) {
        const element = jsonData[i] as T;
        if (!dataArray.has(element.id)) {
            dataArray.set(element.id, element);
        }
    }
    return dataArray;
}

export function filterData(toFilter: IIdentifiable[], queryTypes: QueryInfoType[], filterValues: string[]): IIdentifiable[] {
    if (queryTypes.length !== filterValues.length) {
        console.error('did not pass correct amount of filters, please verify');
        return toFilter;
    }

    if (queryTypes.length === 0) {
        return toFilter;
    }

    let result: IIdentifiable[] = [];
    queryTypes.forEach((queryType, index) => {
        result = _.union(filter(toFilter, queryType, filterValues[index]), result);
    });

    return result;
}

function filter(toFilter: IIdentifiable[], queryType: QueryInfoType, filter: string): IIdentifiable[] {
    var filteredData: IIdentifiable[] = [];
    toFilter.forEach((value) => {
        if (queryType in value) {
            const objValue = (value as any)[queryType];
            if (filter.includes(objValue)) {
                filteredData.push(value);
            }
        }
    });
    return filteredData;
}

function getDataByType(dataType: DataType): object[] {
    switch (dataType) {
        case DataType.Environments:
            return environmentData.environments;
        case DataType.Projects:
            return projectData.projects;
        case DataType.Updates:
            return updateData.updates;
    }
}

async function getEnvironments(): Promise<Map<string, Environment>> {
    await wait(2000);
    return fetchData<Environment>(DataType.Environments);
}

async function getProjects(): Promise<Map<string, Project>> {
    await wait(2000);
    return fetchData<Project>(DataType.Projects);
}

async function getUpdates(): Promise<Map<string, Update>> {
    await wait(2000);
    return fetchData<Update>(DataType.Updates);
}

export function getFetchFunction(dataType: DataType): Promise<Map<string, IIdentifiable>> {
    if (dataType === DataType.Environments) {
        return getEnvironments();
    } else if (dataType === DataType.Projects) {
        return getProjects();
    } else {
        return getUpdates();
    }
}

export async function fetchAllData(): Promise<Map<string, IIdentifiable>> {
    await wait(2000);
    const environments = await fetchData<Environment>(DataType.Environments);
    const projects = await fetchData<Project>(DataType.Projects);
    const updates = await fetchData<Update>(DataType.Updates);
    const combined = [...environments.values(), ...projects.values(), ...updates.values()].map((item) => [item.id, item] as const);
    return new Map<string, IIdentifiable>(combined);
}
