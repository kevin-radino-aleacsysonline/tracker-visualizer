<template>
    <v-expansion-panels v-if="dataTypeString !== DataType.Updates" v-model="panels">
        <v-expansion-panel v-for="(item, index) in props.requestedObjects" :key="index">
            <v-expansion-panel-title @click.stop="addOrRemoveData(index, route, QueryInfoType.focus)">
                <v-row class="align-center">
                    <v-col cols="10">
                        <v-row class="align-center">
                            <v-col cols="4">
                                {{ getPanelName(item) }}
                            </v-col>
                            <v-col cols="3">
                                <chip-type-component :on-click-callback="() => addOrRemoveData(item.type, route, QueryInfoType.type)">{{ item.type }}</chip-type-component>
                            </v-col>
                            <v-col>
                                <chip-type-component :on-click-callback="() => addOrRemoveData(item.id, route, QueryInfoType.id)">{{ item.id }}</chip-type-component>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2">
                        <link-button-component :link="item.link ?? item.repository ?? ''"></link-button-component>
                    </v-col>
                </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text><table-component :item="item"></table-component></v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels v-else v-model="panels">
        <v-timeline side="end" style="width: 100%">
            <v-timeline-item v-for="(item, index) in requestedObjects" :key="index" width="100%" :dot-color="'primary'" :size="'small'">
                <template v-slot:opposite>
                    {{ formatDate(new Date(item.timestamp)) }}
                </template>
                <v-expansion-panel>
                    <v-expansion-panel-title @click.stop="addOrRemoveData(index, route, QueryInfoType.focus)">
                        <v-row class="align-center">
                            <v-col cols="10">
                                <v-row class="align-center">
                                    <v-col cols="4">
                                        {{ getPanelName(item) }}
                                    </v-col>
                                    <v-col cols="3">
                                        <chip-type-component :on-click-callback="() => addOrRemoveData(item.type, route, QueryInfoType.type)">{{ item.type }}</chip-type-component>
                                    </v-col>
                                    <v-col>
                                        <chip-type-component :on-click-callback="() => addOrRemoveData(item.id, route, QueryInfoType.id)">{{ item.id }}</chip-type-component>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="2">
                                <link-button-component :link="item.link ?? item.repository ?? ''"></link-button-component>
                            </v-col> </v-row
                    ></v-expansion-panel-title>
                    <v-expansion-panel-text><table-component :item="item"></table-component></v-expansion-panel-text>
                </v-expansion-panel>
            </v-timeline-item>
        </v-timeline>
    </v-expansion-panels>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { DataType } from '../types/dataTypes';
import { capitalize } from 'lodash';
import { IIdentifiable } from '../types/identifiable';
import { Update } from '../types/update';
import { addOrRemoveData } from '../controllers/urlQuery';
import { QueryInfoType } from '../types/queryInfoType';
import { formatDate } from '../controllers/dateFormatter';
import TableComponent from '../components/TableComponent.vue';
import LinkButtonComponent from './LinkButtonComponent.vue';
import ChipTypeComponent from './ChipTypeComponent.vue';

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
const route = useRoute();
var panels: Ref<number[]> = ref([]);
var dataType = ref(DataType.Environments);

onMounted(() => {
    dataType.value = DataType[capitalize(props.dataTypeString) as keyof typeof DataType];
});

watch(
    route,
    (r) => {
        if (r.query === undefined || r.query.focus === undefined) {
            panels.value = [];
            return;
        }
        const index = Number(r.query.focus);
        panels.value = [index];
    },
    { immediate: true }
);

function getPanelName(item: IIdentifiable): string {
    if (dataType.value !== DataType.Updates) {
        return item.name!;
    } else {
        const updateItem = item as Update;
        return '[' + updateItem.environment + '] ' + updateItem.project;
    }
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
