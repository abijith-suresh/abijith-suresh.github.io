// Site Configuration
export const SITE = {
  title: "Abijith S",
  description: "Personal portfolio and blog of Abijith S - developer, builder, writer.",
  author: "Abijith S",
  domain: "abijith.sh",
  url: "https://abijith.sh",
  locale: "en-US",

  // Hero Section
  headline: "Full Stack Developer",
  subheadline: "Working on scalable web applications and open source projects from Kochi, India.",

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
  username: "abijith",
  tagline: "Developer, builder, writer.",
  role: "Full Stack Developer",
  currentWork: "working on web applications and exploring modern technologies",
  bio: "I build web applications and write about technology. I enjoy working with modern frameworks, learning new tools, and contributing to open source.",
  longBio:
    "When I'm not coding, I spend time exploring new technologies, writing technical articles, and working on side projects. I'm always interested in connecting with other developers and collaborating on interesting ideas.",
  avatar: "/avatar.jpg",
  location: "Kochi, Kerala, India",
  usernameOrigin:
    "My username 'abijith' is simply my first name. I prefer to keep things simple and authentic in the digital world.",
} as const;

// Type exports for better TypeScript support
export type NavLink = (typeof NAV_LINKS)[number];
export type SocialLink = keyof typeof SOCIAL_LINKS;
