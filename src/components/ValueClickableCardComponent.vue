<template>
    <v-card class="clickable-card" color="primary" variant="outlined" @click="onClicked">
        <v-card-title>
            <slot name="title"></slot>
        </v-card-title>
        <v-card-text v-if="$slots.content">
            <slot name="content"></slot>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
defineProps<{ onClicked: () => void }>();
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
