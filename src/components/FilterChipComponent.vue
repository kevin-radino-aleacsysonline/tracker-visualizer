<template>
    <v-tooltip v-for="value in data.split('_')" top>
        <template v-slot:activator="{ props }">
            <v-chip class="chip-padding" :prepend-icon="queryTypeIconMap[type]" :color="queryTypeColorMap[type]" v-bind="props" @click="handleClose(value, type)">{{ value }}</v-chip>
        </template>
        <span>{{ value }}</span>
    </v-tooltip>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { addOrRemoveData } from '../controllers/urlQuery';
import { QueryInfoType } from '../types/queryInfoType';
import _ from 'lodash';

const props = defineProps<{ type: QueryInfoType; data: any }>();
const route = useRoute();

const queryTypeIconMap: Record<QueryInfoType, string> = {
    [QueryInfoType.focus]: 'mdi-crosshairs',
    [QueryInfoType.innerFocus]: 'mdi-crosshairs-gps',
    [QueryInfoType.id]: 'mdi-star',
    [QueryInfoType.type]: 'mdi-tag',
};
const queryTypeColorMap: Record<QueryInfoType, string> = {
    [QueryInfoType.focus]: 'teal',
    [QueryInfoType.innerFocus]: 'green',
    [QueryInfoType.id]: 'orange',
    [QueryInfoType.type]: 'primary',
};

function handleClose(data: string, type: QueryInfoType): void {
    const dataArr: string[] = props.data.split('_');
    if (dataArr.includes(data)) {
        _.remove(dataArr, (element) => element === data);
    }
    if (dataArr.length > 0) {
        const dataStr = dataArr.join('_');
        addOrRemoveData(dataStr, route, type);
    } else {
        addOrRemoveData(props.data, route, type);
    }
}
</script>

<style scoped>
.chip-padding {
    margin-left: 5px;
}
</style>
