<template>
    <v-toolbar v-if="visible" class="mx-auto" flat dense>
        <v-spacer></v-spacer>
        <filter-chip-component v-for="[key, value] in currentFilters" :key="key" :type="key" :data="value"> {{ value }} </filter-chip-component>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeFilterToolBar">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { onMounted, onUnmounted, ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { eventBus, OnQueryChangedArgs } from '../events';
import { QueryInfoType } from '../types';
import { clearRouteQuery } from '../controllers';
import { FilterChipComponent } from '../components';
import { FOCUS } from '../constants';

const visible = ref(true);
const route = useRoute();
const router = useRouter();

const currentFilters: Ref<Map<QueryInfoType, any>> = ref(new Map<QueryInfoType, any>());

eventBus.on('onQueryChange', onQueryChangeHandler);
eventBus.on('onQueryReset', closeFilterToolBar);
eventBus.on('onFiltersClear', onFiltersClearHandler);

onMounted(async () => {
    await router.isReady();
    if (route.name === FOCUS) {
        visible.value = false;
        return;
    }
    const query = route.query;
    Object.keys(query).forEach((key) => {
        const type = QueryInfoType[key as keyof typeof QueryInfoType];
        if (type) {
            eventBus.emit('onQueryChange', { type, data: query[key] });
        }
    });
    updateToolBar();
});

onUnmounted(() => {
    eventBus.off('onQueryChange', onQueryChangeHandler);
    eventBus.off('onQueryReset', closeFilterToolBar);
    eventBus.off('onFiltersClear', onFiltersClearHandler);
});

function updateToolBar(): void {
    visible.value = currentFilters.value.size > 0;
}

function closeFilterToolBar() {
    visible.value = false;
    currentFilters.value.clear();
    clearRouteQuery();
}

function onFiltersClearHandler(): void {
    if (currentFilters.value.size !== 0 || visible.value) {
        currentFilters.value.clear();
        visible.value = false;
    }
}

function onQueryChangeHandler(args: OnQueryChangedArgs): void {
    if (!args.remove) {
        currentFilters.value.set(args.type, args.data);
    } else {
        if (currentFilters.value.has(args.type)) {
            currentFilters.value.delete(args.type);
        }
    }
    updateToolBar();
}
</script>
