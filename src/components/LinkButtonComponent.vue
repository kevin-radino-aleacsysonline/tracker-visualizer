<template>
    <div class="button-wrapper">
        <v-btn icon="mdi-link-variant" variant="tonal" @click.stop="navigateTo(link)">
            <v-icon icon="mdi-link-variant"></v-icon>
            <v-icon v-if="!isValidURL(link)" class="error-icon" color="warning" icon="mdi-alert"></v-icon>
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { isValidURL } from '../utils';
import { DEFAULT_LINK } from '../types/constants';
defineProps<{ link: string }>();

function navigateTo(url: string): void {
    if (isValidURL(url)) {
        window.open(url, '_blank');
    } else {
        window.open(DEFAULT_LINK);
    }
}
</script>

<style scoped>
.button-wrapper {
    position: relative;
    display: inline-block;
}

.error-icon {
    position: absolute;
    top: -8px;
    right: -8px;
}
</style>
