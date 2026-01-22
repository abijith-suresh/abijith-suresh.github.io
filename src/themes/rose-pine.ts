/**
 * Rose Pine Theme
 * https://rosepinetheme.com
 *
 * A beautiful, soft color palette with three variants:
 * - Main: The original dark variant
 * - Moon: A slightly brighter dark variant
 * - Dawn: The light variant
 *
 * This implementation uses Main for dark mode and Dawn for light mode.
 */

import type { ThemeDefinition } from "./types";

const rosePine: ThemeDefinition = {
  name: "rose-pine",
  displayName: "Rosé Pine",

  // Light theme uses Dawn variant
  light: {
    // Backgrounds
    background: "#faf4ed", // Base
    foreground: "#575279", // Text

    card: "#fffaf3", // Surface
    cardForeground: "#575279", // Text

    popover: "#f2e9e1", // Overlay
    popoverForeground: "#575279", // Text

    // Primary accent - using Rose for primary actions
    primary: "#d7827e", // Rose
    primaryForeground: "#faf4ed", // Base

    // Secondary - muted background
    secondary: "#f2e9e1", // Overlay
    secondaryForeground: "#575279", // Text

    // Muted elements
    muted: "#f2e9e1", // Overlay
    mutedForeground: "#9893a5", // Muted

    // Accent - subtle highlight
    accent: "#f4ede8", // Highlight Low
    accentForeground: "#575279", // Text

    // Destructive - using Love
    destructive: "#b4637a", // Love
    destructiveForeground: "#faf4ed", // Base

    // Borders and inputs
    border: "#dfdad9", // Highlight Med
    input: "#dfdad9", // Highlight Med
    ring: "#d7827e", // Rose
  },

  // Dark theme uses Main variant
  dark: {
    // Backgrounds
    background: "#191724", // Base
    foreground: "#e0def4", // Text

    card: "#1f1d2e", // Surface
    cardForeground: "#e0def4", // Text

    popover: "#26233a", // Overlay
    popoverForeground: "#e0def4", // Text

    // Primary accent - using Rose for primary actions
    primary: "#ebbcba", // Rose
    primaryForeground: "#191724", // Base

    // Secondary - muted background
    secondary: "#26233a", // Overlay
    secondaryForeground: "#e0def4", // Text

    // Muted elements
    muted: "#26233a", // Overlay
    mutedForeground: "#6e6a86", // Muted

    // Accent - subtle highlight
    accent: "#21202e", // Highlight Low
    accentForeground: "#e0def4", // Text

    // Destructive - using Love
    destructive: "#eb6f92", // Love
    destructiveForeground: "#191724", // Base

    // Borders and inputs
    border: "#403d52", // Highlight Med
    input: "#403d52", // Highlight Med
    ring: "#ebbcba", // Rose
  },
};

export default rosePine;
