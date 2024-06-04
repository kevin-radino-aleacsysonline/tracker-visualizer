import { ButtonTypes } from './types/buttonTypes';
import { DataType } from './types/dataTypes';
import { InfoType } from './types/infoTypes';
import { QueryInfoType } from './types/queryInfoType';
import { SelectionTypes } from './types/selectionTypes';

export const ALL = 'all';
export const DEFAULT_LINK = 'https://github.com/Aleacsys-Online';
export const HIDDEN_INFO_ARR = [InfoType.Name, InfoType.Id, InfoType.Link, InfoType.Type, InfoType.Repository, InfoType.Timestamp, InfoType.Environment, InfoType.Project];
export const HIDDEN_ID_IN_TABLE_ARR = [InfoType.Updates, InfoType.Projects, InfoType.Description, InfoType.Environments, InfoType.Updates, InfoType.Versions, InfoType.Commits];

export const COLORS_QUERY: Record<QueryInfoType, Record<SelectionTypes, string>> = {
    [QueryInfoType.id]: {
        [SelectionTypes.neutral]: 'orange',
        [SelectionTypes.positive]: '',
        [SelectionTypes.negative]: '',
    },
    [QueryInfoType.focus]: {
        [SelectionTypes.neutral]: 'teal',
        [SelectionTypes.positive]: '',
        [SelectionTypes.negative]: '',
    },
    [QueryInfoType.type]: {
        [SelectionTypes.neutral]: 'primary',
        [SelectionTypes.positive]: '',
        [SelectionTypes.negative]: '',
    },
    [QueryInfoType.innerFocus]: {
        [SelectionTypes.neutral]: 'green',
        [SelectionTypes.positive]: '',
        [SelectionTypes.negative]: '',
    },
};

export const COLORS_VIEWS: Record<DataType, string> = {
    [DataType.Environments]: 'green',
    [DataType.Projects]: 'primary',
    [DataType.Updates]: 'orange',
};

export const COLORS_BUTTONS: Record<ButtonTypes, string> = {
    [ButtonTypes.Submit]: 'green',
    [ButtonTypes.Cancel]: 'red',
};

export const ICONS_QUERY: Record<QueryInfoType, string> = {
    [QueryInfoType.focus]: 'mdi-crosshairs',
    [QueryInfoType.innerFocus]: 'mdi-crosshairs-gps',
    [QueryInfoType.id]: 'mdi-star',
    [QueryInfoType.type]: 'mdi-tag',
};

export const ICONS_VIEWS: Record<DataType, string> = {
    [DataType.Environments]: 'mdi-sprout',
    [DataType.Projects]: 'mdi-lightbulb-variant',
    [DataType.Updates]: 'mdi-update',
};
