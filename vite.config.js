import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs";
import { toTitleCase } from "./src/js/utils";

import path from "path";

const updateManifest = async () => {
  // Resolve paths to manifest.json and package.json files
  const manifestPath = path.resolve(
    __dirname,
    "public/manifest.json"
  );
  const packagePath = path.resolve(
    __dirname,
    "package.json"
  );

  // Read package.json to get the application name and version
  const packageJSON = JSON.parse(
    fs.readFileSync(packagePath, "utf8")
  );

  // Log a message indicating which manifest is being updated
  console.log(
    `🚀 Update manifest ${packageJSON.name} with version ${packageJSON.version}`
  );

  // Read manifest.json and modify the name and version properties
  const manifest = JSON.parse(
    fs.readFileSync(
      manifestPath,
      "utf8"
    )
  );
  manifest.name = toTitleCase(
    packageJSON.name
  );
  manifest.version =
    packageJSON.version;

  // Write the updated manifest.json file
  fs.writeFileSync(
    manifestPath,
    JSON.stringify(manifest, null, 2)
  );
};

export default defineConfig({
  plugins: [
    vue(),
    await updateManifest(),
  ],
  root: path.resolve(__dirname, "./"),
  resolve: {
    alias: {
      "~bootstrap": path.resolve(
        __dirname,
        "node_modules/bootstrap"
      ),
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
});
