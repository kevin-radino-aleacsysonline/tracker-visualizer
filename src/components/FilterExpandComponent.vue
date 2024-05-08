<template>
    <v-card variant="outlined" color="grey" class="hover-card" :class="{ 'is-expanded': expanded }">
        <v-card-text class="d-flex align-center">
            <span class="filter-text">Filters</span>
            <span v-if="expanded" class="d-flex align-center card-content">
                <div class="centered-div">
                    <dropdown-component :items="['one', 'two', 'three', 'four']"></dropdown-component>
                </div>
                <v-btn variant="tonal" color="blue" class="submit-btn">Submit</v-btn>
            </span>
        </v-card-text>
        <v-btn class="expand-btn" :class="{ 'is-expanded': expanded }" variant="tonal" color="blue" @click="expanded = !expanded">
            <v-icon>
                {{ expanded ? 'mdi-arrow-expand-left' : 'mdi-arrow-expand-right' }}
            </v-icon>
        </v-btn>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { eventBus } from '../events/eventBus';
import { OnQueryChangedArgs } from '../events/eventTypes';
import DropdownComponent from './DropdownComponent.vue';

const expanded = ref(true);

eventBus.on('onQueryChange', handleOnQueryChange);

onUnmounted(() => {
    eventBus.off('onQueryChange', handleOnQueryChange);
});

function handleOnQueryChange(args: OnQueryChangedArgs): void {
    args;
}
</script>

<style scoped>
.expand-btn.is-expanded {
    min-height: 55px;
    max-height: 55px;
    max-width: 16px;
    min-width: 16px;
}
.expand-btn {
    transition: all 0.3s ease;
    min-height: 40px;
    max-height: 40px;
    max-width: 60px;
    min-width: 60px;
}
.hover-card {
    height: 40px;
    width: 150px;
    transition: all 0.3s ease;
    overflow: hidden;
    display: flex;
    align-items: center;
}
.hover-card.is-expanded {
    width: 50%;
    height: 55px;
    transition: all 0.3s ease;
}
.filter-text {
    padding-left: 15px;
    min-width: 70px;
}
.v-card-text {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0;
}
.card-content {
    transition: opacity 0.3s ease 0.3s;
    opacity: 0;
    display: flex;
    align-items: center;
    width: 100%;
}
.hover-card.is-expanded .card-content {
    opacity: 1;
}
.centered-div {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.centered-div > * {
    padding: 5px;
}
.submit-btn {
    margin-right: 5px;
}
</style>
