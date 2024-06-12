<template>
    <div class="button-wrapper">
        <v-btn :size icon="mdi-magnify" @click.stop="onButtonClick" variant="tonal"> </v-btn>
    </div>
</template>
<script setup lang="ts">
import { DataType, IIdentifiable, QueryInfoType } from '../types';
import { refreshRouteWithQuery, clearRouteQuery } from '../controllers/';
import { FOCUSSED_ITEM } from '../constants';

const props = defineProps<{ item: IIdentifiable; type: DataType; size?: string }>();

function onButtonClick(): void {
    let id = '';
    if (typeof props.item === 'string') {
        localStorage.removeItem(FOCUSSED_ITEM);
        id = props.item;
    } else {
        localStorage.setItem(FOCUSSED_ITEM, JSON.stringify(props.item));
        id = props.item.id;
    }
    clearRouteQuery();
    refreshRouteWithQuery('focus', id, QueryInfoType.id);
}
</script>
