<template>
    <v-timeline side="end" style="width: 100%">
        <v-timeline-item v-for="(item, index) in objects" :key="index" width="100%" :dot-color="'primary'" :size="'small'">
            <template v-slot:opposite>
                {{ formatDate(new Date(item.timestamp ?? '01/01/1970')) }}
            </template>
            <panel-object-component :key="index" :item="item" :index="index" :data-type="getDataTypeByRouteName(route)"> </panel-object-component>
        </v-timeline-item>
    </v-timeline>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Update, getDataTypeByRouteName } from '../types';
import { formatDate } from '../controllers';
import { PanelObjectComponent } from '../components';

defineProps<{ objects: Update[] }>();

const route = useRoute();
</script>
