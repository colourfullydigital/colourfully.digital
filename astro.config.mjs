import { defineConfig } from 'astro/config'

// Note: i18n and deployment-specific config will be added in later tasks (T047/T049)
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  integrations: [],
})
