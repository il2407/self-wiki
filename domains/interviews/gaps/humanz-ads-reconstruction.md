---
id: gap-humanz-ads-reconstruction
type: knowledge-gap
status: open
updated: 2026-08-22
claim_status: unknown
sources:
  - ../../../shared/projects/humanz-ads.md
tags: [project, ownership, scale, reliability]
---

# Humanz Ads reconstruction gaps

## Gap

The system architecture is documented, but the evidence is not yet sufficient
for a defensible interview account of Ido's personal contribution and the
system's production guarantees and impact.

## Missing knowledge

- Chronology and pre-existing baseline.
- Direct implementation, design, leadership, and operational ownership.
- Queue and workflow guarantees: atomic publication, idempotency, retry, DLQ,
  partial-success recovery, and reconciliation.
- Workload scale, performance, availability, freshness, and cost.
- Historical design constraints, alternatives, and decisions.
- Real incidents, diagnosis, remediation, and durable learning.
- Measurement and attribution of CV time and revenue outcomes.

## Resolution method

Run the [project reconstruction sequence](../projects/humanz-ads.md) one question
at a time. Record user answers as `recalled`, link supporting artifacts when
available, and update the canonical project claim ledger.

## Completion criteria

- Ido can give accurate 30-second, 2-minute, and 10-minute explanations.
- Every material ownership and impact statement has a status and source.
- At least one decision and one incident can withstand technical follow-ups.
- The async creation flow can be explained through its failure paths, not only
  its happy path.

