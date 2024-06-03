export enum SelectionTypes {
    neutral = 'neutral',
    positive = 'positive',
    negative = 'negative',
}

export const nextSelection = {
    [SelectionTypes.neutral]: SelectionTypes.positive,
    [SelectionTypes.positive]: SelectionTypes.negative,
    [SelectionTypes.negative]: SelectionTypes.neutral,
};
