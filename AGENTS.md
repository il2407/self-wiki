# Self Wiki Operating Protocol

## Mission

Maintain a source-grounded, durable personal knowledge base. Help the user
explore, learn, and prepare without inventing personal history, project facts,
metrics, decisions, or outcomes.

## Start of every task

1. Classify the task as `ingest`, `query`, `practice`, `reflect`, or `lint`.
2. Determine the active domain.
3. Read the active domain's `AGENTS.md` and `index.md` before substantive work.
4. Read the smallest relevant set of shared pages and raw sources.
5. State material uncertainty instead of silently resolving it.

Interview-related tasks use `domains/interviews/` as the active domain.

## Knowledge layers

- `inbox/`: unprocessed material. Content here is not yet trusted or indexed.
- `raw/`: immutable source material. Never rewrite, normalize, or delete an
  existing raw source. Add a new dated source when a correction is needed.
- `shared/`: synthesized knowledge that can serve multiple domains.
- `domains/`: domain-specific analysis, exercises, and derived artifacts.
- `templates/`: canonical page shapes.

Do not copy a shared fact into several domain pages when a link is sufficient.

## Claim policy

Material claims about the user, an employer, a project, a metric, or a decision
must have one of these statuses:

- `verified`: supported by a cited source or explicitly confirmed by the user.
- `recalled`: stated from memory but not independently verified.
- `inferred`: reasoned from other information; not a historical fact.
- `unknown`: unresolved or missing.
- `sanitized`: deliberately generalized to protect confidential information.

Never promote `recalled` or `inferred` to `verified` without evidence or explicit
user confirmation. Never improve a story by fabricating scale, ownership,
alternatives, incidents, or business impact.

## Source policy

- Link synthesized claims to local raw sources when possible.
- Cite a section or heading when the source is long.
- Preserve disagreements between sources.
- Keep proposed interview phrasing separate from historical facts.
- Never ingest secrets, credentials, personal customer data, or proprietary
  source code. Employer material may be stored only after the user explicitly
  confirms they are authorized to retain it and the repository visibility is
  appropriate. Record that authorization with the source; otherwise prefer a
  sanitized summary.

## Operations

### Ingest

1. Preserve the original in the appropriate `raw/` directory.
2. Extract claims and assign claim statuses.
3. Ask the user about consequential ambiguity; record minor gaps as `unknown`.
4. Update an existing shared page before creating a duplicate.
5. Update the relevant index.
6. Append a concise entry to `log.md`.

### Query

1. Use indexes to locate relevant pages.
2. Prefer shared knowledge, then consult raw evidence as needed.
3. Distinguish sourced facts, user recollections, and analysis in the answer.
4. Persist only conclusions that will be useful again.

### Practice

1. Follow the active domain workflow.
2. Do not reveal hints or model answers before the user attempts the task unless
   explicitly requested.
3. Separate the user's answer from feedback and from an improved answer.
4. Record durable gaps and repeated mistakes.

### Lint

Check for unsupported claims, broken links, missing metadata, stale pages,
contradictions, duplicate concepts, orphan pages, and unresolved high-impact
unknowns. Do not silently rewrite uncertain content during lint.

## Editing conventions

- Use Markdown and relative links.
- Use `YYYY-MM-DD` dates.
- Use lowercase kebab-case filenames.
- Preserve raw sources exactly.
- Prefer small, focused pages over long catch-all documents.
- Update `updated` in frontmatter after a substantive edit.
- Append to `log.md`; do not rewrite its history.
