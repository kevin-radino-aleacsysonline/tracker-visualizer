<template>
    <template v-if="isArray">
        <view-template :dataType="dataType" :ids="(ids as string[])"></view-template>
    </template>
    <template v-else>
        <view-template :dataType="dataType" :id="(ids as string)"></view-template>
    </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ViewTemplate from '../ViewTemplate.vue';
import { DataType } from '../../types/dataTypes';

const route = useRoute();
const ids = ref(route.params.id);
var isArray = ref(true);
const dataType = DataType.Projects;

onMounted(async () => {
    isArray.value = Array.isArray(ids.value);
});
</script>
