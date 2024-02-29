<template>
    <v-btn @click="toggleTheme" icon="mdi-lightbulb" :color="isDarkTheme() ? 'warning' : 'accent'"> </v-btn>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        theme.global.name.value = savedTheme;
    }
});

function isDarkTheme(): boolean {
    return theme.global.current.value.dark;
}

function toggleTheme(): void {
    const newTheme = theme.global.current.value.dark ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    localStorage.setItem('theme', newTheme);
}
</script>
