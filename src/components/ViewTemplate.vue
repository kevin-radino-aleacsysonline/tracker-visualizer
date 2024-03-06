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
import { ALL } from '../types/constants';
import { getEnvironments, getProjects, getUpdates } from '../controllers/dataController';
import { DataType } from '../types/dataTypes';
import _ from 'lodash';

var isLoading = ref(true);
var fetchedData: Map<string, IIdentifiable> = new Map<string, IIdentifiable>();
var requestedData: Ref<IIdentifiable[]> = ref([]);

const route = useRoute();

const props = defineProps({
    dataType: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: false,
    },
    ids: {
        type: Array,
        required: false,
    },
});

function TryAndAddToRequestData(key: string): void {
    if (fetchedData.has(key)) {
        requestedData.value.push(fetchedData.get(key)!);
    }
}

function AddSingleToRequests(id: string): void {
    if (id === ALL) {
        fetchedData.forEach((value) => {
            requestedData.value.push(value);
        });
    } else {
        TryAndAddToRequestData(id);
    }
}

function AddMultipleToRequests(ids: string[]): void {
    if (ids.includes(ALL)) {
        fetchedData.forEach((value) => {
            if (!ids.includes(value.id)) {
                requestedData.value.push(value);
            }
        });
    } else {
        for (let i = 0; i < ids.length; i++) {
            TryAndAddToRequestData(ids[i]);
        }
    }
}

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
    if (props.ids) {
        AddMultipleToRequests(props.ids as string[]);
    }
    if (props.id) {
        AddSingleToRequests(props.id as string);
    }
    if (route.query && route.query.filterType) {
        FilterData('type', route.query.filterType as string);
    }
    isLoading.value = false;
}

onMounted(async () => {
    await FetchData();
});

watch(route, async () => {
    if (route.query.filterType) {
        FilterData('type', route.query.filterType as string);
    } else {
        await FetchData(false);
    }
});
</script>
