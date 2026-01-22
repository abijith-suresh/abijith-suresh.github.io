/**
 * Theme Type Definitions
 *
 * Defines the structure for theme configurations.
 * Each theme must provide colors for both light and dark modes.
 */

/**
 * Color values for a single theme mode (light or dark)
 */
export interface ThemeColors {
  // Backgrounds
  background: string;
  foreground: string;

  card: string;
  cardForeground: string;

  popover: string;
  popoverForeground: string;

  // Primary accent color
  primary: string;
  primaryForeground: string;

  // Secondary color
  secondary: string;
  secondaryForeground: string;

  // Muted elements (disabled, subtle text)
  muted: string;
  mutedForeground: string;

  // Accent color for highlights
  accent: string;
  accentForeground: string;

  // Destructive actions (errors, delete)
  destructive: string;
  destructiveForeground: string;

  // Borders and inputs
  border: string;
  input: string;
  ring: string;
}

/**
 * Complete theme definition with both light and dark variants
 */
export interface ThemeDefinition {
  /** Unique identifier for the theme (used in config) */
  name: string;
  /** Human-readable display name */
  displayName: string;
  /** Colors for light mode */
  light: ThemeColors;
  /** Colors for dark mode */
  dark: ThemeColors;
}
