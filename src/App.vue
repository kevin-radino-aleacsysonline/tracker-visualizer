<template>
    <v-app class="dark-background">
        <v-layout>
            <v-app-bar class="app-bar">
                <div class="left-display">
                    <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="toggleDrawer"></v-app-bar-nav-icon>
                    <v-app-bar-title>Update Tracker</v-app-bar-title>
                </div>
                <div class="center-display">
                    <filter-expand-component></filter-expand-component>
                </div>
                <div class="right-display">
                    <toggle-theme-component></toggle-theme-component>
                </div>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" expand-on-hover rail mobile-breakpoint="md">
                <v-list>
                    <v-divider></v-divider>
                    <v-list-item prepend-icon="mdi-sprout" color="green" title="Environments" :to="{ name: 'Environments' }" @click="onListItemClicked"></v-list-item>
                    <v-list-item prepend-icon="mdi-lightbulb-variant" color="primary" title="Projects" :to="{ name: 'Projects' }" @click="onListItemClicked"></v-list-item>
                    <v-list-item prepend-icon="mdi-update" color="orange" title="Updates" :to="{ name: 'Updates' }" @click="onListItemClicked"></v-list-item>
                    <v-divider></v-divider>
                    <v-list-item prepend-icon="mdi-filter" color="blue" title="Filter"></v-list-item>
                    <filter-chip-list-component></filter-chip-list-component>
                </v-list>
            </v-navigation-drawer>
            <v-main class="main d-flex flex-column justify-start">
                <!-- <filter-tool-bar></filter-tool-bar> -->
                <router-view :key="route.name!" />
            </v-main>
        </v-layout>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { eventBus } from './events/eventBus';
import FilterExpandComponent from './components/FilterExpandComponent.vue';
import ToggleThemeComponent from './components/ToggleThemeComponent.vue';
import FilterChipListComponent from './components/FilterChipListComponent.vue';
// import FilterToolBar from './components/FilterToolBar.vue';

var drawer = ref(true);
const route = useRoute();

const toggleDrawer = () => {
    drawer.value = !drawer.value;
};

function onListItemClicked(): void {
    eventBus.emit('onQueryReset', {});
}
</script>

<style scope>
.dark-background {
    background-color: #121212;
}
.left-display {
    margin-left: 1em;
    display: flex;
    align-items: center;
}
.center-display {
    flex-grow: 1;
    display: flex;
    justify-content: center;
}
.right-display {
    margin-right: 1em;
    display: flex;
    align-items: center;
}
</style>
