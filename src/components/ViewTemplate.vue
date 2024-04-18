<template>
    <v-container v-if="!isLoading">
        <panels :requested-objects="requestedData" :dataTypeString="dataType"></panels>
    </v-container>
    <v-container v-else class="text-center">
        <v-label>Loading...</v-label>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { IIdentifiable } from '../types/identifiable';
import Panels from '../components/Panels.vue';
import { getEnvironments, getProjects, getUpdates, filterData } from '../controllers/dataController';
import { DataType } from '../types/dataTypes';
import _ from 'lodash';
import { QueryInfoType } from '../types/queryInfoType';

var isLoading = ref(true);
var fetchedData: Map<string, IIdentifiable> = new Map<string, IIdentifiable>();
var requestedData: Ref<IIdentifiable[]> = ref([]);
const route = useRoute();
const props = defineProps({
    dataType: {
        type: String,
        required: true,
    },
});

onMounted(async () => {
    await fetchData();
});

watch(route, async () => {
    filterFetchedData();
});

async function setFetchFunction(dataType: string): Promise<void> {
    if (dataType === DataType.Environments) {
        fetchedData = await getEnvironments();
    } else if (dataType === DataType.Projects) {
        fetchedData = await getProjects();
    } else if (dataType === DataType.Updates) {
        fetchedData = await getUpdates();
    }
}

async function fetchData(refreshData = true): Promise<void> {
    if (refreshData) {
        await setFetchFunction(props.dataType);
    }
    requestedData.value = [];
    fetchedData.forEach((value) => {
        requestedData.value.push(value);
    });
    filterFetchedData();
    isLoading.value = false;
}

function filterFetchedData(): void {
    const queries: QueryInfoType[] = [];
    const filters: string[] = [];

    if (route.query) {
        if (route.query[QueryInfoType.type]) {
            queries.push(QueryInfoType.type);
            filters.push(route.query[QueryInfoType.type] as string);
        }
        if (route.query[QueryInfoType.id]) {
            queries.push(QueryInfoType.id);
            filters.push(route.query[QueryInfoType.id] as string);
        }
    }
    requestedData.value = filterData([...fetchedData.values()], queries, filters);
}
</script>
