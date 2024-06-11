<template>
    <v-icon :icon></v-icon>
    <v-label>{{ data }}</v-label>
    <v-spacer></v-spacer>
</template>

<script setup lang="ts">
defineProps<{ data: string; icon: string }>();
</script>

<style scoped></style>
