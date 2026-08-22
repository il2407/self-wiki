---
id: project-humanz-ads-data-flows
type: project-data-flows
status: source-documented
updated: 2026-08-22
claim_status: verified
sources:
  - ../../raw/project-materials/humanz-ads/2026-08-22/architecture-diagrams/09-active-process-l3.mmd
  - ../../raw/project-materials/humanz-ads/2026-08-22/architecture-diagrams/06-passive-process-l3.mmd
tags: [backend, async, data-pipeline, meta-api]
---

# Humanz Ads data flows

## Active flow: asynchronous ad creation

1. The user submits content, targeting/ad-set data, tracking tags, expiration,
   and media through the creation UI.
2. The Java API validates the request, inserts a pending task, publishes the task
   identifier to SQS, and returns `202 Accepted` with a task identifier.
3. The frontend polls the backend for task status.
4. An SQS-triggered Lambda loads the task and checks whether creation is blocked.
5. The worker performs Meta prerequisites through HFBI, including agency/page
   relationships, then advances the task to processing.
6. HFBI uploads media, creates a creative, and creates the ad through Meta.
7. The worker records the created ad ID and terminal task state, persists the
   saved-ad mapping, and publishes completion or failure through SNS.

### Interview pressure points

- The source does not specify how DB insert and queue publication are made
  atomic; ask whether an outbox or recovery scan existed.
- SQS is at-least-once, so duplicate delivery and idempotent creation need a
  historical explanation.
- A multi-step external workflow can fail after partial success; clarify
  compensation, resumption, and reconciliation.
- Polling is documented, but status cadence, timeout, and user-facing failure
  semantics are unknown.
- Bulk creation is documented with a maximum of 50, but fan-out and partial
  success behavior require confirmation.

## Active flow: synchronous edit and duplicate

The edit and duplicate modals call the Java management API. The backend calls
HFBI through its authenticated handler, and HFBI performs edit/copy operations
against Meta before updating local metadata. Request timeout, retry safety, and
partial-failure behavior are not described.

## Passive flow: analytics synchronization

1. Scheduled workers select campaigns or records requiring refresh.
2. Campaign, metadata, insights, comments, and monthly-spend jobs call HFBI
   endpoints; the insights path also uses an internal SQS batch stage.
3. HFBI fetches Meta data, applies field mapping, attribution-window handling,
   currency conversion, and normalization.
4. Campaign, metadata, performance, and comment rows are stored in PostgreSQL.
5. Java query code joins and aggregates stored data by requested dates,
   campaigns, ad sets, ads, and attribution settings.
6. Typed responses drive analytics tables, KPI cubes, and comment views.

### Interview pressure points

- Freshness SLA and schedule selection.
- Backfill, replay, late-arriving data, corrections, and deduplication.
- Rate-limit-aware batching and concurrency.
- Partial campaign failures and permission recovery.
- Currency conversion timing and historical exchange-rate consistency.
- Attribution-window semantics and reconciliation with Meta.
- Query performance, indexes, partitioning, and aggregation strategy at scale.

## Source-supported versus unresolved

| Topic | Source-supported | Still unresolved |
|---|---|---|
| Creation path | Components and nominal sequence | Guarantees, retry rules, idempotency, timings |
| Edit/copy path | Synchronous service chain | Timeouts, recovery, consistency behavior |
| Analytics ingest | Job categories and storage flow | Schedules, volumes, backfill, SLOs |
| Dashboard reads | Stored-data aggregation path | Query plans, cache use, peak latency |
| Error handling | Blocked/failed creation states and permission fields exist | Actual incidents, alerting, operator runbooks |

## Sources

- [Active process L3](../../raw/project-materials/humanz-ads/2026-08-22/architecture-diagrams/09-active-process-l3.mmd)
- [Passive process L3](../../raw/project-materials/humanz-ads/2026-08-22/architecture-diagrams/06-passive-process-l3.mmd)
- [Data flow L2](../../raw/project-materials/humanz-ads/2026-08-22/architecture-diagrams/14-data-flow-l2.mmd)
- [System mapping DOCX](../../raw/project-materials/humanz-ads/2026-08-22/ads-system.docx)

