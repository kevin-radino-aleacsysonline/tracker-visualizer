<template>
    <panel-object-component v-for="(item, index) in props.objects" :key="index" :item="item" :index="index" :data-type="getDataTypeByRouteName(route)"> </panel-object-component>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Environment, Project, getDataTypeByRouteName } from '../types';
import { PanelObjectComponent } from '../components';

const props = defineProps<{ objects: Environment[] | Project[] }>();
const route = useRoute();
</script>
