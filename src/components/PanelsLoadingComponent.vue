<template>
    <v-expansion-panels :disabled="true">
        <v-expansion-panel v-for="n in amountPanels" :key="n">
            <v-expansion-panel-title>
                <v-row>
                    <v-col cols="10">
                        <v-row>
                            <v-col cols="4">
                                <v-skeleton-loader type="table-heading"></v-skeleton-loader>
                            </v-col>
                            <v-col cols="3">
                                <v-skeleton-loader type="chip"></v-skeleton-loader>
                            </v-col>
                            <v-col>
                                <v-skeleton-loader type="chip"></v-skeleton-loader>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="1">
                        <v-skeleton-loader type="button"></v-skeleton-loader>
                    </v-col>
                    <v-col cols="1">
                        <v-skeleton-loader type="button"></v-skeleton-loader>
                    </v-col>
                </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text></v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup lang="ts">
defineProps<{ amountPanels: number }>();
</script>
