<template>
    <v-select :color="props.color" hide-details v-model="selectedValues" :items="props.items" :label="props.label" multiple>
        <template v-slot:selection="{ item, index }">
            <v-chip :color v-if="index < 3">
                <span>{{ item.title }}</span>
            </v-chip>
            <span v-if="index === 3" class="text-grey text-caption align-self-center"> (+{{ selectedValues.length - 3 }} others) </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { QueryInfoType } from '../types/queryInfoType';
import { eventBus } from '../events/eventBus';

const props = withDefaults(defineProps<{ items: string[]; color: string; label: string; queryInfo: QueryInfoType; existingFilters?: string[] }>(), {
    existingFilters: () => [],
});
const selectedValues = ref(props.existingFilters);

watch(selectedValues, () => {
    onSelectChange();
});

function onSelectChange(): void {
    eventBus.emit('onFilterChanged', {
        type: props.queryInfo,
        data: selectedValues.value,
    });
}
</script>
