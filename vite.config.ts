import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isBlind = env.VITE_BLIND === 'true' || process.env.VITE_BLIND === 'true'

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@profile': fileURLToPath(
          new URL(
            isBlind ? './src/config/profile.blind.ts' : './src/config/profile.full.ts',
            import.meta.url,
          ),
        ),
      },
    },
  }
})
