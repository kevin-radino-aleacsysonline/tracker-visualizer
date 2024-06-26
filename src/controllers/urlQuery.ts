import router from '../setup/router';

import { RouteLocationNormalizedLoaded } from 'vue-router';
import { QueryInfoType } from '../types/queryInfoType';
import { DataType } from '../types/dataTypes';
import _ from 'lodash';

export function setMultipleQueries(dataArr: { data: any; queryType: QueryInfoType }[]): void {
    let query = {};
    dataArr.forEach((element) => {
        query = {
            ...query,
            [element.queryType]: element.data,
        };
    });
    overwriteAllQueries(query);
}

export function addOrRemoveData(data: any, route: RouteLocationNormalizedLoaded, queryType: QueryInfoType): void {
    const castedData = `${data}`;
    let currentData = route.query[queryType]?.toString().split('_');
    // if no data present => new filter
    if (!currentData) {
        // completely new query filter
        setQueryFilter(data, route, queryType);
    } else {
        if (!currentData.includes(castedData)) {
            // concat to existing query filter
            currentData.push(castedData);
        } else {
            // remove from existing data
            currentData = _.without(currentData, castedData);
        }
        const newArr = _.join(currentData, '_');
        if (newArr.length === 0) {
            removeQueryFilter(route, queryType);
        } else {
            setQueryFilter(newArr, route, queryType);
        }
    }
}

export function setOrRemoveData(data: any, route: RouteLocationNormalizedLoaded, queryType: QueryInfoType): void {
    const castedData = `${data}`;
    const currentData = route.query[queryType]?.toString();
    if (!currentData) {
        setQueryFilter(data, route, queryType);
    } else {
        if (castedData === currentData) {
            removeQueryFilter(route, queryType);
        } else {
            setQueryFilter(data, route, queryType);
        }
    }
}

function setQueryFilter(data: any, route: RouteLocationNormalizedLoaded, queryType: QueryInfoType): void {
    const newQuery = {
        ...route.query,
        [queryType]: data,
    };
    router.push({ query: newQuery });
}

function overwriteAllQueries(query: any): void {
    router.push({ query });
    for (const key in query) {
        const type: QueryInfoType = key as QueryInfoType;
        if (type === undefined) {
            console.error('unknown type conversion', key);
        }
    }
}

function removeQueryFilter(route: RouteLocationNormalizedLoaded, queryType: QueryInfoType): void {
    const query = { ...route.query };
    delete query[queryType];
    router.push({ query: query });
}

export function refreshRouteWithQuery(routeTo: string, data: any, queryInfoType: QueryInfoType): void {
    const query = {
        [queryInfoType]: data,
    };
    router.push({ path: '/' + routeTo, query: query });
}

export function clearRouteQuery(): void {
    router.push({ query: {} });
}

export function getDataTypeRoute(route: RouteLocationNormalizedLoaded): DataType {
    var dataType: DataType = DataType[route.name as keyof typeof DataType];
    return dataType;
}
