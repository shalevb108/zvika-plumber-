import { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import type { FaqItem } from '../types';
import { getFaq } from '../services/api';
import styles from './Faq.module.scss';

const defaults: FaqItem[] = [
  { _id: '1', question: 'כמה עולה שיחת חירום?', answer: 'לשיחות חירום בשעות הלילה ובסופי שבוע יש תוספת של ₪150. המחיר הסופי ייקבע לאחר אבחון הבעיה, והצעת מחיר מלאה ניתנת לפני תחילת העבודה.', category: 'מחירים', order: 1, active: true },
  { _id: '2', question: 'כמה זמן לוקח להגיע?', answer: 'בחירום אנחנו מגיעים תוך 45-90 דקות. בתיאום מראש - בזמן שנקבע יחד. אנחנו מכבדים את הזמן שלכם.', category: 'שירות', order: 2, active: true },
  { _id: '3', question: 'האם יש אחריות על העבודה?', answer: 'כן! כל עבודה מגיעה עם אחריות מלאה. אם יש בעיה בעקבות העבודה שביצענו, אנחנו חוזרים ומתקנים ללא תשלום נוסף.', category: 'אחריות', order: 3, active: true },
  { _id: '4', question: 'אילו אזורים משרתים?', answer: 'אנחנו נותנים שירות לאשקלון וכל אזור הדרום: קריית גת, נתיבות, שדרות, אופקים, ובאר שבע. לאזורים רחוקים יותר - יש לתאם מראש.', category: 'שירות', order: 4, active: true },
  { _id: '5', question: 'איך משלמים?', answer: 'מקבלים תשלום במזומן, בכרטיס אשראי, ובביט/פייבוקס. נותנים קבלה על כל עסקה.', category: 'תשלום', order: 5, active: true },
  { _id: '6', question: 'האם צביקה מוסמך ורשאי לעבוד?', answer: 'כן! צביקה הוא אינסטלטור מוסמך ומורשה עם רישיון מס׳ 12345. חבר לשכת האינסטלטורים בישראל ומבוטח בביטוח מקצועי מלא.', category: 'הסמכות', order: 6, active: true },
  { _id: '7', question: 'האם ניתן לקבל חשבונית?', answer: 'כן, נותנים חשבונית מס לכל עסקה. ניתן לקבל חשבונית מס מקורית לכל צרכי ניכוי.', category: 'תשלום', order: 7, active: true },
  { _id: '8', question: 'מה עושים במקרה של נזילה חירום?', answer: 'סגרו את ברז הראשי לפני שמתקשרים. תמצאו אותו בדרך כלל בכניסה לבית. לאחר מכן התקשרו ל-054-775-5054 ונגיע מהר ככל האפשר.', category: 'חירום', order: 8, active: true },
];

export default function Faq() {
  const [items, setItems] = useState<FaqItem[]>(defaults);

  useEffect(() => {
    getFaq().then(d => { if (d.length > 0) setItems(d); }).catch(() => {});
  }, []);

  const collapseItems = items.map(item => ({
    key: item._id,
    label: item.question,
    children: <p>{item.answer}</p>,
  }));

  return (
    <>
      <section className={styles.hero}>
        <h1>שאלות <span>נפוצות</span></h1>
        <p>תשובות לשאלות הנפוצות ביותר שקיבלנו מלקוחותינו</p>
      </section>

      <section className={styles.section}>
        <div className={styles.layout}>
          <div className={styles.accordion}>
            <Collapse
              items={collapseItems}
              accordion
              expandIconPosition="start"
            />
          </div>

          <div className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h3>אזורי שירות</h3>
              <ul>
                {['אשקלון', 'קריית גת', 'נתיבות', 'שדרות', 'אופקים', 'באר שבע', 'יבנה', 'אשדוד'].map(city => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </div>

            <div className={styles.sideCard}>
              <h3>שעות פעילות</h3>
              <p>ראשון - חמישי: 07:00 - 20:00</p>
              <p>שישי: 07:00 - 14:00</p>
              <p style={{ marginTop: 8, color: '#1565C0', fontWeight: 600 }}>
                שירות חירום זמין 24/7!
              </p>
            </div>

            <div className={styles.ctaCard}>
              <h3>לא מצאת תשובה?</h3>
              <p>פשוט התקשר אלינו ונשמח לעזור</p>
              <a href="tel:054-775-5054">
                <PhoneOutlined /> 054-775-5054
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
