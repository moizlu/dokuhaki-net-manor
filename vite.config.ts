import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
// import { svelte } from '@sveltejs/vite-plugin-svelte';
// import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';
// import type { PreprocessorGroup } from 'svelte/compiler';

export default defineConfig({
	plugins: [tailwindcss(),
		sveltekit(),
		// svelte({
		// 	extensions: ['.svelte', '.md', '.svx'],
		// 	preprocess: [mdsvex() as PreprocessorGroup]
		// })
	]
});
