<template>
    <p v-if="!dataLoaded">Loading Environments...</p>
    <p v-else>Loaded Environments</p>
    <!-- <p>Loading Projects...</p> -->
    <!-- <p>Loading Updates...</p> -->
</template>

<script lang="ts">
import { wait } from '../../utils';
import _ from 'lodash';

export default {
    data() {
        return {
            dataLoaded: false,
            timeToWait: 0,
        };
    },
    methods: {
        async fetchData() {
            await wait(1000);
        },
    },
    async created() {
        await this.fetchData();
        this.dataLoaded = true;
    },
};
</script>
