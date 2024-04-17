import { RouteLocationNormalizedLoaded } from 'vue-router';
import router from '../setup/router';
import { QueryInfoType } from '../types/queryInfoType';

export function addOrUpdateFocus(focusId: number, route: RouteLocationNormalizedLoaded): void {
    const query = {
        [QueryInfoType.focus]: focusId,
    };

    // const updateQuery = { ...route.query, ...query };
    // router.push({ query: updateQuery });
    updateRouteQuery(query, route);
}

export function addOrUpdateData(data: string, route: RouteLocationNormalizedLoaded, queryType: QueryInfoType): void {
    const query = {
        [queryType]: data,
    };
    updateRouteQuery(query, route);
}

function updateRouteQuery(query: any, route: RouteLocationNormalizedLoaded): void {
    const updateQuery = { ...route.query, ...query };
    router.push({ query: updateQuery });
}
