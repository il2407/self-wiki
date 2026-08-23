---
type: interview-practice
domain: work
topic: backend-interviews
status: ready
updated: 2026-08-23
sources:
  - raw/work/backend-interviews/profile/2026-08-22-ido-lev-cv.pdf
  - raw/work/backend-interviews/humanz-ads/2026-08-22/ads-system.docx
  - raw/work/backend-interviews/humanz-ads/2026-08-22/reconstruction-session-01.md
---

# תרגול ריאיון על Humanz Ads

## מטרה

לתרגל הסבר מדויק של פרויקט אמיתי. אין לעכב את התרגול לצורך תחקור מלא של
הפרויקט: מתחילים מהמידע הקיים, שואלים שאלת ריאיון אחת בכל פעם, ומבקשים מעידו
מידע נוסף רק כאשר חסר פרט מהותי לתשובה או למשוב.

## מה כבר ניתן לומר בביטחון

- המערכת הייתה greenfield ונבנתה מאפס על ידי עידו וה־CTO.
- עידו היה אחראי על תכנון הארכיטקטורה ועל כתיבת הקוד.
- המערכת משלבת Java/Spring, Python/FastAPI, PostgreSQL, AWS messaging/workers
  ו־Meta Graph API.
- קיימים נתיבי ad creation אסינכרוני, edit/copy סינכרוני ו־analytics ingestion
  מתוזמן.

`[Source: raw/work/backend-interviews/humanz-ads/2026-08-22/reconstruction-session-01.md, User statement and Faithful interpretation]`
`[Source: raw/work/backend-interviews/humanz-ads/2026-08-22/ads-system.docx, Architecture Overview and Data Flows]`

## מה לא להציג כעובדה מאומתת

- חלוקת הקוד המדויקת בין עידו ל־CTO או למהנדסים מאוחרים יותר.
- volume, latency, SLOs או cost שלא סופקו.
- retry/idempotency behavior שאינו מתועד.
- incidents שלא תוארו על ידי עידו.
- הסבר מדידה או causal attribution למדדי ה־CV.

## צורת העבודה בצ׳אט חדש

Prompt פתיחה מומלץ:

> בצע איתי סימולציית ריאיון Backend במצב project על Humanz Ads. קרא את
> `humanz-ads.md` ואת הדפים המקושרים לפי הצורך. שאל שאלה אחת בכל פעם, אל תיתן
> תשובת מודל לפני שאענה, ותן משוב על דיוק טכני, מבנה, ownership ותקשורת.
> בקש מידע אישי נוסף רק אם הוא חיוני.

## רצף שאלות אפשרי

1. ספר על פרויקט Backend משמעותי שהובלת ועל הבעיה העסקית שלו.
2. תאר את הארכיטקטורה ברמה גבוהה ואת האחריות האישית שלך.
3. הסבר את זרימת יצירת המודעה מקצה לקצה.
4. למה התהליך היה אסינכרוני?
5. מה קורה בכשל או במסירה כפולה של הודעה?
6. למה הפרדתם בין Java backend לבין HFBI?
7. כיצד נתוני analytics הגיעו ל־dashboard?
8. איך התמודדתם עם מגבלות והרשאות של Meta?
9. איזו החלטה ארכיטקטונית היית משנה היום?
10. כיצד אתה מוכיח את התוצאות המספריות בקורות החיים?

## יעד לתשובה

- **30 שניות:** מוצר, משתמשים, בעיה, תפקיד ותוצאה.
- **2 דקות:** גבול מערכת, flow מרכזי, ownership והחלטה אחת.
- **10 דקות:** requirements, architecture, data, reliability, scale,
  trade-offs, incident, impact ומה היה משתנה היום.

## דפים קשורים

- [[humanz-ads]]
- [[humanz-ads-architecture]]
- [[humanz-ads-data-flows]]
- [[humanz-ads-risks-and-decisions]]
- [[mock-interviews]]
