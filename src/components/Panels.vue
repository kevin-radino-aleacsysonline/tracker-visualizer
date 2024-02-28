<template>
    <v-expansion-panels multiple>
        <v-expansion-panel v-for="(item, index) in props.requestedObjects" :key="index">
            <v-expansion-panel-title>{{ getPanelName(item) }}</v-expansion-panel-title>
            <v-expansion-panel-text>
                <table-component :item="item"></table-component>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TableComponent from '../components/TableComponent.vue';
import { DataType } from '../types/dataTypes';
import { capitalize } from 'lodash';
import { IIdentifiable } from '../types/identifiable';

const props = defineProps({
    requestedObjects: {
        type: Object,
        required: true,
    },
    dataTypeString: {
        type: String,
        required: true,
    },
});

var dataType: DataType;

onMounted(() => {
    dataType = DataType[capitalize(props.dataTypeString) as keyof typeof DataType];
});

function getPanelName(item: IIdentifiable): string {
    if (dataType !== DataType.Updates) {
        return item.name!;
    }
    return 'test';
}
</script>
