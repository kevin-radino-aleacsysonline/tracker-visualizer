<template>
    <v-table>
        <template v-for="(value, key) in props.item!" :key="key">
            <template v-if="key !== 'name'">
                <tr v-if="!Array.isArray(value)">
                    <table-cell :type="key" :value="value"></table-cell>
                </tr>
                <tr v-else>
                    <table-cell :type="key" :value-array="value"></table-cell>
                </tr>
            </template>
        </template>
    </v-table>
</template>

<script setup lang="ts">
import TableCell from './TableCell.vue';

const props = defineProps({
    item: Object,
});
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}
tr {
    border-bottom: 1px solid #ccc;
}
tr:last-child {
    border-bottom: none;
}
</style>
