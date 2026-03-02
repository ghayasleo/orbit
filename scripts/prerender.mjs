import { build } from "vite";
import { readFileSync, writeFileSync, copyFileSync } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

await build({
  root,
  build: {
    ssr: "src/entry-server.tsx",
    outDir: "dist-ssr",
    rollupOptions: { output: { format: "esm" } },
  },
});

const { render } = await import(
  pathToFileURL(path.resolve(root, "dist-ssr/entry-server.js")).href
);

const template = readFileSync(path.resolve(root, "dist/index.html"), "utf-8");

// Save clean template as app.html (for all non-home routes)
copyFileSync(
  path.resolve(root, "dist/index.html"),
  path.resolve(root, "dist/app.html"),
);

// Save prerendered HTML as index.html (for homepage only)
const appHtml = render();
const html = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
);
writeFileSync(path.resolve(root, "dist/index.html"), html);

console.log("✅ Homepage prerendered successfully!");
