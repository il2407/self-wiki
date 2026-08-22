---
id: project-humanz-ads-architecture
type: project-architecture
status: source-documented
updated: 2026-08-22
claim_status: verified
sources:
  - ../../raw/project-materials/humanz-ads/2026-08-22/ads-system.docx
  - ../../raw/project-materials/humanz-ads/2026-08-22/architecture-diagrams/03-architecture-overview-l3.mmd
tags: [backend, architecture, aws, meta-api]
---

# Humanz Ads architecture

`verified` on this page means documented by the authorized source set, not
independently verified against production code.

## Layer map

### React frontend

The Ads Manager frontend contains the main analytics container, creation/edit/
duplicate modals, tables and KPI cubes, comment and ad-detail views, campaign
settings, naming templates, and attribution controls. It calls generated OpenAPI
clients exposed by the Java backend.

### Java and Spring backend

The backend owns the authenticated platform API and orchestration boundary. The
documented controllers cover management, creation, partner management, and
campaign settings. Services validate creation requests, persist task records,
publish to SQS, query analytics, and call HFBI through a JWT-authenticated HTTP
handler.

### Python and FastAPI HFBI

HFBI owns the Meta integration boundary. Its routers and services implement ad
create/edit/copy operations, campaign discovery, metadata and insights
synchronization, comments, media handling, and currency conversion. A shared
Meta client centralizes Graph API calls.

### Lambda workers and AWS messaging

- A creation consumer is triggered from SQS and executes the long-running
  Meta-side workflow.
- Scheduled workers synchronize campaigns, metadata, insights, comments,
  monthly spend, and supporting media data.
- SNS is used for creation-status publication.
- S3 appears in media and synchronization support paths.

### PostgreSQL

The data model separates creation-task lifecycle, ad metadata, performance rows,
comments, campaign registry, partner settings, and supporting identity/currency
data. The Java backend, HFBI, and workers have overlapping access to several
tables; the exact concurrency and ownership rules require validation.

## Responsibility matrix

| Concern | Primary documented owner | Collaborators |
|---|---|---|
| UI and user workflow | React frontend | Java API |
| Authentication and public API contract | Java backend | Frontend, HFBI |
| Creation validation and task enqueue | Java backend | PostgreSQL, SQS |
| Creation execution | Lambda creation worker | HFBI, Meta, PostgreSQL, SNS |
| Meta Graph API operations | HFBI | Lambda workers |
| Scheduled analytics ingestion | Lambda workers and HFBI | Meta, PostgreSQL |
| Analytics query and aggregation | Java backend | PostgreSQL |
| Persistent operational state | Shared PostgreSQL | Backend, HFBI, workers |

This matrix is about service boundaries. Personal engineering ownership remains
unknown until Ido confirms it.

## Data ownership observations

- Task records are created by the backend and later updated by the creation
  worker.
- Ad metadata can be written from more than one code path.
- Performance and comment records are populated by HFBI ingestion and read by
  the backend.
- Campaign registry rows are maintained by synchronization flows and used by
  multiple processes.
- Meta access tokens and exchange rates are supporting shared dependencies.

## External and operational boundaries

- Meta Graph API availability, permission state, rate limits, and version drift
  affect both interactive and scheduled operations.
- Backend-to-HFBI and worker-to-HFBI HTTP calls introduce runtime coupling.
- The queue isolates user-facing creation requests from the long Meta workflow,
  but delivery, retry, idempotency, and dead-letter behavior are not fully
  specified in the materials.
- Stored analytics decouple dashboard reads from Meta but introduce freshness,
  replay, correction, and aggregation concerns.

## Unknowns to validate

- Deployment topology, Kubernetes versus Lambda boundaries, and environment map.
- Queue visibility timeout, retry count, DLQ, idempotency key, and duplicate
  handling.
- Database transaction boundaries and concurrent-write conflict behavior.
- Meta rate-limit strategy, backoff, batching, and permission recovery.
- Monitoring, alerting, tracing, dashboards, and SLO ownership.
- Production scale and cost profile.

## Sources

- [System mapping DOCX](../../raw/project-materials/humanz-ads/2026-08-22/ads-system.docx)
- [Architecture diagrams L1-L3](../../raw/project-materials/humanz-ads/2026-08-22/architecture-diagrams/README.md)
- [Shared infrastructure L3](../../raw/project-materials/humanz-ads/2026-08-22/architecture-diagrams/12-shared-infrastructure-l3.mmd)
- [Service ownership L3](../../raw/project-materials/humanz-ads/2026-08-22/architecture-diagrams/18-service-ownership-l3.mmd)

