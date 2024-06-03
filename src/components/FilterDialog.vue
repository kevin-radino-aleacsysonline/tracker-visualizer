<template>
    <v-dialog v-model="isVisible" width="500" persistent>
        <v-card>
            <v-card-title class="headline">Apply filters</v-card-title>
            <v-card-text v-if="!isLoading">
                <dropdown-component v-if="typeItems" :label="'Type'" :color="'blue'" :items="typeItems" :query-info="QueryInfoType.type" :existing-filters="typeItemsSelected"></dropdown-component>
                <v-divider></v-divider>
                <dropdown-component :label="'Id'" :color="'orange'" :items="idItems" :query-info="QueryInfoType.id" :existing-filters="idItemsSelected"></dropdown-component
            ></v-card-text>
            <v-card-text v-else>Loading...</v-card-text>
            <v-card-actions>
                <v-btn color="red" @click="onCancelClick">Cancel</v-btn>
                <v-btn color="green" @click="onSubmitClick">Sumbit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, Ref, onUnmounted, onMounted } from 'vue';
import { eventBus } from '../events/eventBus';
import { OnViewUpdateArgs, OnViewLoadingArgs, OnFilterChangedArgs } from '../events/eventTypes';
import { getTypesByDataType } from '../controllers/helpers';
import { setMultipleQueries, getDataTypeRoute } from '../controllers/urlQuery';
import { useRoute } from 'vue-router';
import DropdownComponent from './DropdownComponent.vue';
import { QueryInfoType } from '../types/queryInfoType';
import _ from 'lodash';

const props = defineProps<{ showDialog: boolean }>();
const emits = defineEmits<{ (e: 'update:showDialog', value: boolean): void }>();

const isVisible = ref(props.showDialog);
const isLoading = ref(false);
const typeItems: Ref<string[]> = ref([]);
const typeItemsSelected: Ref<string[]> = ref([]);
const idItems: Ref<string[]> = ref([]);
const idItemsSelected: Ref<string[]> = ref([]);
const route = useRoute();

watch(
    () => props.showDialog,
    (newValue) => {
        isVisible.value = newValue;
    }
);

watch(route, () => {
    updateFilters();
    updateExistingFilters();
});

eventBus.on('onViewUpdate', handleOnViewUpdate);
eventBus.on('onViewLoading', handleOnViewLoading);
eventBus.on('onFilterChanged', handleOnFilterChanged);

onUnmounted(() => {
    eventBus.off('onViewUpdate', handleOnViewUpdate);
    eventBus.off('onViewLoading', handleOnViewLoading);
    eventBus.off('onFilterChanged', handleOnFilterChanged);
});

onMounted(() => {
    updateFilters();
    updateExistingFilters();
});

function onCancelClick(): void {
    isVisible.value = false;
    emits('update:showDialog', false);
}

function onSubmitClick(): void {
    const ids = _.join(idItemsSelected.value, '_');
    const types = _.join(typeItemsSelected.value, '_');
    const dataArr: { data: any; queryType: QueryInfoType }[] = [];
    if (ids.length > 0) {
        dataArr.push({ data: ids, queryType: QueryInfoType.id });
    }
    if (types.length > 0) {
        dataArr.push({ data: types, queryType: QueryInfoType.type });
    }
    setMultipleQueries(dataArr);
    onCancelClick();
}

function updateFilters(): void {
    const dataType = getDataTypeRoute(route);
    typeItems.value?.slice(0);
    typeItems.value = getTypesByDataType(dataType);
}

function updateExistingFilters(): void {
    if (!route.query) {
        typeItemsSelected.value = [];
        idItemsSelected.value = [];
        return;
    }

    const typesString = route.query[QueryInfoType.type] as string;
    if (!typesString || typesString.length <= 0) {
        typeItemsSelected.value = [];
    } else {
        typeItemsSelected.value = typesString.split('_');
    }

    const idsString = route.query[QueryInfoType.id] as string;
    if (!idsString || idsString.length <= 0) {
        idItemsSelected.value = [];
    } else {
        idItemsSelected.value = idsString.split('_');
    }
}

function handleOnViewUpdate(args: OnViewUpdateArgs): void {
    isLoading.value = false;
    idItems.value = args.list;
}

function handleOnViewLoading(_: OnViewLoadingArgs): void {
    isLoading.value = true;
}

function handleOnFilterChanged(args: OnFilterChangedArgs): void {
    if (args.type === QueryInfoType.id) {
        idItemsSelected.value = args.data;
    } else if (args.type === QueryInfoType.type) {
        typeItemsSelected.value = args.data;
    }
}
</script>
