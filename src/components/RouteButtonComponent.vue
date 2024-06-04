<template>
    <div class="button-wrapper">
        <v-btn icon="mdi-magnify" @click.stop="onButtonClick" variant="tonal"> </v-btn>
    </div>
</template>
<script setup lang="ts">
import { DataType, IIdentifiable, QueryInfoType } from '../types';
import { clearRouteQuery, refreshRouteWithQuery } from '../controllers/';
import { FOCUSSED_ITEM } from '../constants';

const props = defineProps<{ item: IIdentifiable; type: DataType }>();

function onButtonClick(): void {
    localStorage.setItem(FOCUSSED_ITEM, JSON.stringify(props.item));
    clearRouteQuery();
    refreshRouteWithQuery('focus', props.item.id, QueryInfoType.id);
}
</script>
