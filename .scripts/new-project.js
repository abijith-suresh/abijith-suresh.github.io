#!/usr/bin/env node

/**
 * New Project Generator
 *
 * Creates a new project from template with user input.
 *
 * Usage:
 *   bun run new:project
 *   node .scripts/new-project.js
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
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
 * Main function
 */
async function main() {
  console.log("\n🚀 Create New Project\n");

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

  const githubUrl = await prompt("GitHub URL (optional): ");
  const demoUrl = await prompt("Demo URL (optional): ");

  // Generate slug and paths
  const slug = slugify(title);
  const targetDir = join(process.cwd(), "src", "content", "projects");
  const targetFile = join(targetDir, `${slug}.md`);

  // Check if file already exists
  if (existsSync(targetFile)) {
    console.error(`❌ Error: File already exists: ${targetFile}`);
    process.exit(1);
  }

  // Read template
  const templatePath = join(__dirname, "..", ".templates", "project.md");

  if (!existsSync(templatePath)) {
    console.error(`❌ Error: Template not found: ${templatePath}`);
    process.exit(1);
  }

  let template = readFileSync(templatePath, "utf-8");

  // Replace placeholders
  template = template.replace(/\{\{TITLE\}\}/g, title);
  template = template.replace(/\{\{DESCRIPTION\}\}/g, description);
  template = template.replace(/\{\{DATE_FULL\}\}/g, getCurrentDate());

  // Handle optional URLs
  if (githubUrl) {
    template = template.replace(/\{\{GITHUB_URL\}\}/g, githubUrl);
    template = template.replace(
      /- \*\*Repository\*\*: \[GitHub\]\(\{\{GITHUB_URL\}\}\)/g,
      `- **Repository**: [GitHub](${githubUrl})`
    );
  } else {
    template = template.replace(/- \*\*Repository\*\*: \[GitHub\]\(\{\{GITHUB_URL\}\}\)/g, "");
  }

  if (demoUrl) {
    template = template.replace(/\{\{DEMO_URL\}\}/g, demoUrl);
    template = template.replace(
      /- \*\*Live Demo\*\*: \[Demo\]\(\{\{DEMO_URL\}\}\)/g,
      `- **Live Demo**: [Demo](${demoUrl})`
    );
  } else {
    template = template.replace(/- \*\*Live Demo\*\*: \[Demo\]\(\{\{DEMO_URL\}\}\)/g, "");
  }

  // Write file
  writeFileSync(targetFile, template, "utf-8");

  console.log("\n✅ Project created successfully!");
  console.log(`\n📄 File: ${targetFile}`);
  console.log(`\n🚀 Next steps:`);
  console.log(`   1. Edit the file: ${targetFile}`);
  console.log(`   2. Add your project details`);
  console.log(`   3. Run 'bun run dev' to preview`);

  rl.close();
}

main().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
