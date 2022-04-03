import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';
import md from 'mdsvex';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mdsvexConfig from './mdsvex.config.js';
import postMeta from './lib/post-meta.mjs';

const filePath = dirname(fileURLToPath(import.meta.url));
const stylePath = `${filePath}/src/styles/`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      css: {
        prependData: `@import '${stylePath}/mixins.css';`,
      },
    }),
    md.mdsvex(mdsvexConfig),
  ],

  kit: {
    adapter: adapter(),

    vite: {
      plugins: [postMeta()],
    },
  },
};

export default config;
