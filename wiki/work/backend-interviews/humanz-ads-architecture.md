---
type: architecture
domain: work
topic: backend-interviews
status: source-documented
updated: 2026-08-23
sources:
  - raw/work/backend-interviews/humanz-ads/2026-08-22/ads-system.docx
  - raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/03-architecture-overview-l3.mmd
  - raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/12-shared-infrastructure-l3.mmd
  - raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/18-service-ownership-l3.mmd
---

# ארכיטקטורת Humanz Ads

## תקציר

המערכת מפרידה בין API המוצר ב־Java/Spring לבין שכבת אינטגרציה ב־Python/FastAPI
שמרכזת את הגישה ל־Meta. פעולות אינטראקטיביות עוברות דרך ה־backend, בעוד
שעבודות ארוכות ומתוזמנות מופעלות באמצעות SQS ו־Lambda. PostgreSQL משמש גם
ל־operational state וגם לנתוני analytics.
`[Source: raw/work/backend-interviews/humanz-ads/2026-08-22/ads-system.docx, Architecture Overview and Integration Mapping]`

## שכבות

### React frontend

כולל את מסכי Ads Analytics, יצירה, עריכה, שכפול, טבלאות, KPI, תגובות, פרטי
מודעה, הגדרות ו־attribution controls. הוא צורך API שנוצר מחוזה OpenAPI של
ה־Java backend. `[Source: raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/18-service-ownership-l3.mmd, lines 2-8 and 43]`

### Java/Spring backend

אחראי על authentication וה־API החיצוני של המוצר, validation, orchestration,
task lifecycle, פרסום ל־SQS, partner pages, campaign settings ושאילתות
analytics. התקשורת ל־HFBI נעשית ב־HTTP עם JWT.
`[Source: raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/17-service-ownership-l2.mmd, lines 11-19 and 38-40]`

### HFBI ב־Python/FastAPI

מרכז את כל פעולות Meta: יצירה, עריכה, copy, campaign discovery, metadata,
insights, comments ו־media. מודול `AdsIGFGApiDal.py` מתועד כלקוח Meta המשותף.
`[Source: raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/17-service-ownership-l2.mmd, lines 21-29 and 41]`

### Lambda ו־AWS messaging

Lambda ייעודי צורך משימות יצירת מודעה מ־SQS. Lambdas נוספים מסנכרנים
campaigns, metadata, insights, comments, spend ונתוני media. SNS משמש לפרסום
סטטוס יצירה, ו־S3 מופיע בנתיבי media/sync.
`[Source: raw/work/backend-interviews/humanz-ads/2026-08-22/ads-system.docx, AWS Lambda Inventory and Ad Creation Data Flow]`

### PostgreSQL

המקורות מתעדים טבלאות עבור task lifecycle, חסימות יצירה, metadata, ביצועים,
תגובות, campaign registry, partner settings, tokens ושערי מטבע. יש טבלאות
שנכתבות או נקראות על ידי יותר משירות אחד, ולכן ownership, migrations ו־write
conflicts הם נושאי תכנון חשובים.
`[Source: raw/work/backend-interviews/humanz-ads/2026-08-22/architecture-diagrams/12-shared-infrastructure-l3.mmd, lines 1-50]`

## מטריצת אחריות שירותית

| תחום | בעלים מתועד | שותפים |
|---|---|---|
| UI ו־UX | React frontend | Java API |
| API, auth ו־validation | Java backend | frontend, HFBI |
| יצירת task ו־enqueue | Java backend | PostgreSQL, SQS |
| ביצוע יצירת מודעה | Lambda worker | HFBI, Meta, DB, SNS |
| Meta Graph API | HFBI | Lambda workers |
| analytics ingestion | HFBI ו־Lambdas | Meta, PostgreSQL |
| analytics aggregation | Java backend | PostgreSQL |

המטריצה מתארת software ownership ולא personal ownership.

## נקודות ארכיטקטורה שכדאי לדעת להסביר

- למה יצירה היא אסינכרונית אך edit/copy מתועדים כסינכרוניים.
- למה Meta מבודדת מאחורי HFBI במקום גישה ישירה מה־Java backend.
- למה dashboard קורא מ־PostgreSQL ולא מ־Meta בזמן הבקשה.
- איך מנהלים state של workflow שמערב DB, queue ו־API חיצוני.
- כיצד מתחלקת בעלות על schema כאשר Java, Python ו־Lambdas ניגשים לאותו DB.

## מידע שחסר במקורות

- deployment topology מלא והפרדה מדויקת בין Kubernetes ל־Lambda.
- visibility timeout, DLQ, retry count ו־idempotency key.
- transaction boundaries והבטחת atomicity בין DB ל־SQS.
- rate-limit strategy, backoff ו־permission recovery מול Meta.
- tracing, dashboards, alerting ו־SLOs.
- scale ועלות.

## דפים קשורים

- [[humanz-ads]]
- [[humanz-ads-data-flows]]
- [[humanz-ads-risks-and-decisions]]
