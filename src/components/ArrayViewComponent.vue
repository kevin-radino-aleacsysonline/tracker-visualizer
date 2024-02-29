<template>
    <v-expansion-panels multiple>
        <v-expansion-panel :disabled="!expand">
            <v-expansion-panel-title><slot>default</slot></v-expansion-panel-title>
            <v-expansion-panel-text>
                <!-- <div :class="['padding', { scrollable: dataArray.length > 5 }]"> -->
                <div class="padding">
                    <v-row class="align-baseline">
                        <v-col v-for="(value, index) in dataArray" :key="index" cols="12" sm="4">
                            <card-link-component :referenceData="value"></card-link-component>
                        </v-col>
                    </v-row>
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup lang="ts">
import { Reference } from '../types/references';
import CardLinkComponent from './CardLinkComponent.vue';
defineProps<{ expand: boolean; dataArray: Reference[] }>();
</script>

<style scoped>
.scrollable {
    max-height: 512px;
    overflow-y: auto;
    overflow-x: hidden;
}
.padding {
    padding-right: 8px;
    padding-top: 8px;
}
</style>
