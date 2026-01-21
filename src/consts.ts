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
  username: "abijith",
  tagline: "Developer, builder, writer.",
  role: "Full Stack Developer",
  currentWork: "building scalable web applications and open source tools",
  bio: "I'm a passionate developer who loves building things for the web. With several years of experience in full-stack development, I specialize in creating performant, user-friendly applications using modern web technologies.",
  longBio:
    "I enjoy working on challenging problems and learning new technologies. When I'm not coding, you can find me contributing to open source, writing technical articles, or exploring new frameworks and tools.",
  avatar: "/avatar.jpg",
  location: "India",
  usernameOrigin:
    "My username 'abijith' is simply my first name. I prefer to keep things simple and authentic in the digital world.",
} as const;

// Type exports for better TypeScript support
export type NavLink = (typeof NAV_LINKS)[number];
export type SocialLink = keyof typeof SOCIAL_LINKS;
