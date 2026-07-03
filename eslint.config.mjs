import { defineConfig, globalIgnores } from 'eslint/config'
import nextPlugin from '@next/eslint-plugin-next'

export default defineConfig([
  globalIgnores(['.next/**', 'node_modules/**', 'internal/**']),
  nextPlugin.configs.recommended,
  nextPlugin.configs['core-web-vitals'],
])
