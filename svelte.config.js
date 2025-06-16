import { mdsvex } from 'mdsvex';
import remarkAttr from 'remark-attr';

import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	extensions: ['.svelte', '.md', '.svx'],

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md', '.svx'],
			remarkPlugins: [
				remarkAttr
			]
		})
	],
	kit: { adapter: adapter() },
};

export default config;
