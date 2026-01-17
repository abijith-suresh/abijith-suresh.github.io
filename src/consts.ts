// Site Configuration
export const SITE = {
  title: "Abijith S",
  description: "Personal portfolio and blog of Abijith S - developer, builder, writer.",
  author: "Abijith S",
  domain: "abijith.sh",
  url: "https://abijith.sh",
  locale: "en-US",

  // Feature Configuration
  postsPerPage: 10,
  projectsPerPage: 12,
  featuredProjectCount: 4,
} as const;

// Navigation Links
export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

// Social Links
export const SOCIAL_LINKS = {
  github: "https://github.com/abijith-suresh",
  twitter: "https://x.com/abijith_sh",
  bluesky: "https://bsky.app/profile/yourusername.bsky.social",
  linkedin: "https://linkedin.com/in/abijith-suresh",
} as const;

// Personal Information
export const AUTHOR = {
  name: "Abijith S",
  fullName: "Abijith Suresh",
  tagline: "Developer, builder, writer.",
  bio: "I build things and write about them.",
  avatar: "/avatar.jpg",
  location: "India",
} as const;

// Type exports for better TypeScript support
export type NavLink = (typeof NAV_LINKS)[number];
export type SocialLink = keyof typeof SOCIAL_LINKS;
