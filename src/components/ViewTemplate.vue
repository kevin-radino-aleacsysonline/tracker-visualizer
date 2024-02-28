<template>
    <v-container v-if="!isLoading">
        <panels :requested-objects="requestedData" :dataTypeString="dataType"></panels>
    </v-container>
    <v-container v-else class="text-center">
        <v-label>Loading...</v-label>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IIdentifiable } from '../types/identifiable';
import Panels from '../components/Panels.vue';
import { ALL } from '../types/constants';
import { getEnvironments, getProjects, getUpdates } from '../controllers/dataController';
import { DataType } from '../types/dataTypes';

var isLoading = ref(true);
var fetchedData: Map<string, IIdentifiable> = new Map<string, IIdentifiable>();
var requestedData: IIdentifiable[] = [];

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
        requestedData.push(fetchedData.get(key)!);
    }
}

function AddSingleToRequests(id: string): void {
    if (id === ALL) {
        fetchedData.forEach((value) => {
            requestedData.push(value);
        });
    } else {
        TryAndAddToRequestData(id);
    }
}

function AddMultipleToRequests(ids: string[]): void {
    if (ids.includes(ALL)) {
        fetchedData.forEach((value) => {
            if (!ids.includes(value.id)) {
                requestedData.push(value);
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

onMounted(async () => {
    await SetFetchFunction(props.dataType);
    if (props.ids) {
        AddMultipleToRequests(props.ids as string[]);
    }
    if (props.id) {
        AddSingleToRequests(props.id as string);
    }
    isLoading.value = false;
});
</script>
