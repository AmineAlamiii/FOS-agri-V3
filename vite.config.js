import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const pagesDir = fileURLToPath(new URL('./pages', import.meta.url));

/** Every .html file under pages/ is one public URL (multi-page app). */
function collectPages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return collectPages(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

const input = Object.fromEntries(
  collectPages(pagesDir).map((file) => [relative(pagesDir, file).replace(/\.html$/, ''), file])
);

export default defineConfig({
  // GitHub Pages serves the site from /<repo>/ — set BASE_PATH in CI.
  base: process.env.BASE_PATH || '/',
  root: pagesDir,
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  plugins: [
    // Runtime JSX maison : isole les nombres en arabe comme l'ancien site.
    react({ jsxImportSource: '@/lib/jsx' }),
    {
      // Ce runtime fait partie du code du projet : il ne doit pas être figé dans le
      // cache des dépendances de Vite (sinon ses modifications ne sont pas prises en compte).
      name: 'fos-jsx-runtime-from-source',
      config(config) {
        const isRuntime = (id) => id.startsWith('@/lib/jsx');
        config.optimizeDeps = config.optimizeDeps || {};
        config.optimizeDeps.include = (config.optimizeDeps.include || []).filter((id) => !isRuntime(id));
        config.optimizeDeps.exclude = [...(config.optimizeDeps.exclude || []), '@/lib/jsx/jsx-runtime', '@/lib/jsx/jsx-dev-runtime'];
      }
    }
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  server: {
    port: 5173,
    fs: { allow: [fileURLToPath(new URL('.', import.meta.url))] }
  },
  build: {
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    emptyOutDir: true,
    // public/assets holds the site media; keep bundles in a separate folder.
    assetsDir: 'static',
    // Les deux cartes SVG (accueil, conventions médicales) pèsent ~1,2 Mo chacune.
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      input,
      output: {
        // React et les bibliothèques dans un fichier commun, mis en cache entre les pages.
        manualChunks: (id) => (id.includes('node_modules') ? 'vendor' : undefined)
      }
    }
  }
});
