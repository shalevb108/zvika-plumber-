# מדריך פריסה לענן — צביקה סופר

## סקירה כללית

- **Backend**: Render Web Service (Node.js)
- **Frontend**: Render Static Site (React/Vite)
- **Database**: MongoDB Atlas (חינמי)

---

## שלב 1 — MongoDB Atlas (בסיס נתונים חינמי)

1. היכנסו ל-[mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas) והירשמו
2. לחצו **Build a Database** → בחרו **Free (M0)**
3. בחרו **AWS → Frankfurt (eu-central-1)**
4. שם ה-Cluster: `zvika-cluster`
5. צרו משתמש:
   - Username: `zvika_admin`
   - Password: (שמרו את הסיסמה!)
6. ב-Network Access → לחצו **Add IP Address** → בחרו **Allow Access from Anywhere** (0.0.0.0/0)
7. לחצו **Connect** → **Drivers** → בחרו Node.js
8. העתיקו את ה-Connection String שנראה כך:
   ```
   mongodb+srv://zvika_admin:<password>@zvika-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   החליפו `<password>` בסיסמה שיצרתם.

---

## שלב 2 — פריסה ב-Render

### א. חיבור ה-Repository

1. היכנסו ל-[render.com](https://render.com) והירשמו עם GitHub
2. לחצו **New** → **Blueprint**
3. חברו את ה-repository: `zvika-plumber`
4. Render יזהה אוטומטית את קובץ `render.yaml` וייצור שני שירותים

### ב. הגדרת משתני סביבה — Backend (`zvika-plumber-api`)

בדשבורד Render → Services → `zvika-plumber-api` → Environment:

| מפתח | ערך |
|------|-----|
| `MONGODB_URI` | ה-connection string מ-Atlas (עם הסיסמה) |
| `ADMIN_PASSWORD` | סיסמה חזקה לפאנל הניהול (לדוגמה: `Zvika@2024!`) |
| `JWT_SECRET` | מחרוזת אקראית ארוכה (64+ תווים) — ראו הערה למטה |
| `PORT` | `10000` (כבר מוגדר ב-render.yaml) |
| `FRONTEND_URL` | ישמולא לאחר הפריסה הראשונה (ראו שלב 3) |
| `FRONTEND_URL_PROD` | ישמולא לאחר הפריסה הראשונה (ראו שלב 3) |

> **ליצירת JWT_SECRET אקראי:** הריצו בטרמינל:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

### ג. הגדרת משתני סביבה — Frontend (`zvika-plumber-frontend`)

בדשבורד Render → Services → `zvika-plumber-frontend` → Environment:

| מפתח | ערך |
|------|-----|
| `VITE_API_URL` | `https://zvika-plumber-api.onrender.com/api` |

> **שימו לב:** ה-URL של הבאקאנד נראה כמו `https://zvika-plumber-api.onrender.com`
> בדקו את השם המדויק בדשבורד Render לאחר הפריסה.

---

## שלב 3 — לאחר הפריסה הראשונה

1. לאחר שהפריסה הסתיימה, העתיקו את ה-URL של הפרונטאנד מ-Render
   (נראה כמו: `https://zvika-plumber-frontend.onrender.com`)

2. חזרו ל-`zvika-plumber-api` → Environment → עדכנו:
   - `FRONTEND_URL` = `https://zvika-plumber-frontend.onrender.com`
   - `FRONTEND_URL_PROD` = `https://zvika-plumber-frontend.onrender.com`

3. לחצו **Save Changes** — Render יעשה Redeploy אוטומטית

4. עדכנו גם את `frontend/.env.production` ב-repository עם ה-URL המדויק של הבאקאנד:
   ```
   VITE_API_URL=https://zvika-plumber-api.onrender.com/api
   ```
   דחפו (push) את השינוי → Render יבנה מחדש אוטומטית

---

## שלב 4 — בדיקת הפריסה

בדקו את ה-endpoints הבאים:

```
GET https://zvika-plumber-api.onrender.com/api/health
→ צריך להחזיר: {"status":"ok","message":"שרת פועל תקין"}
```

```
GET https://zvika-plumber-api.onrender.com/api/services
→ צריך להחזיר מערך ריק []
```

---

## שלב 5 — פאנל הניהול

לאחר הפריסה, פאנל הניהול נמצא ב:
```
https://zvika-plumber-frontend.onrender.com/admin/login
```
הסיסמה היא ערך `ADMIN_PASSWORD` שהגדרתם ב-Render.

---

## הערות חשובות

- **Free tier ב-Render**: שירותים חינמיים "נרדמים" אחרי 15 דקות של חוסר פעילות.
  הבקשה הראשונה תתעכב ~30 שניות. לשדרוג לשירות תמיד פעיל — שדרגו לתוכנית Starter.

- **MongoDB Atlas Free**: מוגבל ל-512MB storage ו-100 חיבורים בו-זמנית — מספיק לאתר עסקי קטן.

- **דומיין מותאם אישית**: ב-Render → Settings → Custom Domains, ניתן לחבר דומיין כמו `zvika-super.co.il`.
