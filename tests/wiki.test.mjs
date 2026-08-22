import test from "node:test";
import assert from "node:assert/strict";

import {
  extractMarkdownLinks,
  isValidSlug,
  lintWiki,
  parseFrontmatter,
  toTitle,
} from "../tools/wiki.mjs";

test("validates canonical slugs", () => {
  assert.equal(isValidSlug("payments-platform"), true);
  assert.equal(isValidSlug("project-2"), true);
  assert.equal(isValidSlug("Payments Platform"), false);
  assert.equal(isValidSlug("bad--slug"), false);
});

test("converts slugs to titles", () => {
  assert.equal(toTitle("database-indexes"), "Database Indexes");
});

test("parses simple frontmatter", () => {
  const parsed = parseFrontmatter("---\nid: example\nsources: []\n---\n# Title\n");
  assert.deepEqual(parsed, { id: "example", sources: "[]" });
});

test("extracts regular Markdown links and ignores images", () => {
  const links = extractMarkdownLinks("[one](a.md) ![image](image.png) [two](b.md#part)");
  assert.deepEqual(links, ["a.md", "b.md#part"]);
});

test("starter wiki passes lint", () => {
  const result = lintWiki({ quiet: true });
  assert.deepEqual(result.errors, []);
});

