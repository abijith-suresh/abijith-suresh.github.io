import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://abijith.sh",
  integrations: [sitemap()],
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Improve dev server performance
      warmup: {
        clientFiles: ["./src/components/**/*.astro", "./src/layouts/**/*.astro"],
      },
    },
    optimizeDeps: {
      // Pre-bundle these dependencies
      include: ["clsx", "tailwind-merge"],
    },
  },
});
