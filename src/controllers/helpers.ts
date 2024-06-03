import { DataType } from '../types/dataTypes';
import { EnvironmentType } from '../types/environmentTypes';
import { ProjectType } from '../types/projectTypes';
import { UpdateType } from '../types/updateTypes';

export function getTypesByDataType(dataType: DataType): string[] {
    switch (dataType) {
        case DataType.Environments: {
            return Object.values(EnvironmentType);
        }
        case DataType.Projects: {
            return Object.values(ProjectType);
        }
        case DataType.Updates: {
            return Object.values(UpdateType);
        }
    }
}
