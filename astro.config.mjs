import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://abijith.sh",
  integrations: [
    expressiveCode({
      themes: ["github-light", "github-dark"],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => `[data-theme="${theme.name.split("-")[1]}"]`,
      defaultProps: {
        wrap: true,
        showLineNumbers: false,
      },
      plugins: [],
      styleOverrides: {
        codeFontSize: "0.875rem",
        borderColor: "var(--border)",
        borderRadius: "0.5rem",
        codeBackground: "color-mix(in oklab, var(--muted) 25%, transparent)",
        frames: {
          editorActiveTabForeground: "var(--muted-foreground)",
          editorActiveTabBackground: "color-mix(in oklab, var(--muted) 25%, transparent)",
          editorActiveTabIndicatorBottomColor: "transparent",
          editorActiveTabIndicatorTopColor: "transparent",
          editorTabBorderRadius: "0",
          editorTabBarBackground: "transparent",
          editorTabBarBorderBottomColor: "transparent",
          frameBoxShadowCssValue: "none",
          terminalBackground: "color-mix(in oklab, var(--muted) 25%, transparent)",
          terminalTitlebarBackground: "transparent",
          terminalTitlebarBorderBottomColor: "transparent",
          terminalTitlebarForeground: "var(--muted-foreground)",
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
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
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress warnings about unused imports from Astro internals
          if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
          warn(warning);
        },
      },
    },
  },
});
