import router from '../setup/router';

import { RouteLocationNormalizedLoaded } from 'vue-router';
import { QueryInfoType } from '../types/queryInfoType';
import { eventBus } from '../events/eventBus';
import { DataType } from '../types/dataTypes';

export function addOrRemoveData(data: any, route: RouteLocationNormalizedLoaded, queryType: QueryInfoType): void {
    let castedData = undefined;
    if (typeof data === 'number') {
        castedData = Number(route.query[queryType]);
    }
    if (typeof data === typeof 'string') {
        castedData = `${route.query[queryType]}`;
    }
    if (data === castedData) {
        removeData(route, data, queryType);
    } else {
        addOrUpdateData(data, route, queryType);
    }
}

export function addToInnerFocus(data: string, route: RouteLocationNormalizedLoaded): void {
    let currentQuery = route.query[QueryInfoType.innerFocus];
    if (currentQuery === undefined || currentQuery === null) {
        addOrUpdateData(data, route, QueryInfoType.innerFocus);
    } else if (typeof currentQuery === 'string') {
        if (currentQuery.includes(data)) {
            const pattern = new RegExp('_?' + data);
            currentQuery = currentQuery.replace(pattern, '');
            if (currentQuery.length > 1 && currentQuery[0] === '_') {
                currentQuery = currentQuery.slice(1);
            }
            if (currentQuery.length === 0) {
                removeData(route, data, QueryInfoType.innerFocus);
            } else {
                addOrUpdateData(currentQuery, route, QueryInfoType.innerFocus);
            }
        } else {
            currentQuery = currentQuery + `_${data}`;
            addOrUpdateData(currentQuery, route, QueryInfoType.innerFocus);
        }
    }
}

export function routeAndAddQuery(routeTo: string, data: any, queryInfoType: QueryInfoType): void {
    const query = {
        [queryInfoType]: data,
    };
    router.push({ path: '/' + routeTo, query: query });
}

function removeData(route: RouteLocationNormalizedLoaded, data: any, queryType: QueryInfoType): void {
    const currentQuery = { ...route.query };
    delete currentQuery[queryType];
    eventBus.emit('onQueryChange', { type: queryType, data, remove: true });
    router.push({ query: currentQuery });
}

function addOrUpdateData(data: any, route: RouteLocationNormalizedLoaded, queryType: QueryInfoType): void {
    const query = {
        [queryType]: data,
    };
    eventBus.emit('onQueryChange', { type: queryType, data });
    updateRouteQuery(query, route);
}

function updateRouteQuery(query: any, route: RouteLocationNormalizedLoaded): void {
    const updateQuery = { ...route.query, ...query };
    router.push({ query: updateQuery });
}

export function clearRouteQuery(): void {
    router.push({ query: {} });
}

export function getDataTypeRoute(route: RouteLocationNormalizedLoaded): DataType {
    var dataType: DataType = DataType[route.name as keyof typeof DataType];
    return dataType;
}
