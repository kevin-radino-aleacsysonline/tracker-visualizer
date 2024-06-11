<template>
    <v-card class="mx-auto reference-card" style="border-color: white">
        <v-card-title class="title"><slot name="title"></slot></v-card-title>
        <v-virtual-scroll :items="getObjectKeys()" :height="getHeight" :item-height="height">
            <template v-slot:default="{ item }">
                <v-list-item class="list-item" :height>
                    <v-list-item-title> "{{ item }}": {{ props.object[item] }} </v-list-item-title>
                </v-list-item>
            </template>
        </v-virtual-scroll>
    </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const height = 64;
const props = defineProps<{ object: any }>();
const getHeight = computed(() => {
    return getObjectKeys().length * height;
});

function getObjectKeys(): string[] {
    const keys = Object.keys(props.object);
    const usedKeys: string[] = [];
    keys.forEach((key) => {
        if (props.object[key] || props.object[key].length > 0) {
            usedKeys.push(key);
        }
    });
    return usedKeys;
}
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
