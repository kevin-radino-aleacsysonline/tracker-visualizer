<template>
    <v-card color="primary" variant="tonal">
        <v-card-title>
            <slot name="title"></slot>
        </v-card-title>
        <v-card-text v-if="$slots.content">
            <slot name="content"></slot>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.v-card-title {
    font-size: 16px;
    white-space: normal;
    overflow: hidden;
    line-height: 1.1em;
}
</style>
