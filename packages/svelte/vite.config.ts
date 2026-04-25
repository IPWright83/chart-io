import path from 'node:path';
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		conditions: ['browser'],
	},
	build: {
		sourcemap: true,
		lib: {
			entry: path.resolve(__dirname, 'src/lib/index.ts'),
			name: 'index',
			formats: ['es'],
			fileName: () => 'index.js',
		},
		rollupOptions: {
			external: ['svelte', '@reduxjs/toolkit', 'redux-thunk'],
		},
	},
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec,unit}.{js,ts}'],
	},
});
