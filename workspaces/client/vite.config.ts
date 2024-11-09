import { defineConfig } from 'vite';
import findPackageDir from 'pkg-dir';
// import { pnpmWorkspaceRoot } from '@node-kit/pnpm-workspace-root';
import path from 'node:path';
// import fs from 'node:fs';
import wasm from 'vite-plugin-wasm';
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(async () => {
  const PACKAGE_DIR = (await findPackageDir(process.cwd()))!
  // const WORKSPACE_DIR = (await pnpmWorkspaceRoot(process.cwd()))!
  const OUTPUT_DIR = path.resolve(PACKAGE_DIR, './dist')
  // const SEED_IMAGE_DIR = path.resolve(WORKSPACE_DIR, './workspaces/server/seeds/images')
  // const IMAGE_PATH_LIST = fs.readdirSync(SEED_IMAGE_DIR).map((file) => `/images/${file}`)
  return {
    build: {
      commonjsOptions: {
        include: [/node_modules/, /use-sync-external-store/],
        transformMixedEsModules: true,
        requireReturnsDefault: 'auto',
      },
      outDir: OUTPUT_DIR,
      rollupOptions: {
        input: {
          client: path.resolve(PACKAGE_DIR, './src/index.tsx'),
          serviceworker: path.resolve(PACKAGE_DIR, './src/serviceworker/index.ts')
        },
        output: {
          entryFileNames: '[name].js',
        },
        plugins: [
          visualizer()
        ]
      },
      target: 'chrome130'
    },
    plugins: [
      nodePolyfills(),
      react(),
      wasm()
    ],
    resolve: {
      alias: {
        'use-sync-external-store/shim/index.js': 'react'
      }
    },
  }
})
