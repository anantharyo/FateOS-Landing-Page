import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fateos.com',
  integrations: [
    tailwind({
      // Use Tailwind CSS v4 with CSS-first approach
      applyBaseStyles: false
    }),
    sitemap()
  ],
  
  // Optimize for Cloudflare Pages deployment
  output: 'static',
  
  // Build optimizations
  build: {
    assets: '_astro',
    inlineStylesheets: 'auto'
  }
});