#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(TOOL_DIR, "..");

const TYPES = {
  project: {
    template: "project.md",
    directory: "shared/projects",
    index: "shared/projects/index.md",
  },
  job: {
    template: "job.md",
    directory: "domains/interviews/jobs",
    index: "domains/interviews/jobs/index.md",
  },
  "coding-question": {
    template: "coding-question.md",
    directory: "domains/interviews/coding",
    index: "domains/interviews/coding/index.md",
  },
  "mock-interview": {
    template: "mock-interview.md",
    directory: "domains/interviews/mock-interviews",
    index: "domains/interviews/mock-interviews/index.md",
    datedFilename: true,
  },
  "knowledge-gap": {
    template: "knowledge-gap.md",
    directory: "domains/interviews/gaps",
    index: "domains/interviews/gaps/index.md",
  },
};

const REQUIRED_FIELDS = ["id", "type", "status", "updated", "sources"];
const SYNTHESIZED_PREFIXES = ["shared/", "domains/"];

export function today(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function toTitle(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function isValidSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function parseFrontmatter(content) {
  if (!content.startsWith("---\n")) return null;
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) return null;

  const fields = {};
  for (const line of content.slice(4, end).split("\n")) {
    const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (match) fields[match[1]] = match[2].trim();
  }
  return fields;
}

export function extractMarkdownLinks(content) {
  const links = [];
  const pattern = /(?<!!)\[[^\]]*\]\(([^)]+)\)/g;
  for (const match of content.matchAll(pattern)) links.push(match[1].trim());
  return links;
}

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".git", "node_modules", ".obsidian"].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else files.push(absolute);
  }
  return files;
}

function relative(file) {
  return path.relative(ROOT, file).split(path.sep).join("/");
}

function renderTemplate(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? "");
}

function appendIndexEntry(indexFile, title, filename, date) {
  let content = fs.readFileSync(indexFile, "utf8");
  const emptyLine = /^No .* (?:yet|added yet|created yet|recorded yet)\.\s*$/m;
  content = content.replace(emptyLine, "").trimEnd();
  content += `\n\n- [${title}](${filename}) — created ${date}.\n`;
  fs.writeFileSync(indexFile, content);
}

function createPage(type, slug) {
  const config = TYPES[type];
  if (!config) {
    throw new Error(`Unknown type '${type}'. Valid types: ${Object.keys(TYPES).join(", ")}`);
  }
  if (!isValidSlug(slug)) {
    throw new Error("Slug must use lowercase letters, numbers, and single hyphens.");
  }

  const date = today();
  const filename = `${slug}${config.datedFilename ? `-${date}` : ""}.md`;
  const destination = path.join(ROOT, config.directory, filename);
  if (fs.existsSync(destination)) throw new Error(`Page already exists: ${relative(destination)}`);

  const template = fs.readFileSync(path.join(ROOT, "templates", config.template), "utf8");
  const rendered = renderTemplate(template, { slug, title: toTitle(slug), date });
  fs.writeFileSync(destination, rendered);
  appendIndexEntry(path.join(ROOT, config.index), toTitle(slug), filename, date);

  console.log(`Created ${relative(destination)}`);
  console.log(`Updated ${config.index}`);
}

function shouldRequireFrontmatter(file) {
  const rel = relative(file);
  if (!SYNTHESIZED_PREFIXES.some((prefix) => rel.startsWith(prefix))) return false;
  return !rel.endsWith("/index.md") && !rel.endsWith("/AGENTS.md");
}

function checkLink(file, link) {
  if (/^(?:[a-z]+:|#|mailto:)/i.test(link)) return null;
  const clean = decodeURIComponent(link.split("#")[0]);
  if (!clean) return null;
  const target = path.resolve(path.dirname(file), clean);
  return fs.existsSync(target) ? null : `broken link '${link}'`;
}

export function lintWiki({ quiet = false } = {}) {
  const markdown = walk(ROOT).filter((file) => file.endsWith(".md"));
  const errors = [];
  const warnings = [];

  for (const file of markdown) {
    const rel = relative(file);
    const content = fs.readFileSync(file, "utf8");

    if (shouldRequireFrontmatter(file)) {
      const frontmatter = parseFrontmatter(content);
      if (!frontmatter) {
        errors.push(`${rel}: missing frontmatter`);
      } else {
        for (const field of REQUIRED_FIELDS) {
          if (!(field in frontmatter)) errors.push(`${rel}: missing '${field}'`);
        }
        if (frontmatter.updated && !/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.updated)) {
          errors.push(`${rel}: 'updated' must use YYYY-MM-DD`);
        }
        if (frontmatter.sources === "[]") {
          warnings.push(`${rel}: no sources recorded yet`);
        }
      }
    }

    for (const link of extractMarkdownLinks(content)) {
      const issue = checkLink(file, link);
      if (issue) errors.push(`${rel}: ${issue}`);
    }
  }

  if (!quiet) {
    for (const warning of warnings) console.warn(`WARN  ${warning}`);
    for (const error of errors) console.error(`ERROR ${error}`);
    console.log(`Checked ${markdown.length} Markdown files: ${errors.length} errors, ${warnings.length} warnings.`);
  }
  return { errors, warnings, checked: markdown.length };
}

function printStats() {
  const markdown = walk(ROOT).filter((file) => file.endsWith(".md"));
  const count = (prefix) => markdown.filter((file) => relative(file).startsWith(prefix)).length;
  const countNonIndex = (prefix) =>
    markdown.filter((file) => relative(file).startsWith(prefix) && !file.endsWith("index.md")).length;

  console.log(`Markdown files:      ${markdown.length}`);
  console.log(`Raw sources:         ${count("raw/") - 1}`);
  console.log(`Shared pages:        ${countNonIndex("shared/")}`);
  console.log(`Interview artifacts: ${countNonIndex("domains/interviews/") - 1}`);
  console.log(`Mock interviews:     ${countNonIndex("domains/interviews/mock-interviews/")}`);
  console.log(`Knowledge gaps:      ${countNonIndex("domains/interviews/gaps/")}`);
  console.log(`Inbox items:         ${count("inbox/") - 1}`);
}

function help() {
  console.log(`Self Wiki CLI

Usage:
  wiki new <type> <slug>
  wiki lint
  wiki stats
  wiki help

Page types:
  ${Object.keys(TYPES).join("\n  ")}

Examples:
  wiki new project payments-platform
  wiki new job backend-engineer-acme
  wiki new coding-question lru-cache
  wiki new mock-interview project-payments-platform
  wiki new knowledge-gap database-indexes`);
}

export function main(args = process.argv.slice(2)) {
  const [command, ...rest] = args;
  try {
    if (!command || command === "help" || command === "--help") return help();
    if (command === "new") {
      if (rest.length !== 2) throw new Error("Usage: wiki new <type> <slug>");
      return createPage(rest[0], rest[1]);
    }
    if (command === "lint") {
      const result = lintWiki();
      if (result.errors.length) process.exitCode = 1;
      return;
    }
    if (command === "stats") return printStats();
    throw new Error(`Unknown command '${command}'. Run 'wiki help'.`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : "";
if (import.meta.url === invokedPath) main();

