<template>
    <v-breadcrumbs>
        <template v-for="_ in itemCount" :key="index">
            <v-breadcrumbs-item disabled><v-skeleton-loader type="text" class="skeleton-breadcrumb" /> {{ _ < itemCount ? '/' : '' }} </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
    <br />
    <v-skeleton-loader type="sentences"></v-skeleton-loader>
    <br />
    <v-skeleton-loader type="card"></v-skeleton-loader>
    <br />
    <v-skeleton-loader type="card"></v-skeleton-loader>
</template>

<script setup lang="ts">
const itemCount = 3;
</script>

<style scoped>
.skeleton-breadcrumb {
    width: 80px;
    height: 20px;
}
</style>
