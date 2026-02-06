// Site Configuration
export const SITE = {
  // Basic Info
  title: "Abijith S",
  description: "Personal portfolio and blog of Abijith S - developer, builder, writer.",
  author: "Abijith S",
  domain: "abijith-suresh.github.io",
  url: "https://abijith-suresh.github.io",
  locale: "en-US",

  // Hero Section
  greeting: "Abijith Suresh",
  role: "Software Developer",
  heroIntro:
    "I build things for the web, mostly on the backend with Java and Spring Boot. I like clean code, good documentation, and solving problems that matter. Outside of work, I'm into gaming, anime, and stories in all their forms.",

  // Pagination
  postsPerPage: 10,
  projectsPerPage: 12,
} as const;

// Navigation
export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

// Social Links
export const SOCIAL_LINKS = {
  github: "https://github.com/abijith-suresh",
  x: "https://x.com/abijith_sh",
  linkedin: "https://linkedin.com/in/abijith-suresh",
  bluesky: "https://bsky.app/profile/abijith.bsky.social",
} as const;

// Author Information
export const AUTHOR = {
  name: "Abijith S",
  fullName: "Abijith Suresh",
  tagline: "Developer, builder, writer.",
  avatar: "/avatar.jpg",
  twitterHandle: "@abijith_sh", // Kept for SEO compatibility (twitter:creator metadata)

  // About Page Content
  aboutNarrative:
    "I'm Abijith, a software developer based in Kochi, India. I've been working professionally for about a year and a half, primarily with Java and Spring Boot on the backend side of things. I got into programming because I liked the idea of building things from scratch — what started as curiosity turned into a career, and I'm still figuring things out as I go. Along the way I've picked up React, Python, and TypeScript, though backend development is where I feel most at home.\n\nThis site is where I document my journey — the things I learn, the problems I solve, and occasional thoughts on tech and life. It's mostly for my future self, but if you find something useful here, that's a bonus.",

  // Interests (for tag pills on about page)
  interests: ["Gaming", "Anime", "Reading", "Movies & TV"],
} as const;
