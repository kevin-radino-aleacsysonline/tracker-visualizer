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
import { getEnvironments, getProjects, getUpdates } from '../controllers/dataController';
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

async function SetFetchFunction(dataType: string): Promise<void> {
    if (dataType === DataType.Environments) {
        fetchedData = await getEnvironments();
    } else if (dataType === DataType.Projects) {
        fetchedData = await getProjects();
    } else if (dataType === DataType.Updates) {
        fetchedData = await getUpdates();
    }
}

function FilterData(filter: string, filterValue: string): void {
    var filteredData: IIdentifiable[] = [];
    fetchedData.forEach((value) => {
        if (filter in value) {
            const objValue = (value as any)[filter];
            if (filterValue === objValue) {
                filteredData.push(value);
            }
        }
    });
    if (filteredData.length > 0) {
        requestedData.value = filteredData;
    }
}

async function FetchData(refreshData = true): Promise<void> {
    if (refreshData) {
        await SetFetchFunction(props.dataType);
    }
    requestedData.value = [];
    fetchedData.forEach((value) => {
        requestedData.value.push(value);
    });
    if (route.query && route.query[QueryInfoType.type]) {
        FilterData(QueryInfoType.type, route.query.type as string);
    }
    isLoading.value = false;
}

onMounted(async () => {
    await FetchData();
});

watch(route, async () => {
    if (route.query[QueryInfoType.type]) {
        FilterData(QueryInfoType.type, route.query.type as string);
    } else {
        await FetchData(false);
    }
});
</script>
