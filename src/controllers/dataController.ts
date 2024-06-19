import { Environment } from '../types/environment';
import { Project } from '../types/project';
import { Update } from '../types/update';
import { wait } from '../utils';
import { IIdentifiable } from '../types/identifiable';
import { DataType } from '../types/dataTypes';
import { QueryInfoType } from '../types/queryInfoType';
import _ from 'lodash';
import axios from 'axios';

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

function mapData<T extends Project | Environment | Update>(dataToMap: object[]): Map<string, T> {
    const mappedData: Map<string, T> = new Map<string, T>();
    for (let i = 0; i < dataToMap.length; i++) {
        const element = dataToMap[i] as T;
        formatType(element);
        if (!mappedData.has(element.id)) {
            mappedData.set(element.id, element);
        }
        removeUnusedProperties(element);
    }
    return mappedData;
}

function removeUnusedProperties(obj: object) {
    if ('_id' in obj) {
        delete obj._id;
    }

    if ('__v' in obj) {
        delete obj.__v;
    }
}

function formatType(obj: object) {
    if ('type' in obj) {
        obj.type = (obj.type as any)[0];
    }
}

async function getDataFromAPI<T extends Project | Environment | Update>(path: string): Promise<Map<string, T>> {
    await wait(1000);
    const API_URL = 'http://localhost:3000/api';
    let data = new Map<string, T>();
    try {
        const response = await axios.get(`${API_URL}/${path}`);
        data = mapData<T>(response.data);
    } catch (err) {
        console.error(err);
    }
    return data;
}

export function getFetchFunction(dataType: DataType): Promise<Map<string, IIdentifiable>> {
    if (dataType === DataType.Environments) {
        return getDataFromAPI<Environment>('environments');
    } else if (dataType === DataType.Projects) {
        return getDataFromAPI<Project>('projects');
    } else {
        return getDataFromAPI<Update>('updates');
    }
}

export async function fetchAllData(): Promise<Map<string, IIdentifiable>> {
    await wait(2000);
    const environments = await getDataFromAPI<Environment>('environments');
    const projects = await getDataFromAPI<Project>('projects');
    const updates = await getDataFromAPI<Update>('updates');
    const combined = [...environments.values(), ...projects.values(), ...updates.values()].map((item) => [item.id, item] as const);
    return new Map<string, IIdentifiable>(combined);
}
