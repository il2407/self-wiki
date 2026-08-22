---
id: interview-project-humanz-ads
type: interview-project-brief
status: ready-for-reconstruction
updated: 2026-08-22
claim_status: mixed
sources:
  - ../../../shared/projects/humanz-ads.md
tags: [project-interview, backend, humanz-ads]
---

# Humanz Ads project interview brief

## Purpose

Turn the documented system architecture and Ido's actual experience into an
accurate, defensible interview explanation. Do not memorize a polished story
before ownership, chronology, scale, decisions, and outcomes are confirmed.

## What the sources can currently support

- A high-level system map and separation of frontend, Java backend, HFBI,
  workers, PostgreSQL, and Meta.
- A detailed asynchronous ad-creation sequence.
- A scheduled analytics-ingestion and query-serving sequence.
- Service-level responsibility boundaries.
- A set of credible design and reliability questions.

## What only Ido can currently establish

- Component-level ownership and the division of responsibility with the CTO and
  any later contributors. Project-level greenfield architecture and code
  responsibility are now confirmed.
- How the architecture evolved over time.
- Scale, SLOs, incidents, and operational practices.
- Historical alternatives and why decisions were made.
- How performance and revenue outcomes were measured.

## Recommended reconstruction sequence

Ask one question at a time and persist the answer with `recalled` status until
supporting evidence is added.

1. **Starting point:** Confirmed: no pre-existing system; Ido and the CTO built
   the infrastructure from zero, with Ido responsible for architecture planning
   and code implementation.
2. **Timeline:** What were the major phases from the first version to the system
   represented in the diagrams?
3. **Ownership:** For each phase, what did Ido implement directly, co-design,
   delegate/review, or merely interact with?
4. **Core flow:** Explain ad creation from the user's click to a created Meta ad,
   including failure and retry behavior.
5. **Data flow:** Explain how analytics reached the dashboard and how freshness
   and consistency were managed.
6. **Decision:** Select one consequential design choice and reconstruct the
   constraints, alternatives, trade-offs, and result.
7. **Incident:** Reconstruct one real production failure and the lasting fix.
8. **Scale:** Add measured workload, latency, throughput, freshness, error, and
   cost figures where available.
9. **Impact:** Validate the CV metrics and separate direct causation from broader
   company outcomes.
10. **Reflection:** What would Ido change if building the platform today?

## Likely interviewer follow-ups

- Why did you need both a Java backend and HFBI?
- Why was ad creation asynchronous while edit/copy was synchronous?
- What happens if the database insert succeeds but SQS publication fails?
- What happens when SQS delivers the same creation task twice?
- How do you avoid creating two Meta ads after a retry or timeout?
- How do you recover from partial success after media or creative creation?
- How did you handle Meta rate limits, permission loss, and API version changes?
- How fresh was analytics data, and how did you backfill or correct it?
- Who owned shared schemas and migrations across Java, Python, and Lambdas?
- What did you monitor, and what was the worst production incident?
- Which part was specifically yours, and what would teammates say you owned?
- How do the claimed time and revenue improvements connect to your changes?

## Answer-shape target after reconstruction

- **30 seconds:** product, users, business problem, role, and outcome.
- **2 minutes:** system boundary, one core flow, personal ownership, and one
  decision.
- **10 minutes:** requirements, architecture, data model, reliability, scale,
  trade-offs, incident, impact, and reflection.

## Canonical knowledge

- [Project overview](../../../shared/projects/humanz-ads.md)
- [Architecture](../../../shared/projects/humanz-ads-architecture.md)
- [Data flows](../../../shared/projects/humanz-ads-data-flows.md)
- [Risks and decision prompts](../../../shared/projects/humanz-ads-risks-and-decisions.md)
