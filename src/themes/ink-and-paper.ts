import type { ThemeDefinition } from "./types";

const inkAndPaper: ThemeDefinition = {
  name: "ink-and-paper",
  displayName: "Ink & Paper",

  light: {
    background: "#faf8f5",
    foreground: "#2c2c2c",

    card: "#f3f0eb",
    cardForeground: "#2c2c2c",

    popover: "#ede9e3",
    popoverForeground: "#2c2c2c",

    primary: "#2c2c2c",
    primaryForeground: "#faf8f5",

    secondary: "#f3f0eb",
    secondaryForeground: "#2c2c2c",

    muted: "#f3f0eb",
    mutedForeground: "#8a8580",

    accent: "#ede9e3",
    accentForeground: "#2c2c2c",

    destructive: "#c4453a",
    destructiveForeground: "#faf8f5",

    border: "#e4dfd8",
    input: "#e4dfd8",
    ring: "#4a8f8c",
  },

  dark: {
    background: "#1a1a1d",
    foreground: "#e8e4df",

    card: "#222225",
    cardForeground: "#e8e4df",

    popover: "#2a2a2e",
    popoverForeground: "#e8e4df",

    primary: "#e8e4df",
    primaryForeground: "#1a1a1d",

    secondary: "#222225",
    secondaryForeground: "#e8e4df",

    muted: "#2a2a2e",
    mutedForeground: "#8a8580",

    accent: "#222225",
    accentForeground: "#e8e4df",

    destructive: "#e05a4f",
    destructiveForeground: "#1a1a1d",

    border: "#363639",
    input: "#363639",
    ring: "#6db3b0",
  },
};

export default inkAndPaper;
