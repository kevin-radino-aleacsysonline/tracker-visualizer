<template>
    <v-layout class="">
        <v-app-bar>
            <!-- <v-app-bar-nav-icon v-if="isMobile" @click="toggleDrawer"></v-app-bar-nav-icon> -->
            <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="toggleDrawer"></v-app-bar-nav-icon>
            <v-app-bar-title>Update Tracker</v-app-bar-title>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" expand-on-hover rail mobile-breakpoint="md">
            <v-list>
                <v-divider></v-divider>
                <v-list-item prepend-icon="mdi-home-circle" title="Home" link to="/"></v-list-item>
                <v-divider></v-divider>
                <v-list-item prepend-icon="mdi-alpha-e-circle-outline" title="Environments" link :to="{ name: 'Environments', params: { id: ['all'] } }"></v-list-item>
                <!-- <v-list-item prepend-icon="mdi-sprout" title="Environments" link to="/environments"></v-list-item> -->
                <v-list-item prepend-icon="mdi-alpha-e-circle-outline" title="Projects" link :to="{ name: 'Projects', params: { id: ['all'] } }"></v-list-item>
                <!-- <v-list-item prepend-icon="mdi-lightbulb-variant" title="Projects" link to="/projects"></v-list-item> -->
                <v-list-item prepend-icon="mdi-alpha-e-circle-outline" title="Updates" link :to="{ name: 'Updates', params: { id: ['all'] } }"></v-list-item>
                <!-- <v-list-item prepend-icon="mdi-update" title="Updates" link to="/updates"></v-list-item> -->
            </v-list>
        </v-navigation-drawer>
        <v-main class="d-flex align-center justify-center" style="min-height: 300px"><router-view /> </v-main>
    </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
var drawer = ref(true);
const toggleDrawer = () => {
    drawer.value = !drawer.value;
};

// onMounted(async () => {
//     const d = await getEnvironments();
//     console.log(d);
//     showEnvironment.value = true;
// });
</script>
