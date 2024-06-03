<template>
    <v-card v-if="!isLoading" variant="outlined" color="grey" class="hover-card" :class="{ 'is-expanded': expanded }">
        <v-card-text class="d-flex align-center">
            <span class="filter-text">Filters</span>
            <span v-if="expanded" class="d-flex align-center card-content">
                <div class="centered-div">
                    <dropdown-component v-if="typeItems" :label="'Type'" :color="'blue'" :items="typeItems" :query-info="QueryInfoType.type"></dropdown-component>
                    <dropdown-component :label="'Id'" :color="'orange'" :items="idItems" :query-info="QueryInfoType.id"></dropdown-component>
                </div>
                <v-btn variant="tonal" color="blue" class="submit-btn">Submit</v-btn>
            </span>
        </v-card-text>
        <v-btn class="expand-btn" :class="{ 'is-expanded': expanded }" variant="tonal" color="blue" @click="expanded = !expanded">
            <v-icon>
                {{ expanded ? 'mdi-arrow-expand-left' : 'mdi-arrow-expand-right' }}
            </v-icon>
        </v-btn>
    </v-card>
    <v-label v-else>Loading...</v-label>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted, Ref, watch } from 'vue';
import { eventBus } from '../events/eventBus';
import { OnQueryChangedArgs, OnViewLoadingArgs, OnViewUpdateArgs } from '../events/eventTypes';
import { getDataTypeRoute } from '../controllers/urlQuery';
import { getTypesByDataType } from '../controllers/helpers';
import { useRoute } from 'vue-router';
import DropdownComponent from './DropdownComponent.vue';
import { QueryInfoType } from '../types/queryInfoType';

const expanded = ref(true);
const route = useRoute();

var isLoading = ref(false);
var typeItems: Ref<string[]> = ref([]);
var idItems: Ref<string[]> = ref([]);
eventBus.on('onQueryChange', handleOnQueryChange);
eventBus.on('onViewUpdate', handleOnViewUpdate);
eventBus.on('onViewLoading', handleOnViewLoading);

onUnmounted(() => {
    eventBus.off('onQueryChange', handleOnQueryChange);
    eventBus.off('onViewUpdate', handleOnViewUpdate);
    eventBus.off('onViewLoading', handleOnViewLoading);
});

onMounted(() => {
    updateFilters();
});

watch(route, () => {
    updateFilters();
});

function updateFilters(): void {
    const dataType = getDataTypeRoute(route);
    typeItems.value?.slice(0);
    typeItems.value = getTypesByDataType(dataType);
}

function handleOnQueryChange(_: OnQueryChangedArgs): void {}

function handleOnViewUpdate(args: OnViewUpdateArgs): void {
    isLoading.value = false;
    idItems.value = args.list;
}

function handleOnViewLoading(_: OnViewLoadingArgs): void {
    isLoading.value = true;
}
</script>

<style scoped>
.expand-btn.is-expanded {
    min-height: 55px;
    max-height: 55px;
    max-width: 16px;
    min-width: 16px;
}
.expand-btn {
    transition: all 0.3s ease;
    min-height: 40px;
    max-height: 40px;
    max-width: 60px;
    min-width: 60px;
}
.hover-card {
    height: 40px;
    width: 150px;
    transition: all 0.3s ease;
    overflow: hidden;
    display: flex;
    align-items: center;
}
.hover-card.is-expanded {
    width: 70%;
    height: 55px;
    transition: all 0.3s ease;
}
.filter-text {
    padding-left: 15px;
    min-width: 70px;
}
.v-card-text {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0;
}
.card-content {
    transition: opacity 0.3s ease 0.3s;
    opacity: 0;
    display: flex;
    align-items: center;
    width: 100%;
}
.hover-card.is-expanded .card-content {
    opacity: 1;
}
.centered-div {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.centered-div > * {
    padding: 5px;
}
.submit-btn {
    margin-right: 5px;
}
</style>
