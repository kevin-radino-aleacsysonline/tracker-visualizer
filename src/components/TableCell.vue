<template>
    <td class="first-column">{{ capitalize(props.type!) }}</td>
    <td>
        <template v-if="props.type === 'id'">
            <CopyTextComponent :text="props.value!"></CopyTextComponent>
        </template>
        <template v-else-if="props.type === 'description'">
            {{ props.value }}
        </template>
        <template v-else-if="props.type === 'link'">
            {{ props.value }}
        </template>
        <template v-else-if="props.type === 'type'">
            {{ props.value }}
        </template>
        <template v-else-if="props.type === 'updates'">
            {{ props.valueArray }}
        </template>
        <template v-else-if="props.type === 'projects'">
            {{ props.valueArray }}
        </template>
        <template v-else>
            <h5>{{ props.type }}</h5>
        </template>
    </td>
</template>

<script setup lang="ts">
import { capitalize } from 'lodash';
import CopyTextComponent from './CopyTextComponent.vue';

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: false,
    },
    valueArray: {
        type: Array,
        required: false,
    },
});
</script>

<style scoped>
td.first-column {
    width: 20%;
}
td {
    padding: 4px;
}
h5 {
    color: red;
}
</style>
