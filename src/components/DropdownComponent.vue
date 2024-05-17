<template>
    <v-select :color hide-details v-model="value" :items :label multiple>
        <template v-slot:selection="{ item, index }">
            <v-chip :color v-if="index < 3">
                <span>{{ item.title }}</span>
            </v-chip>
            <span v-if="index === 3" class="text-grey text-caption align-self-center"> (+{{ value.length - 3 }} others) </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ items: string[]; color: string; label: string }>();

const value = ref([]);
</script>
