<template>
    <v-tooltip v-for="value in data.split('_')" top>
        <template v-slot:activator="{ props }">
            <chip-type-component class="chip-padding" :type :on-click-callback="() => handleClose(value, type)" :use-icon="true" :props>{{ value }}</chip-type-component>
        </template>
        <span>{{ type }}</span>
    </v-tooltip>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { addOrRemoveData } from '../controllers/urlQuery';
import { QueryInfoType } from '../types/queryInfoType';
import _ from 'lodash';
import ChipTypeComponent from './ChipTypeComponent.vue';

const props = defineProps<{ type: QueryInfoType; data: any }>();
const route = useRoute();

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
