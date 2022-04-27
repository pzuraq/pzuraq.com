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

    prerender: {
      default: true,
      crawl: true,
    },

    csp: {
      mode: 'hash',
      directives: {
        'script-src': [
          'self',
          'sha256-zfRvLbR3zlaekiwICEa9S3jjc9sLhqYte6tX4ScxNSI=',
          'sha256-weAyrPtk9s1QpDfc5D5fH5bUfhVFNjL0mNVRLvTDoTY=',
        ],
        'connect-src': ['self'],
        'style-src': ['self', 'https://fonts.googleapis.com'],
      },
    },

    vite: {
      plugins: [postMeta()],
    },
  },
};

export default config;
