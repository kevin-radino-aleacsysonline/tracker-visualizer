<template>
    <panel-object-component v-for="(item, index) in props.objects" :key="index" :item="item" :index="index" :data-type="getDataTypeByRouteName(route)"> </panel-object-component>
</template>

<script setup lang="ts">
import { Environment } from '../types/environment';
import { Project } from '../types/project';

import { getDataTypeByRouteName } from '../types/dataTypes';
import { useRoute } from 'vue-router';

import PanelObjectComponent from './PanelObjectComponent.vue';

const props = defineProps<{ objects: Environment[] | Project[] }>();
const route = useRoute();
</script>
