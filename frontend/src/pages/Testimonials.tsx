import { useEffect, useState } from 'react';
import { Rate } from 'antd';
import type { Testimonial } from '../types';
import { getTestimonials } from '../services/api';
import styles from './Testimonials.module.scss';

const defaults: Testimonial[] = [
  { _id: '1', name: 'יוסי כהן', text: 'שירות מעולה! צביקה הגיע תוך שעה, תיקן את הנזילה במקצועיות ונקיון. ממליץ בחום לכולם!', rating: 5, city: 'אשקלון', date: '05/2024', active: true },
  { _id: '2', name: 'רחל לוי', text: 'אמין, מקצועי ובמחיר הוגן. תיקן את הדוד תוך שעתיים ועזר גם בבעיות אחרות. שירות מעולה!', rating: 5, city: 'קריית גת', date: '04/2024', active: true },
  { _id: '3', name: 'דוד אברהם', text: 'פתח סתימה קשה שאחרים לא הצליחו. עבד בנקיון מלא ולא עזב לפני שוידא שהכל עובד. מקצוען!', rating: 5, city: 'נתיבות', date: '03/2024', active: true },
  { _id: '4', name: 'מיכל שפירא', text: 'שיפצנו את חדר השירות ביחד עם צביקה. תוצאה מדהימה! עבודה קפדנית ובמחיר מצוין.', rating: 5, city: 'אופקים', date: '02/2024', active: true },
  { _id: '5', name: 'אבי מזרחי', text: 'התקין לי דוד שמש חדש. הגיע בזמן, עבד מהר ומסודר. ממליץ לכולם בלי היסוס!', rating: 5, city: 'באר שבע', date: '01/2024', active: true },
  { _id: '6', name: 'שרה ביטון', text: 'נזילה חירום בלילה - צביקה הגיע תוך 45 דקות. הציל לנו את הבית! מחיר הוגן גם לחירום.', rating: 5, city: 'אשקלון', date: '12/2023', active: true },
];

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(defaults);

  useEffect(() => {
    getTestimonials().then(d => { if (d.length > 0) setItems(d); }).catch(() => {});
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <h1>המלצות <span>לקוחות</span></h1>
        <p>מה אומרים עלינו הלקוחות המרוצים שלנו</p>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {items.map((t) => (
            <div key={t._id} className={styles.card}>
              <div className={styles.stars}>
                <Rate disabled defaultValue={t.rating} />
              </div>
              <p className={styles.text}>{t.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.name[0]}</div>
                <div className={styles.info}>
                  <h4>{t.name}</h4>
                  <span>{t.city}</span>
                </div>
                {t.date && <span className={styles.date}>{t.date}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.summary}>
        <h2>הנתונים שמספרים הכל</h2>
        <div className={styles.sumGrid}>
          <div className={styles.sumItem}>
            <span className={styles.num}>1200+</span>
            <span className={styles.lbl}>לקוחות מרוצים</span>
          </div>
          <div className={styles.sumItem}>
            <span className={styles.num}>5⭐</span>
            <span className={styles.lbl}>דירוג ממוצע</span>
          </div>
          <div className={styles.sumItem}>
            <span className={styles.num}>98%</span>
            <span className={styles.lbl}>המלצות חוזרות</span>
          </div>
        </div>
      </section>
    </>
  );
}
