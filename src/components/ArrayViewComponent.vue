<template>
    <v-expansion-panels multiple v-model="panels">
        <v-expansion-panel :disabled="!expand">
            <v-expansion-panel-title @click="onTitleClick()"><slot>default</slot></v-expansion-panel-title>
            <v-expansion-panel-text>
                <div class="padding">
                    <v-row class="align-baseline">
                        <v-col v-for="(value, index) in dataArray" :key="index" cols="12" sm="4">
                            <value-clickable-card-component v-if="type === 'object' && value as Reference !== null" :onClicked="() => clickedCard((value as Reference).id)">
                                <template #title>
                                    {{ (value as Reference).id }}
                                </template>
                                <template #content v-if="(value as Reference).latest">
                                    {{ (value as Reference).latest }}
                                </template>
                            </value-clickable-card-component>
                            <value-card-component v-if="type !== 'object'">
                                <template #title>
                                    {{ value }}
                                </template>
                            </value-card-component>
                        </v-col>
                    </v-row>
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Reference } from '../types/references';
import { ref, Ref, watch } from 'vue';
import { routeAndAddQuery, addOrRemoveData } from '../controllers/urlQuery';
import { QueryInfoType } from '../types/queryInfoType';
import ValueCardComponent from './ValueCardComponent.vue';
import ValueClickableCardComponent from './ValueClickableCardComponent.vue';
const props = defineProps<{ expand: boolean; dataArray: []; type: string; routeTo: string }>();

const route = useRoute();
var panels: Ref<number[]> = ref([0]);

function clickedCard(id: string): void {
    routeAndAddQuery(props.routeTo, id, QueryInfoType.id);
}

function onTitleClick(): void {
    addOrRemoveData(props.routeTo, route, QueryInfoType.innerFocus);
}

watch(
    route,
    (r) => {
        if (r.query === undefined || r.query.innerFocus === undefined) {
            panels.value = [];
            return;
        }
        panels.value = r.query.innerFocus?.includes(props.routeTo) ? [0] : [];
    },
    { immediate: true }
);
</script>

<style scoped>
.padding {
    padding-right: 8px;
    padding-top: 8px;
}
</style>
