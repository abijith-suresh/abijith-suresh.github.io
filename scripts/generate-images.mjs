#!/usr/bin/env node
/* eslint-disable no-console, no-undef */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import { join } from "path";

const publicDir = "public";

// Ensure public directory exists
await mkdir(publicDir, { recursive: true });

// 1. Generate OG Default Image (1200x630)
console.log("Generating OG default image...");
const ogSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#grad)"/>
  <text x="600" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">Abijith S</text>
  <text x="600" y="360" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="rgba(255,255,255,0.9)" text-anchor="middle">Developer, builder, writer.</text>
</svg>
`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, "og-default.png"));
console.log("✓ Created public/og-default.png");

// 2. Generate Avatar (400x400)
console.log("Generating avatar placeholder...");
const avatarSvg = `
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#6366f1"/>
  <text x="200" y="250" font-family="system-ui, -apple-system, sans-serif" font-size="160" font-weight="bold" fill="white" text-anchor="middle">AS</text>
</svg>
`;

await sharp(Buffer.from(avatarSvg)).jpeg({ quality: 95 }).toFile(join(publicDir, "avatar.jpg"));
console.log("✓ Created public/avatar.jpg");

// 3. Generate Blog Placeholder (1200x630)
console.log("Generating blog placeholder...");
const blogSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#475569"/>
  <text x="600" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="48" fill="#94a3b8" text-anchor="middle">Blog Post</text>
</svg>
`;

await sharp(Buffer.from(blogSvg))
  .jpeg({ quality: 90 })
  .toFile(join(publicDir, "placeholder-blog.jpg"));
console.log("✓ Created public/placeholder-blog.jpg");

// 4. Generate Project Placeholder (1200x630)
console.log("Generating project placeholder...");
const projectSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1e293b"/>
  <text x="600" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="48" fill="#64748b" text-anchor="middle">Project</text>
</svg>
`;

await sharp(Buffer.from(projectSvg))
  .jpeg({ quality: 90 })
  .toFile(join(publicDir, "placeholder-project.jpg"));
console.log("✓ Created public/placeholder-project.jpg");

// 5. Generate Favicons
console.log("Generating favicon set...");

// Base SVG for favicon
const faviconBaseSvg = `
<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="#6366f1" rx="4"/>
  <text x="16" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">AS</text>
</svg>
`;

// 16x16 favicon
await sharp(Buffer.from(faviconBaseSvg))
  .resize(16, 16)
  .png()
  .toFile(join(publicDir, "favicon-16x16.png"));
console.log("✓ Created public/favicon-16x16.png");

// 32x32 favicon
await sharp(Buffer.from(faviconBaseSvg))
  .resize(32, 32)
  .png()
  .toFile(join(publicDir, "favicon-32x32.png"));
console.log("✓ Created public/favicon-32x32.png");

// 180x180 Apple touch icon
const appleTouchSvg = `
<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="#6366f1" rx="20"/>
  <text x="90" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="90" font-weight="bold" fill="white" text-anchor="middle">AS</text>
</svg>
`;

await sharp(Buffer.from(appleTouchSvg))
  .resize(180, 180)
  .png()
  .toFile(join(publicDir, "apple-touch-icon.png"));
console.log("✓ Created public/apple-touch-icon.png");

console.log("\n✅ All placeholder images generated successfully!");
