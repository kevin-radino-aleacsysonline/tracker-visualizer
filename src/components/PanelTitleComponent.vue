<template>
    <v-expansion-panel-title @click.stop="onClick()">
        <v-row class="align-center">
            <v-col cols="10">
                <v-row class="align-center">
                    <v-col cols="4">
                        {{ title }}
                    </v-col>
                    <v-col cols="3">
                        <chip-type-component :on-click-callback="onChipCallbackWithType">{{ item.type }}</chip-type-component>
                    </v-col>
                    <v-col>
                        <chip-type-component :on-click-callback="onChipCallbackWithId">{{ item.id }}</chip-type-component>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="1">
                <link-button-component :link="getUrl() ?? ''"></link-button-component>
            </v-col>
            <v-col cols="1">
                <route-button-component></route-button-component>
            </v-col>
        </v-row>
    </v-expansion-panel-title>
</template>

<script setup lang="ts">
import { Update } from '../types/update';
import { Environment } from '../types/environment';
import { Project } from '../types/project';
import { QueryInfoType } from '../types/queryInfoType';
import { useRoute } from 'vue-router';
import { addOrRemoveData } from '../controllers/urlQuery';
import ChipTypeComponent from './ChipTypeComponent.vue';
import LinkButtonComponent from './LinkButtonComponent.vue';
import RouteButtonComponent from './RouteButtonComponent.vue';

const props = defineProps<{ onClick: () => void; item: Update | Project | Environment; title: string }>();
const route = useRoute();

function onChipCallbackWithType(): void {
    addOrRemoveData(props.item.type, route, QueryInfoType.type);
}

function onChipCallbackWithId(): void {
    addOrRemoveData(props.item.id, route, QueryInfoType.id);
}

function getUrl(): string | undefined {
    if ('link' in props.item) {
        return props.item.link;
    } else if ('repository' in props.item) {
        return props.item.repository;
    } else {
        return undefined;
    }
}
</script>

<style scoped>
.button-wrapper {
    position: relative;
    display: inline-block;
}
</style>
