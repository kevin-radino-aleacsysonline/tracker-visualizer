<template>
    <v-tooltip v-for="value in data.split('_')" top>
        <template v-slot:activator="{ props }">
            <chip-type-component class="chip-padding" :type :on-click-callback="() => handleClose(value, type)" :use-icon="true" :props>{{ value }}</chip-type-component>
        </template>
        <span>{{ type }}</span>
    </v-tooltip>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useRoute } from 'vue-router';
import { QueryInfoType } from '../types';
import { addOrRemoveData } from '../controllers';
import { ChipTypeComponent } from '../components';

const props = defineProps<{ type: QueryInfoType; data: any }>();
const route = useRoute();

function handleClose(data: string, type: QueryInfoType): void {
    let dataArr: string[] = props.data.split('_');
    if (dataArr.includes(data)) {
        dataArr = _.remove(dataArr, (element) => element === data);
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
