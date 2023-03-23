import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { toTitleCase, log } from "./src/js/utils";
import { fileURLToPath } from "node:url";

const isProduction = process.env.NODE_ENV === "production";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const rootPath = path.resolve(__dirname, "./");

const bootstrapPath = path.resolve(__dirname, "node_modules/bootstrap");

const updateManifest = async () => {
  console.log("🚀 Update manifest", isProduction, __dirname);
  // Resolve paths to manifest.json and package.json files
  const manifestPath = path.resolve(__dirname, "public/manifest.json");
  const packagePath = path.resolve(__dirname, "package.json");

  // Read package.json to get the application name and version
  const packageFile = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  // Log a message indicating which manifest is being updated
  log(
    `🚀 Update manifest ${packageFile.name} with version ${packageFile.version}\n`
  );

  // Read manifest.json and modify the name and version properties
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.name = toTitleCase(packageFile.name);
  manifest.version = packageFile.version;

  // Write the updated manifest.json file
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
};

console.log("🚀 Vite config loaded", isProduction);

export default defineConfig({
  plugins: [vue(), isProduction && updateManifest()],
  rootPath,
  resolve: {
    alias: {
      "~bootstrap": bootstrapPath,
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
});
