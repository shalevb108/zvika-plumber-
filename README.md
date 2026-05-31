# צביקה סופר - אינסטלטור מקצועי

אתר מלא לעסק של אינסטלציה עם ממשק ניהול.

## מבנה הפרויקט

```
zvi/
├── frontend/    # React + Vite + TypeScript + SCSS + Ant Design
└── backend/     # Node.js + Express + MongoDB + TypeScript
```

## דרישות מוקדמות

- Node.js 18+
- MongoDB (מקומי או MongoDB Atlas)

## התקנה והפעלה

### Backend

```bash
cd backend
npm install
# ערוך את קובץ .env לפי הצורך
npm run dev
```

השרת יעלה על פורט 5000.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

האתר יעלה על http://localhost:5173

## משתני סביבה (backend/.env)

| משתנה | תיאור | ברירת מחדל |
|-------|-------|------------|
| `MONGODB_URI` | כתובת MongoDB | `mongodb://localhost:27017/zvika-plumber` |
| `ADMIN_PASSWORD` | סיסמת מנהל | `admin123` |
| `JWT_SECRET` | מפתח JWT | `zvika-super-secret-jwt-key-2024` |
| `PORT` | פורט שרת | `5000` |
| `FRONTEND_URL` | URL הפרונטאנד (CORS) | `http://localhost:5173` |

## גישה לפאנל הניהול

- כתובת: http://localhost:5173/admin/login
- סיסמה: ערך `ADMIN_PASSWORD` ב-.env

## תכונות

### פרונטאנד
- דף הבית עם Hero, סטטיסטיקות, שירותים, ו-CTA
- עמוד שירותים עם כרטיסיות
- גלריה עם מסונן קטגוריות ו-Lightbox
- מחירון עם טבלה וסינון
- עמוד אודות עם ביוגרפיה ומספרים
- המלצות לקוחות עם כוכבים
- שאלות נפוצות עם accordion
- טופס יצירת קשר עם ולידציה
- כפתור WhatsApp צף
- תמיכה מלאה ב-RTL עברית

### פאנל ניהול
- ניהול שירותים (CRUD)
- ניהול גלריה (CRUD)
- ניהול המלצות (CRUD)
- ניהול מחירון (CRUD)
- ניהול שאלות נפוצות (CRUD)
- הגדרות אתר (טלפון, אימייל, טקסטים)
- צפייה והדלת הודעות מטופס יצירת קשר

## Build לפרודקשן

```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```
