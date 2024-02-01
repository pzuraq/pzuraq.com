import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import md from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  preprocess: [vitePreprocess(), md.mdsvex(mdsvexConfig)],

  kit: {
    adapter: adapter(),

    csp: {
      mode: 'hash',
      directives: {
        'script-src': [
          'self',
          'sha256-zfRvLbR3zlaekiwICEa9S3jjc9sLhqYte6tX4ScxNSI=',
          'sha256-weAyrPtk9s1QpDfc5D5fH5bUfhVFNjL0mNVRLvTDoTY=',
        ],
        'connect-src': ['self'],
        'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
      },
    },
  },
};

export default config;
