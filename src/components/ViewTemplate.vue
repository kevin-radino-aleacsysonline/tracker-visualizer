<template>
    <v-container v-if="!isLoading">
        <panels-component :requested-objects="requestedData" :dataType></panels-component>
    </v-container>
    <v-container v-else-if="errorLoading">
        <v-alert type="error">
            <v-alert-title>API Error</v-alert-title>
            Error: Could not fetch data
        </v-alert>
    </v-container>
    <v-container v-else class="text-center">
        <panels-loading-component :amount-panels="_.random(2, 5)"></panels-loading-component>
    </v-container>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { onMounted, ref, watch, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { eventBus } from '../events';
import { DataType, IIdentifiable, QueryInfoType } from '../types';
import { filterData, getFetchFunction } from '../controllers';
import { PanelsComponent, PanelsLoadingComponent } from '../components';

var isLoading = ref(true);
var errorLoading = ref(false);
var fetchedData: Map<string, IIdentifiable> = new Map<string, IIdentifiable>();
var requestedData: Ref<IIdentifiable[]> = ref([]);
const route = useRoute();
const props = defineProps<{ dataType: DataType }>();

onMounted(async () => {
    eventBus.emit('onViewLoading', {});
    await fetchData();
    const idList: string[] = [];
    fetchedData.forEach((value) => {
        idList.push(value.id);
    });
    eventBus.emit('onViewUpdate', { list: idList });
});

watch(route, async () => {
    filterFetchedData();
});

async function fetchData(refreshData = true): Promise<void> {
    errorLoading.value = false;
    if (refreshData) {
        fetchedData = await getFetchFunction(props.dataType);
    }
    if (fetchedData.size === 0) {
        errorLoading.value = true;
        return;
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
