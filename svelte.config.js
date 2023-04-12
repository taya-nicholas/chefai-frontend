// import adapter from "@sveltejs/adapter-auto";
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from "@sveltejs/kit/vite";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      $db: path.resolve("./src/db"),
      $types: path.resolve("./src/types"),
    },
  },
  preprocess: vitePreprocess(),
};

export default config;
