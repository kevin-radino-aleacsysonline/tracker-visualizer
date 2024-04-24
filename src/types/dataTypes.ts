import { capitalize } from 'lodash';
import { RouteLocationNormalizedLoaded } from 'vue-router';

export enum DataType {
    Environments = 'environments',
    Projects = 'projects',
    Updates = 'updates',
}

export function getDataTypeByRouteName(route: RouteLocationNormalizedLoaded): DataType {
    const type = DataType[capitalize(route.name?.toString()) as keyof typeof DataType];
    if (type === DataType.Environments) {
        return DataType.Environments;
    } else if (type === DataType.Projects) {
        return DataType.Projects;
    } else {
        return DataType.Updates;
    }
}
