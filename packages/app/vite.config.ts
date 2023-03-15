// vite.config.js
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [sveltekit(), nodePolyfills(), basicSsl()],
});
