---
id: project-humanz-ads-risks-and-decisions
type: project-analysis
status: needs-personal-validation
updated: 2026-08-22
claim_status: inferred
sources:
  - ../../raw/project-materials/humanz-ads/2026-08-22/ads-system.docx
tags: [backend, tradeoffs, reliability, interview]
---

# Humanz Ads risks and decision prompts

The source DOCX contains architectural observations and recommendations. They
are treated here as `inferred` review findings, not proof of incidents or of the
historical team's rationale.

## Review findings to validate with Ido

- Lambda execution depends on HTTP calls into HFBI, creating availability and
  latency coupling across the worker and integration service.
- Blocking ad creation after repeated failures may protect Meta and the platform,
  but can become silent operational state without clear alerting and recovery.
- Similar Lambda implementations may duplicate behavior and maintenance effort.
- Frontend polling is simple and resilient to disconnected clients, but creates
  repeated reads and delays status delivery compared with push approaches.
- Meta permission failures require explicit recovery and resynchronization.
- Shared-table writes, raw SQL, and JSON-like payloads can lead to ownership,
  conflict, and schema-drift problems.
- Graph API version changes, token handling, FFmpeg/media dependencies, and SQS
  volume are external or operational risks.
- Currency fallback behavior can produce analytically plausible but incorrect
  results if it is not observable.

## Decision prompts for reconstruction

| Decision area | Questions for the historical account |
|---|---|
| Async creation | Why queue the workflow? What latency and failure behavior made synchronous creation unsuitable? |
| SQS and Lambda | What alternatives were considered? How were retries, poison messages, idempotency, concurrency, and cost handled? |
| HFBI boundary | Why isolate Meta integration in Python/FastAPI? What did the boundary improve or complicate? |
| Shared PostgreSQL | Was shared storage intentional or inherited? How were schema ownership and migrations coordinated? |
| Polling | Why was polling selected? What cadence and terminal-state handling were used? |
| Scheduled ingestion | How were freshness, API quotas, batching, backfills, and late corrections balanced? |
| Meta client | What value came from centralization? How were version upgrades and permission errors managed? |
| Analytics schema | Why persist normalized daily rows? What query and storage trade-offs followed? |

## Do not claim yet

- That any listed risk caused a real outage.
- That Ido personally chose every documented technology or boundary.
- That a proposed recommendation was implemented.
- That the current diagram reflects every historical version of the platform.

## Source

- [System mapping DOCX](../../raw/project-materials/humanz-ads/2026-08-22/ads-system.docx)

