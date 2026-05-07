import {defineConfig} from 'vite'
import {resolve} from 'node:path'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        tailwindcss()
    ],
    base: './',
    resolve: {
        alias: {
            '@': resolve(import.meta.dirname, 'src')
        }
    },
    server: {port: 12345},
    build: {
        minify: true,
        emptyOutDir: true,
        rolldownOptions: {
            output: {}
        }
    }
})
