<template>
    <template v-if="isArray">
        <view-template :dataType="route.name!.toString().toLowerCase()" :ids="(ids as string[])"></view-template>
    </template>
    <template v-else>
        <view-template :dataType="route.name!.toString().toLowerCase()" :id="(ids as string)"></view-template>
    </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ViewTemplate from '../ViewTemplate.vue';

const route = useRoute();
const ids = ref(route.params.id);
var isArray = ref(true);

onMounted(async () => {
    isArray.value = Array.isArray(ids.value);

    console.error(route);
});
</script>
