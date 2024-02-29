<template>
    <v-btn @click="toggleTheme" icon="mdi-lightbulb" :color="isDarkTheme() ? 'warning' : 'accent'"> </v-btn>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme();

function isDarkTheme(): boolean {
    return theme.global.current.value.dark;
}

function toggleTheme(): void {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>
