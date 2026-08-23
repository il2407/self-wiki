---
type: system-flow
domain: work
topic: backend-interviews
status: source-documented
updated: 2026-08-23
sources:
  - raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/09-active-process-l3.mmd
  - raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/06-passive-process-l3.mmd
  - raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/14-data-flow-l2.mmd
---

# זרימות הנתונים של Humanz Ads

## יצירת מודעה אסינכרונית

1. המשתמש שולח תוכן, ad set, tracking tags, expiration ו־media דרך הממשק.
2. ה־Java API מבצע validation, שומר task במצב `pending`, שולח את מזהה המשימה
   ל־SQS ומחזיר `202 Accepted` עם task ID.
3. ה־frontend מבצע polling לסטטוס המשימה.
4. Lambda צורך את ההודעה, טוען את המשימה ובודק אם יצירת מודעות חסומה.
5. ה־worker מבצע דרך HFBI את דרישות ה־agency/page ומעביר את המשימה ל־processing.
6. HFBI מעלה media, יוצר creative ולבסוף יוצר ad דרך Meta.
7. ה־worker שומר created ad ID וסטטוס סופי ומפרסם הצלחה או כישלון דרך SNS.

`[Source: raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/09-active-process-l3.mmd, lines 13-55]`

### שאלות reliability שהמקור אינו עונה עליהן

- מה קורה אם ה־DB insert מצליח אך הפרסום ל־SQS נכשל?
- כיצד מונעים יצירת שתי מודעות כאשר SQS מוסר הודעה פעמיים?
- מה קורה לאחר timeout כאשר Meta הצליחה אך התשובה לא התקבלה?
- כיצד ממשיכים או מפצים לאחר יצירת media/creative חלקית?
- מהי מדיניות retry, DLQ, reconciliation ו־manual recovery?
- כיצד bulk עד 50 מתנהג בהצלחה חלקית?

אלה שאלות, לא טענות שהמערכת חסרה מנגנונים אלה.

## עריכה ושכפול סינכרוניים

ה־frontend פונה ל־Java management API, שמתקשר ל־HFBI באמצעות handler מאומת.
HFBI מבצע edit/copy מול Meta ומעדכן metadata מקומי. המקורות אינם מפרטים timeout,
retry safety או recovery עבור partial failure.
`[Source: raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/08-active-process-l2.mmd, lines 13-33]`

## סנכרון analytics פסיבי

1. scheduled Lambdas בוחרים campaigns או רשומות הדורשות רענון.
2. jobs של campaigns, metadata, insights, comments ו־monthly spend קוראים ל־HFBI;
   נתיב insights כולל גם תור batch פנימי.
3. HFBI מושך נתונים מ־Meta ומבצע mapping, attribution handling, currency
   conversion ו־normalization.
4. campaign, metadata, performance ו־comment rows נשמרים ב־PostgreSQL.
5. Java backend מצרף ומאגד את הנתונים לפי טווח זמן, campaign, ad set, ad
   ו־attribution window.
6. התוצאה מוצגת בטבלאות, KPI וניתוח תגובות.

`[Source: raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/06-passive-process-l3.mmd, lines 1-52]`

## שאלות תכנון לנתיב analytics

- freshness SLA ותדירות כל job.
- batching, concurrency ו־Meta rate limits.
- replay, backfill, late data ו־corrections.
- deduplication ו־idempotent upsert.
- permission loss וכשלים חלקיים ברמת campaign.
- שערי מטבע היסטוריים ו־fallback.
- indexes, partitioning ו־aggregation strategy בנפח גבוה.

## דפים קשורים

- [[humanz-ads]]
- [[humanz-ads-architecture]]
- [[humanz-ads-interview-practice]]
