<template>
    <v-chip v-if="onClickCallback" @click.stop="onClickCallback"><slot></slot></v-chip>
    <v-chip v-else><slot></slot></v-chip>
</template>

<script setup lang="ts">
defineProps<{ onClickCallback?: () => void }>();
</script>
