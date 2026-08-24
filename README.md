# My Self Wiki

This is a personal, multidisciplinary knowledge repository designed for use with Codex or Claude Code and for viewing in Obsidian. Original sources are stored separately; the agent builds a synthesized wiki on top of them, with references to the sources.

## Structure

```text
self-wiki/
├── raw/                 # Original sources — never modify
│   ├── work/
│   ├── history/
│   └── culture/
├── wiki/                # Synthesized knowledge maintained by the agent
│   ├── work/
│   ├── history/
│   └── culture/
├── templates/
├── AGENTS.md            # Entry point for Codex
├── CLAUDE.md            # Entry point for Claude Code
├── WIKI_RULES.md        # Shared operating rules
├── index.md             # Content catalog
└── log.md               # Activity history
```

## Ingesting the First Source

1. Copy one source into the appropriate folder under `raw/`.
2. Open this folder as a project in Codex or as a vault in Obsidian.
3. Write the following to the agent:

> Read `WIKI_RULES.md`. Review the new source under `raw/`. Perform only the proposal stage: present the source’s key points, its limitations, and a precise plan of the pages you will create or update. Do not modify the wiki yet.

4. Review the plan. If it is correct, write:

> I approve the plan. Apply it according to `WIKI_RULES.md` and report which files were changed.

## Example Queries

- What does the wiki currently know about this topic, and which sources does it rely on?
- Where do the sources contradict one another?
- Which claims rely on only a single source?
- Which important questions remain unresolved?

A query does not modify the wiki unless explicitly requested.

## Validation

After ingesting several sources:

> Run lint checks according to `WIKI_RULES.md`. Present the findings only, and do not modify any files without approval.
