<template>
    <v-app class="dark-background">
        <v-layout>
            <v-app-bar class="app-bar">
                <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="toggleDrawer"></v-app-bar-nav-icon>
                <v-app-bar-title>Update Tracker</v-app-bar-title>
                <toggle-theme-component></toggle-theme-component>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" expand-on-hover :rail mobile-breakpoint="md">
                <v-list>
                    <v-list-item :prepend-icon="rail ? 'mdi-toggle-switch-off-outline' : 'mdi-toggle-switch'" @click="onToggleClick" :title="'Toggle Hover'"></v-list-item>
                    <v-divider></v-divider>
                    <v-list-item :prepend-icon="ICONS_VIEWS[DataType.Environments]" :color="COLORS_VIEWS[DataType.Environments]" :title="DataType.Environments" :to="{ name: 'Environments' }" @click="onListItemClicked"></v-list-item>
                    <v-list-item :prepend-icon="ICONS_VIEWS[DataType.Projects]" :color="COLORS_VIEWS[DataType.Projects]" :title="DataType.Projects" :to="{ name: 'Projects' }" @click="onListItemClicked"></v-list-item>
                    <v-list-item :prepend-icon="ICONS_VIEWS[DataType.Updates]" :color="COLORS_VIEWS[DataType.Updates]" :title="DataType.Updates" :to="{ name: 'Updates' }" @click="onListItemClicked"></v-list-item>
                    <v-divider></v-divider>
                    <v-list-item prepend-icon="mdi-filter" color="blue" title="Filter" @click="openFilterDialog"></v-list-item>
                    <filter-chip-list-component></filter-chip-list-component>
                </v-list>
            </v-navigation-drawer>
            <v-main class="main d-flex flex-column justify-start">
                <filter-dialog @update:showDialog="updateDialog" :show-dialog.sync="dialog"></filter-dialog>
                <filter-tool-bar></filter-tool-bar>
                <router-view :key="route.name!" />
            </v-main>
        </v-layout>
    </v-app>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { eventBus } from './events';
import { DataType } from './types';
import { ToggleThemeComponent, FilterChipListComponent, FilterDialog, FilterToolBar } from './components';
import { COLORS_VIEWS, ICONS_VIEWS } from './constants';

const drawer = ref(true);
const dialog = ref(false);
const rail = ref(true);
const route = useRoute();

onMounted(() => {
    const railed = localStorage.getItem('rail');
    if (railed === 'true') {
        rail.value = true;
    } else {
        rail.value = false;
    }
});

const toggleDrawer = () => {
    drawer.value = !drawer.value;
};

function onListItemClicked(): void {
    eventBus.emit('onQueryReset', {});
}

function openFilterDialog(): void {
    dialog.value = true;
}

function updateDialog(visible: boolean): void {
    dialog.value = visible;
}

function onToggleClick(): void {
    rail.value = !rail.value;
    localStorage.setItem('rail', rail.value.toString());
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
