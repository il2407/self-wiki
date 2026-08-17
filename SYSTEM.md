# System Architecture

## Goal

Maintain a durable, local-first personal knowledge base that a human can browse
in Obsidian and an LLM agent can update through reviewable file changes.

## Components

| Component | Responsibility |
|---|---|
| Markdown vault | Canonical storage format; portable and readable without any app |
| `raw/` | Immutable original sources and user-authored source notes |
| `wiki/` | Derived, cited synthesis maintained by the agent |
| Obsidian | Human reading, navigation, backlinks, and graph view |
| Codex | Ingestion, synthesis, querying, linting, and controlled file updates |
| Git | Local history, diffs, auditability, and rollback |
| Private backup | Optional off-device recovery; configured only after a privacy decision |

## Trust boundaries

- Original sources remain under `raw/` and are never silently modified.
- Wiki pages are derived artifacts, not primary evidence.
- An ingest operation proposes changes before applying them.
- Querying does not modify files unless the user explicitly asks.
- Secrets, credentials, and employer-confidential information do not belong in
  the vault.
- A remote is not configured by default.

## Normal workflow

1. Add or identify a source.
2. Ask the agent for an ingest plan.
3. Review the proposed pages, claims, citations, and contradictions.
4. Approve or revise the plan.
5. Apply changes and inspect the Git diff.
6. Commit the reviewed state.
7. Browse and query the result through Obsidian or the agent.

## Recovery model

- Git restores earlier reviewed versions of text and configuration.
- The temporary pre-migration copy is retained until acceptance testing passes.
- An off-device backup will be selected separately; Git without a remote is not
  sufficient protection against disk loss.

## Acceptance criteria

The infrastructure is ready for real knowledge only when:

- the permanent vault opens correctly in Obsidian;
- Codex loads the repository `AGENTS.md` instructions;
- Git shows a clean baseline;
- a synthetic test source can be ingested with an approved diff;
- the test change can be rolled back without affecting `raw/`;
- no remote or external sync receives data without an explicit decision.

