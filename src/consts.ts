// Site Configuration
export const SITE = {
  // Basic Info
  title: "Abijith S",
  description: "Personal portfolio and blog of Abijith S - developer, builder, writer.",
  author: "Abijith S",
  domain: "abijith.sh",
  url: "https://abijith.sh",
  locale: "en-US",

  // Hero Section
  greeting: "Hey, I'm Abijith",
  role: "Software Developer",
  heroIntro:
    "I'm a backend-focused developer who enjoys building things that work well. Currently crafting web applications with Java and Spring Boot, while exploring the broader world of software development.",
  whatIDo:
    "I spend most of my time working on backend systems, but I'm comfortable across the stack. I like solving problems, writing clean code, and learning new technologies. When I'm not coding, I'm probably gaming, watching anime, or reading something interesting.",

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
  twitter: "https://x.com/abijith_sh",
  linkedin: "https://linkedin.com/in/abijith-suresh",
} as const;

// Author Information
export const AUTHOR = {
  name: "Abijith S",
  fullName: "Abijith Suresh",
  tagline: "Developer, builder, writer.",
  avatar: "/avatar.jpg",
  twitterHandle: "@abijith_sh",

  // About Page Content
  aboutIntro:
    "I'm Abijith, a software developer based in Kochi, India. I've been working professionally for about a year and a half, primarily with Java and Spring Boot on the backend side of things.",
  aboutJourney:
    "I got into programming because I liked the idea of building things from scratch. What started as curiosity turned into a career, and I'm still figuring things out as I go. I've worked with React, Python, and TypeScript along the way, though backend development is where I feel most at home.",
  aboutBlog:
    "This blog is where I document my journey—the things I learn, the problems I solve, and occasional thoughts on tech and life. It's mostly for my future self, but if you find something useful here, that's a bonus.",
  aboutInterests:
    "Outside of work, I'm usually gaming, watching anime or TV shows, reading, or catching up on movies. I like stories in all their forms.",
} as const;
