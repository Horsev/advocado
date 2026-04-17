import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-unresolved -- devDependency; resolved when Vite runs
import vue from '@vitejs/plugin-vue';
import { toTitleCase } from './src/js/utils.js';

const isProduction = process.env.NODE_ENV === 'production';

const runtimeFilePath = fileURLToPath(import.meta.url);

const projectRootDir = path.dirname(runtimeFilePath);

const rootPath = path.resolve(projectRootDir, './');

const bootstrapPath = path.resolve(projectRootDir, 'node_modules/bootstrap');

const updateManifest = async () => {
  const manifestPath = path.resolve(projectRootDir, 'public/manifest.json');
  const packagePath = path.resolve(projectRootDir, 'package.json');

  const packageFile = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  // eslint-disable-next-line no-console -- intentional build log
  console.log(`🚀 Update manifest ${packageFile.name} with version ${packageFile.version}\n`);

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.name = toTitleCase(packageFile.name);
  manifest.version = packageFile.version;

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
};

const manifestPlugin = () => ({
  name: 'update-manifest',
  buildStart: async () => {
    if (isProduction) {
      await updateManifest();
    }
  },
});

const isTruthyPlugin = (plugin) => Boolean(plugin);

export default defineConfig({
  plugins: [vue(), isProduction && manifestPlugin()].filter(isTruthyPlugin),
  root: rootPath,
  resolve: {
    alias: {
      '~bootstrap': bootstrapPath,
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
});
