<template>
    <v-table>
        <template v-for="key in orderedEntries" :key>
            <template v-if="!HIDDEN_INFO_ARR.includes(key as InfoType)">
                <table-row
                    :type="(key as InfoType)"
                    :value="!Array.isArray(item[key]) && typeof item[key] === 'string' ? item[key] : undefined"
                    :value-array="Array.isArray(item[key]) ? item[key] : undefined"
                    :value-object="typeof item[key] === 'object' && !Array.isArray(item[key]) ? item[key] : undefined"
                ></table-row>
            </template>
        </template>
    </v-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { InfoType } from '../types';
import { TableRow } from '../components';
import { HIDDEN_INFO_ARR } from '../constants';

const props = defineProps<{ item: Record<string, any> }>();
const desiredOrder = ['id', 'description', 'projects', 'updates', 'environments', 'timestamp', 'versions', 'commits', 'version', 'environment', 'project', 'output', 'git'];
const orderedEntries = computed(() => {
    if (!props.item) {
        return [];
    }
    const orderedKeys = desiredOrder.filter((key) => key in props.item!);
    const unorderedKeys = Object.keys(props.item).filter((key) => !orderedKeys.includes(key));
    return [...orderedKeys, ...unorderedKeys];
});
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}
</style>
