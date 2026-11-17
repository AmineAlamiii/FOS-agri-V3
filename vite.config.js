import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));

/**
 * Hébergement statique (GitHub Pages) : chaque adresse du site doit renvoyer
 * index.html, où React prend le relais. On copie donc index.html dans un dossier
 * par page (/contact/index.html…) et en 404.html (anciennes adresses .html).
 */
function staticRoutesPlugin() {
  return {
    name: 'fos-static-routes',
    apply: 'build',
    closeBundle() {
      const dist = join(root, 'dist');
      const source = readFileSync(join(root, 'src/app/routes.js'), 'utf8');
      const paths = [...source.matchAll(/path: '([^']+)'/g)].map((match) => match[1]).filter((path) => path !== '/');
      paths.forEach((path) => {
        mkdirSync(join(dist, path), { recursive: true });
        copyFileSync(join(dist, 'index.html'), join(dist, path, 'index.html'));
      });
      copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
    }
  };
}

export default defineConfig({
  // GitHub Pages sert le site depuis /<dépôt>/ — BASE_PATH est défini dans le workflow.
  base: process.env.BASE_PATH || '/',
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
    },
    staticRoutesPlugin()
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  server: {
    port: 5173
  },
  build: {
    // public/assets contient les médias du site : les fichiers compilés vont dans static/.
    assetsDir: 'static',
    // Les deux cartes SVG (accueil, conventions médicales) pèsent ~1,2 Mo chacune.
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // React et les bibliothèques dans un fichier commun, mis en cache entre les pages.
        manualChunks: (id) => (id.includes('node_modules') ? 'vendor' : undefined)
      }
    }
  }
});
