import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const port = Number(process.env.PORT) || 3000;

export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: './dist',
    },
    server: {
        host: true,
        port: port,
        watch: {
            usePolling: true,
        },
    },
});
