<template>
    <v-chip v-if="onClickCallback" @click.stop="onClickCallback" :color="COLORS_QUERY[type][SelectionTypes.neutral]" v-bind="props">
        <v-icon v-if="useIcon">{{ ICONS_QUERY[type] }}</v-icon>
        <slot></slot>
    </v-chip>
    <v-chip v-else v-bind="props">
        <v-icon v-if="useIcon">{{ ICONS_QUERY[type] }}</v-icon>
        <slot></slot>
    </v-chip>
</template>

<script setup lang="ts">
import { COLORS_QUERY, ICONS_QUERY } from '../constants';
import { QueryInfoType } from '../types/queryInfoType';
import { SelectionTypes } from '../types/selectionTypes';

defineProps<{ onClickCallback?: () => void; type: QueryInfoType; useIcon?: boolean; props?: Record<string, any> }>();
</script>
