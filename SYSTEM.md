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
| GitHub Private | Off-device recovery through `origin` at `il2407/self-wiki` |

## Trust boundaries

- Original sources remain under `raw/` and are never silently modified.
- Wiki pages are derived artifacts, not primary evidence.
- An ingest operation proposes changes before applying them.
- Querying does not modify files unless the user explicitly asks.
- Secrets, credentials, proprietary source code, and customer data do not belong
  in the vault. Internal employer material is allowed only after explicit
  authorization is recorded beside the source and the repository's private
  access remains appropriate.
- The configured remote is private. Changing its visibility or adding another
  remote requires an explicit privacy decision.
- Authentication credentials stay outside the vault and must never be committed.

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
- GitHub Private stores the reviewed `main` branch off-device at
  `https://github.com/il2407/self-wiki`.
- The temporary pre-migration copy was moved to macOS Trash after acceptance
  testing passed.
- A local commit is not considered backed up until it has been pushed to
  `origin/main`.

## Acceptance criteria

The infrastructure is ready for real knowledge only when:

- the permanent vault opens correctly in Obsidian;
- Codex loads the repository `AGENTS.md` instructions;
- Git shows a clean baseline;
- a synthetic test source can be ingested with an approved diff;
- the test change can be rolled back without affecting `raw/`;
- the configured GitHub repository is private and synchronized only after an
  explicit commit and push.

## Acceptance result

Passed on 2026-08-17.

- Synthetic source commit: `f9c9ced`
- Approved ingestion commit: `20f4bc5`
- Derived-content rollback commit: `2e33bb1`
- The source SHA-256 remained unchanged during rollback:
  `c34f2e5db89df10aaacc5a675a19624549deebee16b48408b0bbc298f0bba462`
- After rollback, the derived wiki state matched the pre-ingestion state while
  the append-only operation log retained both events.
- The synthetic source was removed after the test with explicit user approval;
  it remains recoverable from Git commit `f9c9ced`.
