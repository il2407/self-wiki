---
type: concept
domain: work
topic: backend-interviews
status: test
updated: 2026-08-17
sources:
  - raw/work/system-test-request-id.md
---

# Request ID

## במשפט אחד

`Request ID` הוא מזהה שמוצמד לבקשה נכנסת ומאפשר לקשר בין רשומות לוג השייכות
לאותה בקשה. `[Source: raw/work/system-test-request-id.md, lines 5-9]`

## המודל המנטלי

אפשר לחשוב על Request ID כתווית משותפת שעוברת עם הבקשה בין שירותים. כאשר כל
שירות מוסיף אותה ללוגים הרלוונטיים, ניתן לחפש את התווית ולאסוף את הרשומות
שקשורות לאותה בקשה. `[Source: raw/work/system-test-request-id.md, lines 6-9]`

## איך זה עובד

1. המערכת מקצה מזהה לבקשה נכנסת.
   `[Source: raw/work/system-test-request-id.md, line 5]`
2. אותו מזהה מועבר בין גבולות השירותים.
   `[Source: raw/work/system-test-request-id.md, lines 6-7]`
3. כל שירות כולל אותו ברשומות הלוג המובנות הרלוונטיות.
   `[Source: raw/work/system-test-request-id.md, lines 8-9]`
4. בחקירת תקלה אפשר להשתמש במזהה כדי לקשר בין הרשומות של הבקשה.
   `[Source: raw/work/system-test-request-id.md, lines 6-7]`

## Trade-offs

- יתרון: המזהה מסייע בקישור לוגים של בקשה העוברת בין שירותים.
  `[Source: raw/work/system-test-request-id.md, lines 6-9]`
- מגבלה: הוא אינו מתאר תזמון או יחסי הורה־ילד בין פעולות, ולכן אינו מחליף
  distributed tracing.
  `[Source: raw/work/system-test-request-id.md, lines 10-12]`

## דוגמה

**המחשה — פרשנות:** אם בקשה עוברת משירות API לשירות הזמנות, שני השירותים יכולים
לכתוב ללוג את אותו Request ID. חיפוש לפי המזהה יציג את הרשומות משניהם. זוהי
דוגמה מסבירה שנגזרה מהעיקרון במקור, ולא תרחיש שמופיע בו במפורש.

## סתירות ומגבלות

- המקור הוא חומר בדיקה סינתטי ואינו מקור מקצועי סמכותי.
  `[Source: raw/work/system-test-request-id.md, lines 14-17]`
- אין כרגע מקורות נוספים שמאמתים את הטענות.

## שאלות פתוחות

- כיצד מייצרים Request ID ובאיזו רמת ייחודיות?
- כיצד מעבירים אותו ב־HTTP, בתורים ובתהליכים אסינכרוניים?
- מה הקשר בינו לבין Trace ID?

## קשרים

- [[roadmap|מפת הידע ב־Backend]]

## מקורות

- `[Source: raw/work/system-test-request-id.md, lines 1-17]`
