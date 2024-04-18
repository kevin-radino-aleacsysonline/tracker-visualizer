<template>
    <v-app class="dark-background">
        <v-layout>
            <v-app-bar>
                <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="toggleDrawer"></v-app-bar-nav-icon>
                <v-app-bar-title>Update Tracker</v-app-bar-title>
                <toggle-theme-component></toggle-theme-component>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" expand-on-hover rail mobile-breakpoint="md">
                <v-list>
                    <v-divider></v-divider>
                    <v-list-item prepend-icon="mdi-sprout" color="green" title="Environments" :to="{ name: 'Environments' }"></v-list-item>
                    <v-list-item prepend-icon="mdi-lightbulb-variant" color="primary" title="Projects" :to="{ name: 'Projects' }"></v-list-item>
                    <v-list-item prepend-icon="mdi-update" color="orange" title="Updates" :to="{ name: 'Updates' }"></v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main class="d-flex justify-center"><router-view /></v-main>
        </v-layout>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ToggleThemeComponent from './components/ToggleThemeComponent.vue';
var drawer = ref(true);
const toggleDrawer = () => {
    drawer.value = !drawer.value;
};
</script>

<style scope>
.dark-background {
    background-color: #121212; /* Choose a suitable dark color */
}
</style>
