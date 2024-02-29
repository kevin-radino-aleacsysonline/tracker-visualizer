<template>
    <v-card class="clickable-card" color="primary" variant="outlined" @click="onCardClicked">
        <v-card-title>
            {{ referenceData.id }}
        </v-card-title>
        <v-card-text v-if="referenceData.latest">
            {{ referenceData.latest }}
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Reference } from '../types/references';

defineProps<{ referenceData: Reference }>();

const router = useRouter();

function onCardClicked() {
    router.push('/projects');
}
</script>

<style scoped>
.v-card-title {
    font-size: 16px;
    white-space: normal;
    overflow: hidden;
    line-height: 1.1em;
}
.clickable-card {
    cursor: pointer;
}
</style>
