<template>
    <v-card class="mx-auto reference-card" :style="borderColorStyle">
        <v-card-title class="title"><slot name="title"></slot></v-card-title>
        <v-virtual-scroll :items="props.items" :height="getHeight" :item-height="height">
            <template v-slot:default="{ item }">
                <v-list-item class="list-item" :height>
                    <v-list-item-title>{{ item.id }}</v-list-item-title>
                    <v-list-item-subtitle v-if="item.latest">latest: {{ item.latest }}</v-list-item-subtitle>
                    <template v-slot:prepend>
                        <v-btn icon="mdi-magnify" size="x-small" variant="tonal" class="button"></v-btn>
                    </template>
                </v-list-item>
            </template>
        </v-virtual-scroll>
    </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DataType, Reference } from '../types';
import { COLORS_VIEWS } from '../constants';

const height = 64;
const props = defineProps<{ items: Reference[] | undefined; dataType?: DataType }>();
const borderColorStyle = computed(() => {
    if (props.dataType && props.dataType in COLORS_VIEWS) {
        return { borderColor: COLORS_VIEWS[props.dataType] };
    }
    return { borderColor: 'white' };
});
const getHeight = computed(() => {
    if (props.items) {
        return Math.min(props.items.length * height, 3 * height);
    } else {
        return height;
    }
});
</script>

<style scoped>
.reference-card {
    margin-top: 1em;
    margin-bottom: 1em;
    border: 0.1rem solid;
}
.button {
    margin-right: 1em;
}
.title {
    border-bottom: 0.1em dashed #444;
}
.list-item {
    border-bottom: 0.1em solid #444;
}
</style>
