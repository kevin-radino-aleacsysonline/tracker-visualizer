<template>
    <v-label v-if="item !== null && item !== undefined" v-for="(key, value) in Object.entries(item)"> {{ key }}, {{ value }} </v-label>
</template>

<script setup lang="ts">
import { onUnmounted, onMounted, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IIdentifiable, QueryInfoType } from '../types';
import { fetchAllData } from '../controllers';
import { FOCUSSED_ITEM } from '../constants';

var item: Ref<IIdentifiable | undefined> = ref(undefined);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
    await router.isReady();
    const id = route.query[QueryInfoType.id]?.toString();
    const itemString = localStorage.getItem(FOCUSSED_ITEM);
    var tempItem: IIdentifiable | undefined = undefined;
    tempItem = JSON.parse(itemString ?? '');

    if (id && tempItem?.id === id) {
        // loading data stored from other view
        item.value = tempItem;
        return;
    }

    const map = await fetchAllData();
    if (id && map.has(id)) {
        // loading data when not coming from other view
        item.value = map.get(id);
        return;
    }

    if (!id && tempItem) {
        // loading previously visited data
        item.value = tempItem;
        return;
    }

    console.error('nothing found');
});

onUnmounted(() => {});
</script>
