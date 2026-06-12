import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// `base` must match the GitHub Pages project path so built asset URLs resolve
// to https://buiminhdn.github.io/web-personal_tracker/.
export default defineConfig({
  base: "/web-personal_tracker/",
  plugins: [react(), tailwindcss()],
});
