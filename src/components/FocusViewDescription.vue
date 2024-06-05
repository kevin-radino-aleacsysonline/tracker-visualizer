<template>
    <v-label>{{ description }}</v-label>
</template>

<script setup lang="ts">
defineProps<{ description?: string }>();
</script>
