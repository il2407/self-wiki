---
type: analysis
domain: work
topic: backend-interviews
status: requires-validation
updated: 2026-08-23
sources:
  - raw/work/backend-interviews/humanz-ads/2026-08-22/ads-system.docx
---

# סיכונים והחלטות ב־Humanz Ads

## מגבלת המקור

מסמך המערכת כולל review והמלצות ארכיטקטוניות. הרשימה להלן היא סינתזה של
הניתוח במסמך; היא אינה מוכיחה שהסיכון התממש, שהתרחש incident, שעידו קיבל כל
החלטה אישית או שההמלצה יושמה.
`[Source: raw/work/backend-interviews/humanz-ads/2026-08-22/ads-system.docx, Risks and Recommendations]`

## סיכונים לדיון

- Lambda תלוי בקריאות HTTP ל־HFBI ולכן חולק איתו failure domain חלקי.
- blocked creation עלול להפוך ל־silent operational state ללא alerting ו־recovery.
- Lambdas דומים עלולים לייצר duplication ותחזוקה כפולה.
- polling פשוט ליישום אך מוסיף reads ועיכוב לעומת push.
- permission failures ו־Graph API version drift דורשים recovery יזום.
- shared-table writes, raw SQL ו־JSON-like payloads מקשים על ownership ו־schema
  evolution.
- token handling, FFmpeg/media dependencies, SQS volume ו־currency fallback הם
  סיכונים תפעוליים נוספים.

## החלטות שצריך לדעת להגן עליהן בריאיון

| החלטה | מה צריך להסביר |
|---|---|
| יצירה אסינכרונית | constraints, latency, failure isolation והחלופה הסינכרונית |
| SQS ו־Lambda | retries, duplicate delivery, idempotency, concurrency ועלות |
| שכבת HFBI | למה Python/FastAPI, גבול אחריות והמחיר של HTTP coupling |
| PostgreSQL משותף | האם היה intentional או inherited; schema ownership ו־migrations |
| polling | למה נבחר, cadence, timeout ו־terminal states |
| scheduled ingestion | freshness מול quotas, batching, backfill ו־late corrections |
| Meta client מרכזי | consistency, testability, permission handling וגרסאות API |
| daily analytics rows | יתרונות query מול storage, corrections ו־aggregation |

## אין לטעון עדיין

- שסיכון מהרשימה גרם לתקלה אמיתית.
- שעידו בחר אישית כל טכנולוגיה או boundary.
- שהמלצה מהמסמך יושמה בפועל.
- שהתרשימים מייצגים כל גרסה היסטורית של המערכת.

## דפים קשורים

- [[humanz-ads]]
- [[humanz-ads-architecture]]
- [[humanz-ads-data-flows]]
