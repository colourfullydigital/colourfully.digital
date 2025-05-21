// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Enable server-side rendering
  output: 'server',
  adapter: netlify(),
  
  // Configure site metadata
  site: 'https://colourfully.digital',
  
  // Enable dev features
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  }
});
