<template>
    <template v-if="!HIDDEN_ID_IN_TABLE_ARR.includes(type)">
        <tr>
            <td class="fixed-width">{{ capitalize(type!) }}</td>
            <td>
                <template v-if="type === InfoType.Description">
                    {{ value }}
                </template>
                <template v-else-if="type === InfoType.Type">
                    {{ value }}
                </template>
                <template v-else>
                    <h5>{{ type }}</h5>
                </template>
            </td>
        </tr>
    </template>
    <template v-else>
        <tr v-if="type === InfoType.Updates || type === InfoType.Projects">
            <td colspan="2">
                <array-view-component :expand="valueArray!.length > 0" :data-array="valueArray!">
                    <div class="icon">
                        <v-icon color="primary"> mdi-numeric-{{ valueArray!.length <= 9 ? valueArray!.length : '9-plus' }}-box-multiple-outline</v-icon>
                    </div>
                    {{ capitalize(type) }}
                </array-view-component>
            </td>
        </tr>
    </template>
</template>

<script setup lang="ts">
import { capitalize } from 'lodash';
import { InfoType } from '../types/infoTypes';
import { HIDDEN_ID_IN_TABLE_ARR } from '../types/constants';
import ArrayViewComponent from './ArrayViewComponent.vue';
import { Reference } from '../types/references';

defineProps<{ type: InfoType; value?: string; valueArray?: Reference[]; valueObject?: object }>();
</script>

<style scoped>
td {
    padding: 4px;
}
.fixed-width {
    width: 20%;
}
h5 {
    color: red;
}
.icon {
    padding-right: 8px;
}
</style>
