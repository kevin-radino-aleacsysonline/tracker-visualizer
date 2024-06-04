<template>
    <v-expansion-panels v-if="dataType !== DataType.Updates" v-model="panels">
        <panel-environment-project-component :objects="castToEnvironmentOrProject()"></panel-environment-project-component>
    </v-expansion-panels>

    <v-expansion-panels v-else v-model="panels">
        <panel-update-component :objects="castToUpdate()"></panel-update-component>
    </v-expansion-panels>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { DataType, Environment, Project, Update, IIdentifiable } from '../types';
import { PanelEnvironmentProjectComponent, PanelUpdateComponent } from '../components';

const props = defineProps<{ requestedObjects: IIdentifiable[]; dataType: DataType }>();
const route = useRoute();
var panels: Ref<number[]> = ref([]);

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

function castToEnvironmentOrProject(): Project[] | Environment[] {
    return props.dataType === DataType.Projects ? (props.requestedObjects as Project[]) : (props.requestedObjects as Environment[]);
}

function castToUpdate(): Update[] {
    return props.requestedObjects as Update[];
}
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
