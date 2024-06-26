<template>
    <v-expansion-panels multiple v-model="panels">
        <v-expansion-panel :disabled="!expand">
            <v-expansion-panel-title @click="onTitleClick()"><slot>default</slot></v-expansion-panel-title>
            <v-expansion-panel-text>
                <div class="padding">
                    <v-row class="align-baseline">
                        <v-col v-for="(value, index) in dataArray" :key="index" cols="12" sm="4">
                            <value-card-component v-if="type === 'object' && value as Reference !== null" :onClicked="() => clickedCard((value as Reference).id)">
                                <template #title>
                                    {{ (value as Reference).id }}
                                </template>
                                <template #content v-if="(value as Reference).latest">
                                    {{ (value as Reference).latest }}
                                </template>
                            </value-card-component>
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
import { ref, Ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Reference, QueryInfoType } from '../types';
import { refreshRouteWithQuery, addOrRemoveData } from '../controllers';
import { ValueCardComponent } from '../components';

const props = defineProps<{ expand: boolean; dataArray: any[]; type: string; routeTo: string }>();
const route = useRoute();
var panels: Ref<number[]> = ref([0]);

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

function clickedCard(id: string): void {
    refreshRouteWithQuery(props.routeTo, id, QueryInfoType.id);
}

function onTitleClick(): void {
    addOrRemoveData(props.routeTo, route, QueryInfoType.innerFocus);
}
</script>

<style scoped>
.padding {
    padding-right: 8px;
    padding-top: 8px;
}
</style>
