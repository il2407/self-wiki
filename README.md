# Self Wiki

תשתית מקומית מבוססת Markdown לידע אישי מצטבר. תחום העבודה הראשון הוא הכנה
לראיונות Backend, אבל מבנה הריפו מאפשר להוסיף domains נוספים בלי לשכפל את
העובדות המשותפות.

## התחלה מהירה

דרישות: Git ו-Node.js 18 ומעלה. אין תלויות npm ואין צורך ב-API key.

```bash
cd self-wiki
npm test
npm run wiki -- lint
npm run wiki -- stats
```

יצירת דפים מתבניות:

```bash
npm run wiki -- new project payments-platform
npm run wiki -- new job backend-engineer-acme
npm run wiki -- new coding-question lru-cache
npm run wiki -- new mock-interview project-payments-platform
npm run wiki -- new knowledge-gap database-indexes
```

## הכנסת תוכן

1. שמור מקור חדש בתיקייה המתאימה תחת `raw/`. אל תחליף מקור קיים.
2. בקש מ-Codex לבצע ingest ולציין את ה-domain הפעיל.
3. בדוק ואשר טענות אישיות לפני שהן מסומנות `verified`.
4. הרץ `npm run wiki -- lint` לאחר שינוי משמעותי.

דוגמה:

> בצע ingest לקורות החיים תחת raw/resume. עבור על כל טענה מהותית, צור קישורים
> לפרויקטים משותפים וסמן כל פרט שלא ניתן לאמת כ-recalled או unknown.

דוגמה לראיון פרויקט:

> עבור ל-project mode בתחום interviews. קרא את עמוד הפרויקט, שאל שאלה אחת בכל
> פעם ואל תיתן משוב עד שאענה. בסוף צור mock interview חדש ועדכן פערים שאישרתי.

## פקודות

- `wiki new <type> <slug>` — יצירת דף מתבנית.
- `wiki lint` — בדיקת metadata, קישורים ומקורות.
- `wiki stats` — תמונת מצב של ה-wiki.
- `wiki help` — עזרה מלאה.

## פרטיות

מומלץ לשמור את הריפו מקומי או כ-private repository. אין להכניס credentials,
מידע אישי של לקוחות, קוד קנייני או מסמכים חסויים של מעסיקים. השתמש בגרסאות
sanitized כאשר צריך לתאר ניסיון מקצועי.

