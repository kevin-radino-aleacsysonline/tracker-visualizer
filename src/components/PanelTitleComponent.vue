<template>
    <v-expansion-panel-title @click.stop="onClick()">
        <v-row class="align-center">
            <v-col cols="10">
                <v-row class="align-center">
                    <v-col cols="4">
                        {{ title }}
                    </v-col>
                    <v-col cols="3">
                        <chip-type-component :on-click-callback="onTypeChipCallback">{{ item.type }}</chip-type-component>
                    </v-col>
                    <v-col>
                        <chip-type-component :on-click-callback="onIdChipCallback">{{ item.id }}</chip-type-component>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="2">
                <!-- <link-button-component :link="item.link ?? item.repository ?? ''"></link-button-component> -->
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

const props = defineProps<{ onClick: () => void; item: Update | Project | Environment; title: string }>();
const route = useRoute();

function onTypeChipCallback(): void {
    addOrRemoveData(props.item.type, route, QueryInfoType.type);
}

function onIdChipCallback(): void {
    addOrRemoveData(props.item.id, route, QueryInfoType.id);
}
</script>
