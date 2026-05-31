import { useEffect, useState } from 'react';
import {
  ToolOutlined, FireOutlined, HomeOutlined,
  SearchOutlined, BuildOutlined, PhoneOutlined, SafetyCertificateOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import type { Service } from '../types';
import { getServices } from '../services/api';
import styles from './Services.module.scss';

const defaults: Service[] = [
  { _id: '1', title: 'אינסטלציה כללית', description: 'התקנה ותיקון של צינורות מים, ברזים, כיורים, אסלות ומכשירים סניטריים. שירות מקיף לבתי מגורים ועסקים.', icon: 'tool', order: 1, active: true },
  { _id: '2', title: 'פתיחת סתימות', description: 'פתיחת סתימות מהירה ומקצועית בשירותים, מטבח, מרפסת, ורכז ביוב. עם ציוד מתקדם לכל סוגי הסתימות.', icon: 'drop', order: 2, active: true },
  { _id: '3', title: 'תיקון והחלפת דוודים', description: 'תיקון והחלפה של דוודי שמש, דוודי חשמל, ומחממי מים. אחריות מלאה על כל עבודה.', icon: 'fire', order: 3, active: true },
  { _id: '4', title: 'התקנת מקלחות ואמבטיות', description: 'התקנה מקצועית של מקלחות, אמבטיות, ג׳קוזי ויחידות מקלחת מכל הסוגים.', icon: 'home', order: 4, active: true },
  { _id: '5', title: 'זיהוי ותיקון נזילות', description: 'איתור נזילות נסתרות בעזרת ציוד אלקטרוני מתקדם. תיקון מהיר עם מינימום נזק לרכוש.', icon: 'search', order: 5, active: true },
  { _id: '6', title: 'עבודות ריצוף וחיפוי', description: 'ריצוף מקצועי של חדרי שירותים ומטבחים, חיפוי קירות, ותיקוני ריצוף קיים.', icon: 'build', order: 6, active: true },
  { _id: '7', title: 'התקנת מערכות מים', description: 'תכנון והתקנה של מערכות אספקת מים, מונים, ומסנני מים לבתים ועסקים.', icon: 'tool', order: 7, active: true },
  { _id: '8', title: 'שירות חירום 24/7', description: 'זמינים עבורכם 24 שעות, 7 ימים בשבוע לכל תקלת אינסטלציה דחופה.', icon: 'thunder', order: 8, active: true },
  { _id: '9', title: 'שיפוץ מטבחים ושירותים', description: 'שיפוץ מלא של חדרי שירותים ומטבחים, כולל ריצוף, חיפוי, ואינסטלציה חדשה.', icon: 'safe', order: 9, active: true },
];

const iconMap: Record<string, React.ReactNode> = {
  tool: <ToolOutlined />,
  drop: <ToolOutlined />,
  fire: <FireOutlined />,
  home: <HomeOutlined />,
  search: <SearchOutlined />,
  build: <BuildOutlined />,
  thunder: <ThunderboltOutlined />,
  safe: <SafetyCertificateOutlined />,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>(defaults);

  useEffect(() => {
    getServices().then(d => { if (d.length > 0) setServices(d); }).catch(() => {});
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>השירותים <span>שלנו</span></h1>
          <p>מגוון שירותי אינסטלציה מקצועיים לבית ולעסק באשקלון והדרום</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {services.map((s) => (
            <div key={s._id} className={styles.card}>
              <div className={styles.icon}>
                {iconMap[s.icon] || <ToolOutlined />}
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <a href="tel:050-1234567" className={styles.callBtn}>
                <PhoneOutlined /> התקשר לפרטים
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>זקוקים לשירות מיידי?</h2>
        <a href="tel:050-1234567">
          <PhoneOutlined /> 050-1234567 - התקשר עכשיו
        </a>
      </section>
    </>
  );
}
