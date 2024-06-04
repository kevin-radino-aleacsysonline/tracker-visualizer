import { RouteLocationNormalizedLoaded } from 'vue-router';

export enum DataType {
    Environments = 'Environments',
    Projects = 'Projects',
    Updates = 'Updates',
}

export function getDataTypeByRouteName(route: RouteLocationNormalizedLoaded): DataType {
    const type = DataType[route.name?.toString() as keyof typeof DataType];
    if (type === DataType.Environments) {
        return DataType.Environments;
    } else if (type === DataType.Projects) {
        return DataType.Projects;
    } else {
        return DataType.Updates;
    }
}
