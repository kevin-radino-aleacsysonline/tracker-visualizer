<template>
    <template v-if="!HIDDEN_ID_IN_TABLE_ARR.includes(type)">
        <tr>
            <td class="fixed-width">{{ _.capitalize(type!) }}</td>
            <td>
                <template v-if="value">
                    {{ value }}
                </template>
                <template v-if="valueObject">
                    <custom-object-component :custom-object="valueObject"></custom-object-component>
                </template>
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
            <td>
                <array-view-component :routeTo="type" :expand="valueArray!.length > 0" :data-array="valueArray!" :type="(typeof valueArray!.at(0))">
                    <div class="icon">
                        <v-icon color="primary"> mdi-numeric-{{ valueArray!.length <= 9 ? valueArray!.length : '9-plus' }}-box-multiple-outline</v-icon>
                    </div>
                    {{ _.capitalize(type) }}
                </array-view-component>
            </td>
        </tr>
    </template>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { InfoType } from '../types/infoTypes';
import { ArrayViewComponent, CustomObjectComponent } from '../components';
import { HIDDEN_ID_IN_TABLE_ARR } from '../constants';

defineProps<{ type: InfoType; value?: string; valueArray?: any[]; valueObject?: object }>();
</script>

<style scoped>
td {
    padding: 4px;
}
.fixed-width {
    width: 10%;
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
