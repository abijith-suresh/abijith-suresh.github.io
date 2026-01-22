/**
 * Theme Configuration
 *
 * Change the active theme by modifying the export below.
 * The selected theme will be applied at build time.
 *
 * Available themes:
 * - rose-pine: Rosé Pine theme (soft, elegant colors)
 *
 * To add a new theme:
 * 1. Create a new file in src/themes/ (e.g., nord.ts)
 * 2. Export a ThemeDefinition object
 * 3. Import and add it to the themes object in index.ts
 */

import rosePine from "./rose-pine";
import type { ThemeDefinition } from "./types";

// All available themes
export const themes = {
  "rose-pine": rosePine,
} as const;

// Active theme - change this to switch themes
export const ACTIVE_THEME = "rose-pine" as const;

// Export the active theme definition
export const activeTheme: ThemeDefinition = themes[ACTIVE_THEME];

// Re-export types
export type { ThemeColors, ThemeDefinition } from "./types";
export type ThemeName = keyof typeof themes;
