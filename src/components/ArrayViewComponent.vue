<template>
    <v-expansion-panels multiple>
        <v-expansion-panel :disabled="!expand">
            <v-expansion-panel-title><slot>default</slot></v-expansion-panel-title>
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
import { useRouter } from 'vue-router';
import { Reference } from '../types/references';
import ValueCardComponent from './ValueCardComponent.vue';
import ValueClickableCardComponent from './ValueClickableCardComponent.vue';
const props = defineProps<{ expand: boolean; dataArray: []; type: string; routeTo: string }>();

const router = useRouter();

function clickedCard(id: string) {
    router.push('/' + props.routeTo + '/' + id);
}
</script>

<style scoped>
.padding {
    padding-right: 8px;
    padding-top: 8px;
}
</style>
./ReferenceCardLinkComponent.vue
