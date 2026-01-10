import type { SkillCategory } from "@/components/Skills.astro";
import type { TimelineItem } from "@/components/Timeline.astro";

// Work Experience
export const EXPERIENCE: TimelineItem[] = [
  {
    title: "Senior Full Stack Developer",
    organization: "Tech Company Inc.",
    location: "Remote",
    startDate: "Jan 2024",
    endDate: undefined,
    description: [
      "Led development of microservices architecture serving 100K+ users",
      "Mentored junior developers and conducted code reviews",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
    ],
  },
  {
    title: "Full Stack Developer",
    organization: "StartupXYZ",
    location: "Bangalore, India",
    startDate: "Jun 2022",
    endDate: "Dec 2023",
    description: [
      "Built RESTful APIs and React-based web applications",
      "Optimized database queries improving response time by 40%",
      "Collaborated with design team to implement pixel-perfect UIs",
    ],
  },
  {
    title: "Frontend Developer",
    organization: "Digital Agency",
    location: "Mumbai, India",
    startDate: "Jan 2021",
    endDate: "May 2022",
    description: [
      "Developed responsive websites for 20+ clients",
      "Implemented modern frontend frameworks and build tools",
      "Ensured cross-browser compatibility and accessibility standards",
    ],
  },
];

// Education
export const EDUCATION: TimelineItem[] = [
  {
    title: "Bachelor of Technology in Computer Science",
    organization: "University Name",
    location: "India",
    startDate: "2017",
    endDate: "2021",
    description: [
      "Graduated with First Class Honors",
      "Specialized in Web Technologies and Database Systems",
      "Led university coding club and organized hackathons",
    ],
  },
];

// Skills
export const SKILLS: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Go", "HTML", "CSS"],
  },
  {
    name: "Frameworks & Libraries",
    skills: ["React", "Vue", "Astro", "Node.js", "Express", "Next.js", "Svelte"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis", "SQLite"],
  },
  {
    name: "Tools & DevOps",
    skills: ["Git", "Docker", "AWS", "Vercel", "GitHub Actions", "Linux"],
  },
];
