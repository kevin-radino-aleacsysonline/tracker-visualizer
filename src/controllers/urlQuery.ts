import { RouteLocationNormalizedLoaded } from 'vue-router';
import router from '../setup/router';
import { QueryInfoType } from '../types/queryInfoType';

export function addOrRemoveData(data: any, route: RouteLocationNormalizedLoaded, queryType: QueryInfoType): void {
    let castedData = undefined;
    if (typeof data === 'number') {
        castedData = Number(route.query[queryType]);
    }
    if (typeof data === typeof 'string') {
        castedData = `${route.query[queryType]}`;
    }
    if (data === castedData) {
        removeData(route, queryType);
    } else {
        addOrUpdateData(data, route, queryType);
    }
}

function removeData(route: RouteLocationNormalizedLoaded, queryType: QueryInfoType): void {
    const currentQuery = { ...route.query };
    delete currentQuery[queryType];
    router.push({ query: currentQuery });
}

function addOrUpdateData(data: any, route: RouteLocationNormalizedLoaded, queryType: QueryInfoType): void {
    const query = {
        [queryType]: data,
    };
    updateRouteQuery(query, route);
}

function updateRouteQuery(query: any, route: RouteLocationNormalizedLoaded): void {
    const updateQuery = { ...route.query, ...query };
    router.push({ query: updateQuery });
}
