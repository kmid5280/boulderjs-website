import { defineConfig } from '@solidjs/start/config'
import tailwindcss from 'tailwindcss'
import { config } from 'vinxi/plugins/config'

export default defineConfig({
  server: {
    compatibilityDate: '2024-11-11',
    preset: 'cloudflare-pages',
    sourceMap: 'inline',
    rollupConfig: {
      external: ['__STATIC_CONTENT_MANIFEST', 'node:async_hooks']
    }
    // prerender: {
    //   crawlLinks: true
    // }
  },
  vite: {
    plugins: [
      config('tailwind', {
        css: {
          postcss: {
            plugins: [tailwindcss]
          }
        }
      })
    ]
  }
})
