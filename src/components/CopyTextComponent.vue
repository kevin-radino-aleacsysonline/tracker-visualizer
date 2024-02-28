<template>
    <div class="copy-to-clipboard" @click="copyToClipboard">
        <transition name="fade" mode="out-in">
            <span :key="displayText">{{ displayText }}</span>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { wait } from '../utils';

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
});
const displayText = ref(props.text);

async function copyToClipboard() {
    const textArea = document.createElement('textarea');
    textArea.value = props.text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    displayText.value = 'Copied...';
    await wait(1500);
    displayText.value = props.text;
}
</script>

<style scoped>
.copy-to-clipboard {
    cursor: pointer;
    position: relative;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
