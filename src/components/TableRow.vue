<template>
    <template v-if="!HIDDEN_ID_IN_TABLE_ARR.includes(type)">
        <tr>
            <td class="fixed-width">{{ capitalize(type!) }}</td>
            <td>
                <h5>
                    {{ value ?? '' }}
                    {{ valueArray ?? '' }}
                    {{ valueObject ?? '' }}
                </h5>
            </td>
        </tr>
    </template>
    <template v-else>
        <tr v-if="type === InfoType.Description">
            <td colspan="2" color="accent" class="description">
                {{ value }}
            </td>
        </tr>
        <tr v-else>
            <td colspan="2">
                <array-view-component :expand="valueArray!.length > 0" :data-array="valueArray!" :type="typeof valueArray?.at(0)" :routeTo="type">
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

defineProps<{ type: InfoType; value?: string; valueArray?: []; valueObject?: object }>();
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
.description {
    font-style: italic;
    color: #888;
}
</style>
