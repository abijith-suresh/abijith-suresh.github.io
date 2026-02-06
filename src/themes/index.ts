import inkAndPaper from "./ink-and-paper";
import type { ThemeDefinition } from "./types";

export const themes = {
  "ink-and-paper": inkAndPaper,
} as const;

export const ACTIVE_THEME = "ink-and-paper" as const;

// Export the active theme definition
export const activeTheme: ThemeDefinition = themes[ACTIVE_THEME];

// Re-export types
export type { ThemeColors, ThemeDefinition } from "./types";
export type ThemeName = keyof typeof themes;
