<template>
    <v-breadcrumbs :items class="inconsolata">
        <template v-slot:item="{ item, index }">
            <v-breadcrumbs-item :color="index === items.length - 1 ? 'white' : 'primary'">
                {{ item.title }}
            </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
</template>

<script setup lang="ts">
import { BreadcrumbsItemSlotType } from '../types';

defineProps<{ items: BreadcrumbsItemSlotType[] }>();
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap');

.inconsolata {
    font-family: 'Inconsolata', monospace;
    font-size: larger;
}
</style>
