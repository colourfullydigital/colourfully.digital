import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { storyblok } from '@storyblok/astro';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    storyblok({
      accessToken: process.env.STORYBLOK_TOKEN,
      components: {
        // Map Storyblok components to your Astro components
      },
      apiOptions: {
        // Storyblok API options
        region: 'us', // optional
      },
    }),
  ],
  output: 'server',
  adapter: netlify(),
  site: 'https://cms.colourfully.digital',
  server: {
    port: 3001
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  }
});
