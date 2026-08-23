# Operation Log

רישום כרונולוגי מצטבר. אין לשכתב רשומות קודמות.

## [2026-08-17] setup | Initial scaffold

- נוצר מבנה Wiki רב־תחומי.
- עדיין לא נקלטו מקורות ולא נוצרו טענות ידע.

## [2026-08-17] structure | Backend interview preparation

- נוסף מרחב עבודה להכנה לראיונות Backend.
- נוספו פרופיל מועמד, מפת הכנה, תוכנית לימוד, בנק שאלות ומעקב סימולציות.
- טרם נוסף תוכן מקצועי מבוסס מקורות; השלב הבא הוא אפיון המועמד והמשרות.

## [2026-08-17] structure | Backend knowledge base reframing

- הוגדרה המטרה מחדש: מאגר ידע מצטבר ב־Backend, לא תוכנית לימודים.
- מפת הנושאים הפכה למפת ניווט; תוכנית הלימוד הפכה לתור אופציונלי.
- הכנה לראיונות נשמרה כמקרה שימוש, אך אינה מכתיבה את מבנה הידע.
- קורות החיים טרם נקלטו למאגר.

## [2026-08-17] ingest | Synthetic Request ID acceptance test

- נקלט מקור הבדיקה `raw/work/system-test-request-id.md` לאחר אישור תוכנית הקליטה.
- נוצר הדף `wiki/work/backend-interviews/request-id.md` ועודכנו האינדקסים וקטלוג המקורות.
- המקור והדף מסומנים כסינתטיים ואינם נחשבים אסמכתה מקצועית.

## [2026-08-17] rollback | Synthetic Request ID acceptance test

- השינויים הנגזרים של בדיקת הקליטה הוסרו מה־Wiki ומהאינדקסים.
- המקור `raw/work/system-test-request-id.md` נשמר ללא שינוי כדי לאמת הפרדה בין
  מקור לבין ידע נגזר.
- Commit הקליטה נשאר בהיסטוריית Git וניתן לבדיקה בעתיד.

## [2026-08-17] cleanup | Acceptance-test artifacts

- מקור הבדיקה `raw/work/system-test-request-id.md` נמחק באישור מפורש לאחר
  השלמת הבדיקה; הוא נשאר ניתן לשחזור מהיסטוריית Git.
- העותק הזמני של ה־Vault הועבר ל־macOS Trash בשם
  `self-wiki-pre-migration-2026-08-17` וניתן לשחזור כל עוד ה־Trash לא רוקן.

## [2026-08-23] migration | Reconcile vault histories and ingest Humanz Ads

- המשתמש אישר להעביר את חומרי Humanz Ads מהעותק הזמני אל ה־Vault הקבוע.
- שתי היסטוריות Git בלתי קשורות חוברו ב־merge שאינו מוחק אף היסטוריה ואינו
  מחליף את מבנה ה־Vault הקבוע.
- נקלטו מסמך מערכת, 18 תרשימי Mermaid, checksum manifest, קורות החיים והערת
  שחזור המאשרת שהמערכת נבנתה מאפס על ידי עידו וה־CTO.
- נוצרו דפי פרויקט, ארכיטקטורה, data flows, סיכונים/החלטות ותרגול ריאיון.
- עודכנו פרופיל המועמד, האינדקס, מפת הידע, קטלוג המקורות ובנק השאלות.
- עידו אישר קודם לכן שהוא רשאי לשמור את חומרי Humanz בריפו הפרטי; לא נמצאו
  ערכי credentials במקורות שנקלטו.
- נותרו פתוחים component-level ownership, chronology, scale, guarantees,
  incidents ואימות מדדי ה־CV.
