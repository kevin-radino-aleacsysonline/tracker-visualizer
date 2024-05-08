<template>
    <v-expansion-panels v-if="dataType !== DataType.Updates" v-model="panels">
        <panel-environment-project-component :objects="castToEnvironmentOrProject()"></panel-environment-project-component>
    </v-expansion-panels>

    <v-expansion-panels v-else v-model="panels">
        <panel-update-component :objects="castToUpdate()"></panel-update-component>
    </v-expansion-panels>
</template>

<script setup lang="ts">
import { Environment } from '../types/environment';
import { Project } from '../types/project';
import { Update } from '../types/update';
import { DataType } from '../types/dataTypes';

import { Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PanelEnvironmentProjectComponent from '../components/PanelEnvironmentProjectComponent.vue';
import PanelUpdateComponent from './PanelUpdateComponent.vue';
import { IIdentifiable } from '../types/identifiable';

const props = defineProps<{ requestedObjects: IIdentifiable[]; dataType: DataType }>();
const route = useRoute();
var panels: Ref<number[]> = ref([]);

function castToEnvironmentOrProject(): Project[] | Environment[] {
    return props.dataType === DataType.Projects ? (props.requestedObjects as Project[]) : (props.requestedObjects as Environment[]);
}

function castToUpdate(): Update[] {
    return props.requestedObjects as Update[];
}

watch(
    route,
    (r) => {
        if (r.query === undefined || r.query.focus === undefined) {
            panels.value = [];
            return;
        }
        panels.value = r.query.focus ? [Number(r.query.focus)] : [];
    },
    { immediate: true }
);
</script>

<style scoped>
.copy-element {
    color: #888;
    font-size: 0.75em;
    font-style: italic;
    padding-left: 4px;
}

.v-expansion-panel-title {
    font-size: 1.1em;
}

.bigger-panel .v-expansion-panel .v-expansion-panel-text {
    font-size: 16px;
}
.no-padding {
    padding: 0;
}
.no-margin {
    margin: 0;
}
.v-timeline--vertical.v-timeline--justify-auto {
    grid-template-columns: 15% min-content auto;
}
</style>
