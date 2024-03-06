<template>
    <v-container>
        <v-row>
            <template v-for="(value, key) in customObject" :key="key">
                <v-col v-if="value !== ''" cols="12" sm="4">
                    <v-card color="primary" variant="outlined">
                        <v-card-title> {{ key }} </v-card-title>
                        <v-card-text> {{ value }} </v-card-text>
                    </v-card>
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
defineProps<{ customObject: object }>();
</script>
