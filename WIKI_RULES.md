# Personal LLM Wiki Rules

## Purpose

Turn curated source material into a persistent, reviewable, and cited knowledge
base. The wiki is derived knowledge; it is never the source of truth.

## Repository layers

- `raw/`: original source material selected by the user. It is immutable.
- `wiki/`: synthesized pages maintained by the agent and reviewed by the user.
- `index.md`: catalog of wiki pages, organized by domain.
- `log.md`: append-only record of approved operations.
- `templates/`: page templates. Templates are not evidence.

## Domain boundaries

Initial domains are `work`, `history`, and `culture`.

- Keep pages and sources inside their domain.
- Cross-domain links are allowed when useful, but label the connection as an
  interpretation unless a source explicitly supports it.
- Never use a cultural or historical source as evidence for a work claim merely
  because the topics are related.
- Sensitive work material should be moved to a separate repository before it is
  ingested if it requires different access or model-data controls.

## Source rules

1. Never modify, rename, or delete files under `raw/` unless the user explicitly
   asks for that exact filesystem operation.
2. Every factual wiki claim must cite an original source under `raw/`.
3. Cite the narrowest available locator: page, section, paragraph, timestamp, or
   line range.
4. Use this inline form: `[Source: raw/<domain>/<file>, <locator>]`.
5. A wiki page, chat answer, or model-generated summary is not an original
   source and must not be cited as one.
6. Separate sourced facts from agent interpretation and from user opinion.
7. If a source cannot be read reliably, record the limitation instead of
   guessing.

## Ingest workflow

Ingestion has two mandatory phases.

### Phase 1: propose

Before editing `wiki/`, `index.md`, or `log.md`:

1. Read the new source completely when practical.
2. Identify its domain, key claims, entities, concepts, dates, and limitations.
3. Search existing wiki pages for relevant material.
4. Present an update plan listing every page to create or modify, important
   claims to add, contradictions, and open questions.
5. Wait for explicit user approval.

### Phase 2: apply

After approval:

1. Apply only the approved changes.
2. Prefer updating an existing topic page over creating a source-by-source
   summary island.
3. Preserve meaningful earlier information and describe superseded claims.
4. Add or update related `[[Wiki Links]]`.
5. Update `index.md` for created, renamed, or materially changed pages.
6. Append a dated operation entry to `log.md`; never rewrite old log entries.
7. Report exactly which files changed and any unresolved uncertainty.

## Query workflow

1. Read `index.md` first, then inspect relevant wiki pages and original sources.
2. Answer with citations to original files under `raw/`.
3. State when the wiki lacks enough evidence.
4. Mention material contradictions or potentially outdated information.
5. Do not save an answer into the wiki unless the user explicitly asks.

## Lint workflow

Check for:

- factual claims without original-source citations;
- broken source paths or wiki links;
- contradictions and superseded claims;
- duplicated or overlapping pages;
- orphan pages;
- important concepts without pages;
- derived pages cited as evidence;
- stale information and unresolved questions.

Report findings before making changes. Do not silently resolve semantic
contradictions.

## Page conventions

- Use UTF-8 Markdown.
- Use descriptive lowercase kebab-case filenames.
- Put one primary subject on each page.
- Start with YAML frontmatter based on `templates/wiki-page.md`.
- Write user-facing synthesis in Hebrew by default. Preserve important original
  terminology in parentheses when translation could reduce precision.
- Keep summaries concise and make uncertainty visible.

