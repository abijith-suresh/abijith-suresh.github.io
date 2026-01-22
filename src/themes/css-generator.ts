/**
 * Theme CSS Generator
 *
 * Generates CSS custom properties from theme definitions.
 * This module is used at build time to apply the active theme.
 */

import { activeTheme } from "./index";
import type { ThemeColors } from "./types";

/**
 * Converts a theme colors object to CSS custom properties
 */
function colorsToCssVariables(colors: ThemeColors): string {
  return `
    --background: ${colors.background};
    --foreground: ${colors.foreground};

    --card: ${colors.card};
    --card-foreground: ${colors.cardForeground};

    --popover: ${colors.popover};
    --popover-foreground: ${colors.popoverForeground};

    --primary: ${colors.primary};
    --primary-foreground: ${colors.primaryForeground};

    --secondary: ${colors.secondary};
    --secondary-foreground: ${colors.secondaryForeground};

    --muted: ${colors.muted};
    --muted-foreground: ${colors.mutedForeground};

    --accent: ${colors.accent};
    --accent-foreground: ${colors.accentForeground};

    --destructive: ${colors.destructive};
    --destructive-foreground: ${colors.destructiveForeground};

    --border: ${colors.border};
    --input: ${colors.input};
    --ring: ${colors.ring};
  `.trim();
}

/**
 * Generates the complete CSS for the active theme
 */
export function generateThemeCss(): string {
  return `
/* Theme: ${activeTheme.displayName} */
/* Generated from src/themes/${activeTheme.name}.ts */

:root {
  ${colorsToCssVariables(activeTheme.light)}
}

[data-theme="dark"] {
  ${colorsToCssVariables(activeTheme.dark)}
}
  `.trim();
}

/**
 * Gets the light theme CSS variables
 */
export function getLightThemeCss(): string {
  return colorsToCssVariables(activeTheme.light);
}

/**
 * Gets the dark theme CSS variables
 */
export function getDarkThemeCss(): string {
  return colorsToCssVariables(activeTheme.dark);
}
