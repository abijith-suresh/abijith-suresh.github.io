#!/usr/bin/env node

/**
 * New Blog Post Generator
 *
 * Creates a new blog post from templates with user input.
 *
 * Usage:
 *   bun run new:blog
 *   node .scripts/new-blog.js
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Prompt user for input
 */
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * Convert title to kebab-case slug
 */
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .substring(0, 100); // Limit length
}

/**
 * Format date as YYYY-MM-DD
 */
function getCurrentDate() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * Get current year for directory path
 */
function getCurrentYear() {
  return new Date().getFullYear().toString();
}

/**
 * Main function
 */
async function main() {
  console.log("\n📝 Create New Blog Post\n");

  // Get user input
  const title = await prompt("Title: ");

  if (!title) {
    console.error("❌ Error: Title is required");
    process.exit(1);
  }

  const description = await prompt("Description: ");

  if (!description) {
    console.error("❌ Error: Description is required");
    process.exit(1);
  }

  const format = await prompt("Format (md/mdx) [md]: ");
  const fileExtension = format.toLowerCase() === "mdx" ? "mdx" : "md";

  // Generate slug and paths
  const slug = slugify(title);
  const year = getCurrentYear();
  const targetDir = join(process.cwd(), "src", "content", "blog", year);
  const targetFile = join(targetDir, `${slug}.${fileExtension}`);

  // Check if file already exists
  if (existsSync(targetFile)) {
    console.error(`❌ Error: File already exists: ${targetFile}`);
    process.exit(1);
  }

  // Read template
  const templatePath = join(__dirname, "..", ".templates", `blog-post.${fileExtension}`);

  if (!existsSync(templatePath)) {
    console.error(`❌ Error: Template not found: ${templatePath}`);
    process.exit(1);
  }

  let template = readFileSync(templatePath, "utf-8");

  // Replace placeholders
  template = template.replace(/\{\{TITLE\}\}/g, title);
  template = template.replace(/\{\{DESCRIPTION\}\}/g, description);
  template = template.replace(/\{\{DATE\}\}/g, getCurrentDate());

  // Ensure directory exists
  await mkdir(targetDir, { recursive: true });

  // Write file
  writeFileSync(targetFile, template, "utf-8");

  console.log("\n✅ Blog post created successfully!");
  console.log(`\n📄 File: ${targetFile}`);
  console.log(`📋 Draft: true (set to false when ready to publish)`);
  console.log(`\n🚀 Next steps:`);
  console.log(`   1. Edit the file: ${targetFile}`);
  console.log(`   2. Add your content`);
  console.log(`   3. Set draft: false when ready`);
  console.log(`   4. Run 'bun run dev' to preview`);

  rl.close();
}

main().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
