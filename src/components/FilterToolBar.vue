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
import { eventBus } from '../events/eventBus';
import { OnQueryChangedArgs } from '../events/eventTypes';
import { QueryInfoType } from '../types/queryInfoType';
import { useRoute, useRouter } from 'vue-router';
import { clearRouteQuery } from '../controllers/urlQuery';
import FilterChipComponent from './FilterChipComponent.vue';

const visible = ref(true);
const route = useRoute();
const router = useRouter();

const currentFilters: Ref<Map<QueryInfoType, any>> = ref(new Map<QueryInfoType, any>());
function closeFilterToolBar() {
    visible.value = false;
    currentFilters.value.clear();
    clearRouteQuery();
}

onMounted(async () => {
    await router.isReady();
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
    eventBus.off('onQueryChange', handleOnQueryChange);
    eventBus.off('onQueryReset', closeFilterToolBar);
});

const handleOnQueryChange = (args: OnQueryChangedArgs) => {
    if (!args.remove) {
        currentFilters.value.set(args.type, args.data);
    } else {
        if (currentFilters.value.has(args.type)) {
            currentFilters.value.delete(args.type);
        }
    }
    updateToolBar();
};

eventBus.on('onQueryChange', handleOnQueryChange);
eventBus.on('onQueryReset', closeFilterToolBar);

function updateToolBar(): void {
    visible.value = currentFilters.value.size > 0;
}
</script>
