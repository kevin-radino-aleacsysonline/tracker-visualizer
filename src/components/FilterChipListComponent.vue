<template>
    <div v-if="visible">
        <v-divider></v-divider>
        <v-list-item :prepend-icon="hovered ? 'mdi-filter-remove' : 'mdi-filter-cog'" @mouseover="hovered = true" @mouseleave="hovered = false" @click="onRemoveAllFilters" :class="{ 'hovered-icon': hovered }">
            <div class="current-filters-title">
                <template v-if="hovered"> Remove all filters </template>
                <template v-else> Current filters </template>
            </div>
        </v-list-item>
        <v-list>
            <filter-chip-component v-for="[key, value] in currentFilters" :key="key" :type="key" :data="value">{{ value }}</filter-chip-component>
        </v-list>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { eventBus, OnQueryChangedArgs } from '../events';
import { QueryInfoType } from '../types';
import { clearRouteQuery } from '../controllers';
import { FilterChipComponent } from '../components';

const currentFilters: Ref<Map<QueryInfoType, any>> = ref(new Map<QueryInfoType, any>());

const hovered = ref(false);
const visible = ref(false);
const route = useRoute();
const router = useRouter();

eventBus.on('onQueryChange', onQueryChangeHandler);

onMounted(async () => {
    await router.isReady();
    const query = route.query;
    Object.keys(query).forEach((key) => {
        const type = QueryInfoType[key as keyof typeof QueryInfoType];
        if (type) {
            eventBus.emit('onQueryChange', { type, data: query[key] });
        }
    });
    updateView();
});

onUnmounted(() => {
    eventBus.off('onQueryChange', onQueryChangeHandler);
});

function onQueryChangeHandler(args: OnQueryChangedArgs): void {
    if (!args.remove) {
        currentFilters.value.set(args.type, args.data);
    } else {
        if (currentFilters.value.has(args.type)) {
            currentFilters.value.delete(args.type);
        }
    }
    updateView();
}

function updateView(): void {
    visible.value = currentFilters.value.size > 0;
}

function onRemoveAllFilters(): void {
    currentFilters.value.clear();
    visible.value = false;
    hovered.value = false;
    clearRouteQuery();
}
</script>

<style scoped>
.current-filters-title {
    font-style: italic;
    font-size: 0.87rem;
}
.hovered-icon {
    color: red;
}
</style>
