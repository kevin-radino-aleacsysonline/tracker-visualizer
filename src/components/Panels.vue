<template>
    <v-expansion-panels multiple>
        <v-expansion-panel v-for="(item, index) in props.requestedObjects" :key="index">
            <v-expansion-panel-title>
                <v-row class="align-center">
                    <v-col>
                        <v-row class="align-center">
                            <v-col>
                                {{ getPanelName(item) }}
                            </v-col>
                            <v-col>
                                <copy-text-component class="copy-element" :text="'@' + item.id" :stop="true"></copy-text-component>
                            </v-col>
                            <v-col></v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2">
                        <link-button-component :link="item.link"></link-button-component>
                    </v-col>
                </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <table-component :item="item"></table-component>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DataType } from '../types/dataTypes';
import { capitalize } from 'lodash';
import { IIdentifiable } from '../types/identifiable';
import TableComponent from '../components/TableComponent.vue';
import CopyTextComponent from './CopyTextComponent.vue';
import LinkButtonComponent from './LinkButtonComponent.vue';

const props = defineProps({
    requestedObjects: {
        type: Object,
        required: true,
    },
    dataTypeString: {
        type: String,
        required: true,
    },
});

var dataType = ref(DataType.Environments);

onMounted(() => {
    dataType.value = DataType[capitalize(props.dataTypeString) as keyof typeof DataType];
});

function getPanelName(item: IIdentifiable): string {
    if (dataType.value !== DataType.Updates) {
        return item.name!;
    }
    return 'test';
}
</script>

<style scoped>
.copy-element {
    color: #888;
    font-size: 0.75em;
    font-style: italic;
    padding-left: 4px;
}

.v-expansion-panel-title {
    font-size: 1.3em; /* Increase font size of the panel title */
}

.bigger-panel .v-expansion-panel .v-expansion-panel-text {
    font-size: 16px; /* Increase font size of the panel content */
}
</style>
