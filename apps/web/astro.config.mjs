import tailwindVite from '@tailwindcss/vite';
// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';


// https://astro.build/config
export default defineConfig({
  // Enable server-side rendering
  output: 'server',
  adapter: netlify(),
  
  // i18n configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  
  // Configure site metadata
  site: 'https://colourfully.digital',
  
  // Add Tailwind via Vite plugin (for Tailwind v4+)
  vite: {
    plugins: [
      tailwindVite()
    ],
    server: {
      watch: {
        usePolling: true
      }
    }
  }
});
