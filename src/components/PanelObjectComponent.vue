<template>
    <v-expansion-panel>
        <panel-title-component :on-click="() => onTitleClick(index)" :item="item" :title="getTitle()"> </panel-title-component>
        <v-expansion-panel-text><table-component :item="item"></table-component></v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script setup lang="ts">
import { Update } from '../types/update';
import { Environment } from '../types/environment';
import { Project } from '../types/project';
import { QueryInfoType } from '../types/queryInfoType';

import { useRoute } from 'vue-router';
import { addOrRemoveData } from '../controllers/urlQuery';

import TableComponent from '../components/TableComponent.vue';
import PanelTitleComponent from './PanelTitleComponent.vue';
import { DataType } from '../types/dataTypes';

const props = defineProps<{ item: Update | Project | Environment; index: number; dataType: DataType }>();
const route = useRoute();

function onTitleClick(index: number): void {
    addOrRemoveData(index, route, QueryInfoType.focus);
}

function getTitle(): string {
    switch (props.dataType) {
        case DataType.Environments:
            return (props.item as Environment).name ?? 'UnNamed Environment';
        case DataType.Projects:
            return (props.item as Project).name ?? 'UnNamed Project';
        case DataType.Updates:
            const update = props.item as Update;
            return '[' + update.environment + '] ' + update.project;
    }
}
</script>
