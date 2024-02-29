<template>
    <v-table>
        <template v-for="(value, key) in item" :key="key">
            <template v-if="!HIDDEN_INFO_ARR.includes(key as InfoType)">
                <table-row
                    :type="(key as InfoType)"
                    :value="!Array.isArray(value) && typeof value === 'string' ? value : undefined"
                    :value-array="Array.isArray(value) ? value : undefined"
                    :value-object="typeof value === 'object' ? value : undefined"
                ></table-row>
            </template>
        </template>
    </v-table>
</template>

<script setup lang="ts">
import { HIDDEN_INFO_ARR } from '../types/constants';
import { InfoType } from '../types/infoTypes';
import TableRow from './TableRow.vue';

defineProps<{ item: object }>();
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}
</style>
