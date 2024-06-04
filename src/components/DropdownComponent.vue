<template>
    <v-select :color="props.color" hide-details v-model="selectedValues" :items="props.items" :label="props.label" multiple>
        <template v-slot:item="{ item }">
            <v-list-item v-bind="$attrs" @click="toggleSelection(item)">
                <v-list-item-action>
                    <v-icon class="icon-spacing">{{ getSelectionIcon(item) }}</v-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-action>
            </v-list-item>
        </template>

        <template v-slot:selection="{ item, index }">
            <v-chip :color v-if="index < 3">
                <span>{{ item.title }}</span>
            </v-chip>
            <span v-if="index === 3" class="text-grey text-caption align-self-center"> (+{{ selectedValues.length - 3 }} others) </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { eventBus } from '../events';
import { QueryInfoType, SelectionTypes, nextSelection } from '../types';

const props = withDefaults(defineProps<{ items: string[]; color: string; label: string; queryInfo: QueryInfoType; existingFilters?: string[] }>(), {
    existingFilters: () => [],
});
const selectedValues = ref(props.existingFilters);
const selectionTypes: Ref<SelectionTypes[]> = ref(Array(props.items.length).fill(SelectionTypes.neutral));

watch(selectedValues, () => {
    onSelectChange();
});

function onSelectChange(): void {
    eventBus.emit('onFilterChanged', {
        type: props.queryInfo,
        data: selectedValues.value,
    });
}

function toggleSelection(item: any): void {
    const index = props.items.findIndex((i) => i === item.value);
    if (index > -1) {
        selectionTypes.value[index] = nextSelection[selectionTypes.value[index]];
        if (selectionTypes.value[index] !== SelectionTypes.neutral) {
            if (!selectedValues.value.includes(item.value)) {
                selectedValues.value.push(item.value);
            }
        } else {
            if (selectedValues.value.includes(item.value)) {
                selectedValues.value = selectedValues.value.filter((value) => value !== item.value);
            }
        }
    }
}

function getSelectionIcon(item: any): string {
    const index = props.items.findIndex((i) => i === item.value);
    if (index > -1) {
        if (selectionTypes.value[index] === SelectionTypes.neutral) {
            return 'mdi-checkbox-blank-outline';
        } else if (selectionTypes.value[index] === SelectionTypes.positive) {
            return 'mdi-checkbox-outline';
        } else {
            return 'mdi-minus-box-outline';
        }
    } else {
        return 'mdi-checkbox-multiple-marked-circle';
    }
}
</script>

<style scoped>
.icon-spacing {
    margin-right: 0.25em;
}
</style>
