# מדריך להגדרת Domains ב-Firebase

## שאלות נפוצות

### האם צריך לעדכן את ה-domain בכל deployment?

**לא!** אתה צריך להוסיף את ה-domain **פעם אחת בלבד**, והוא נשאר קבוע.

### מתי צריך להוסיף domain חדש?

רק במקרים הבאים:
1. **פעם ראשונה** - כשעושים deploy ראשון ל-Vercel
2. **Custom domain** - אם מוסיפים custom domain חדש
3. **Preview deployments** (אופציונלי) - רק אם רוצים ש-Google Sign-In יעבוד גם ב-preview

### מה זה Production Domain?

ה-domain הבסיסי של Vercel נשאר קבוע, למשל:
- `your-app.vercel.app` - זה ה-domain הראשי
- הוא נשאר אותו דבר בכל deployment
- צריך להוסיף אותו **פעם אחת בלבד**

### מה זה Preview Deployments?

כש-Vercel בונה preview של branch חדש, הוא יוצר domain זמני:
- `your-app-git-feature-branch.vercel.app`
- `your-app-git-main-username.vercel.app`

**לא חובה** להוסיף אותם - Google Sign-In יעבוד רק ב-Production domain.

אם אתה רוצה ש-Google Sign-In יעבוד גם ב-Preview deployments, תוכל להוסיף אותם, אבל זה לא נדרש.

## הוראות מפורטות

### שלב 1: מצא את ה-Domain שלך

1. לך ל-[Vercel Dashboard](https://vercel.com/dashboard)
2. בחר את הפרויקט שלך
3. תחת **"Domains"** תראה את ה-domains שלך:
   - Production domain: `your-app.vercel.app`
   - Preview domains: `your-app-git-*.vercel.app` (אופציונלי)

### שלב 2: הוסף ל-Firebase

1. לך ל-[Firebase Console](https://console.firebase.google.com/)
2. בחר את הפרויקט שלך
3. לך ל-**Authentication > Settings**
4. גלול למטה עד **"Authorized domains"**
5. תראה רשימה של domains שכבר מאושרים (למשל: `localhost`, `your-project.firebaseapp.com`)

### שלב 3: הוסף את ה-Domain של Vercel

1. לחץ על **"Add domain"**
2. הזן את ה-domain של Vercel: `your-app.vercel.app`
3. לחץ **Add**
4. **חכה 2-3 דקות** שהשינויים יכנסו לתוקף

### שלב 4: בדיקה

1. פתח את האפליקציה ב-Vercel
2. נסה להירשם/להיכנס עם Google
3. אם הכל עובד - מעולה! ✅

## דוגמאות

### Production Domain (חובה)

```
your-app.vercel.app
```

הוסף פעם אחת - זה נשאר קבוע בכל deployment.

### Custom Domain (אם יש)

```
myapp.com
www.myapp.com
```

הוסף פעם אחת לכל custom domain.

### Preview Domains (אופציונלי)

```
your-app-git-feature-branch.vercel.app
your-app-git-main-username.vercel.app
```

לא חובה להוסיף - רק אם רוצים ש-Google Sign-In יעבוד גם ב-preview.

## טיפים

1. **הוסף פעם אחת**: ה-domain הבסיסי נשאר קבוע, אז תוסיף אותו פעם אחת
2. **Custom domains**: אם יש לך custom domain, הוסף אותו גם פעם אחת
3. **Preview deployments**: לא חובה להוסיף - רק אם אתה צריך Google Sign-In גם שם
4. **בדיקה**: אחרי הוספת domain, חכה כמה דקות לפני הבדיקה

## מה קורה ב-Deployments?

- **Deployment חדש עם אותו domain**: לא צריך לעשות כלום ✅
- **Deployment עם domain חדש**: צריך להוסיף את ה-domain החדש ב-Firebase
- **Preview deployment**: לא חובה להוסיף (אלא אם רוצים Google Sign-In שם)

## סיכום

✅ **צריך לעדכן**: רק כשמשנים את ה-domain  
❌ **לא צריך לעדכן**: בכל deployment רגיל עם אותו domain  
🎯 **הכלל**: הוסף את ה-domain פעם אחת, והוא יעבוד לכל ה-deployments עם אותו domain

