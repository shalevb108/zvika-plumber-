import { useEffect, useState } from 'react';
import {
  SafetyCertificateOutlined, StarOutlined, ThunderboltOutlined,
  HeartOutlined, TeamOutlined, ClockCircleOutlined, CheckCircleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import type { SiteInfo } from '../types';
import { getSiteInfo } from '../services/api';
import styles from './About.module.scss';

const defaultInfo: SiteInfo = {
  phone: '050-1234567',
  whatsapp: '972501234567',
  email: 'zvika@plumber.co.il',
  address: 'אשקלון, ישראל',
  city: 'אשקלון',
  businessHours: 'ראשון-חמישי 07:00-20:00, שישי 07:00-14:00',
  heroTitle: 'צביקה סופר - אינסטלטור מקצועי',
  heroSubtitle: 'שירות מהיר, אמין ומקצועי באשקלון והדרום',
  aboutText: 'אני צביקה סופר, אינסטלטור מוסמך עם ניסיון של מעל 20 שנה. מספק שירות מקצועי, אמין ומהיר לבתים, עסקים ומפעלים באשקלון וכל אזור הדרום. אני מאמין שאינסטלטור טוב הוא זה שמגיע בזמן, עובד בנקיון, ומשאיר את הבית מסודר כמו שמצא אותו.',
  licenseNumber: '12345',
  yearsExperience: 20,
  projectsCompleted: 1500,
  happyClients: 1200,
};

export default function About() {
  const [info, setInfo] = useState<SiteInfo>(defaultInfo);

  useEffect(() => {
    getSiteInfo().then(d => setInfo(d)).catch(() => {});
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <h1>אודות <span>צביקה סופר</span></h1>
        <p>הכירו את האינסטלטור המקצועי שלכם</p>
      </section>

      <section className={styles.bio}>
        <div className={styles.bioGrid}>
          <div className={styles.bioImage}>
            <div className={styles.avatar}>זס</div>
            <h2>צביקה סופר</h2>
            <p className={styles.role}>אינסטלטור מוסמך ומורשה</p>
            <div className={styles.badges}>
              <span className={styles.badge}>מוסמך</span>
              <span className={styles.badge}>מורשה</span>
              <span className={styles.badge}>20+ שנה</span>
              <span className={styles.badge}>אשקלון</span>
            </div>
          </div>

          <div className={styles.bioContent}>
            <h2>מי אני <span>ולמה לבחור בי</span>?</h2>
            <p>{info.aboutText}</p>
            <p>
              אני מתמחה בכל תחומי האינסטלציה: פתיחת סתימות, תיקון נזילות, התקנת דוודים, שיפוץ שירותים ומטבחים, ועוד. אני מגיע לכל קריאה מצוייד בכלים הנכונים ובחלקי חילוף, כדי לחסוך לכם זמן.
            </p>

            <div className={styles.credentials}>
              {[
                { icon: <SafetyCertificateOutlined />, text: `רישיון אינסטלטור מוסמך מס׳ ${info.licenseNumber}` },
                { icon: <TrophyOutlined />, text: 'חבר לשכת האינסטלטורים בישראל' },
                { icon: <CheckCircleOutlined />, text: 'מבוטח בביטוח מקצועי מלא' },
                { icon: <StarOutlined />, text: 'דירוג ממוצע 5 כוכבים על גוגל' },
              ].map((c, i) => (
                <div key={i} className={styles.credItem}>
                  <span className={styles.icon}>{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">המספרים <span>מדברים</span></h2>
        </div>
        <div className={styles.statsGrid}>
          {[
            { num: info.yearsExperience, suf: '+', lbl: 'שנות ניסיון' },
            { num: info.projectsCompleted, suf: '+', lbl: 'פרויקטים הושלמו' },
            { num: info.happyClients, suf: '+', lbl: 'לקוחות מרוצים' },
            { num: 24, suf: '/7', lbl: 'זמינות לחירום' },
          ].map((s, i) => (
            <div key={i} className={styles.statCard}>
              <span className={styles.num}>{s.num}<span className={styles.suf}>{s.suf}</span></span>
              <span className={styles.lbl}>{s.lbl}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.values}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">הערכים <span>שלנו</span></h2>
        </div>
        <div className={styles.valuesGrid}>
          {[
            { icon: <ThunderboltOutlined />, title: 'מהירות ויעילות', desc: 'מגיעים מהר, עובדים ביעילות. מכבדים את הזמן שלכם.' },
            { icon: <HeartOutlined />, title: 'אמינות ויושרה', desc: 'מחיר הוגן ושקוף מראש. ללא הפתעות בסוף.' },
            { icon: <SafetyCertificateOutlined />, title: 'מקצועיות ואיכות', desc: 'עבודה לפי תקן גבוה עם חומרים איכותיים.' },
            { icon: <TeamOutlined />, title: 'שירות אישי', desc: 'יחס אישי לכל לקוח. תמיד זמינים לשאלות.' },
            { icon: <ClockCircleOutlined />, title: 'זמינות 24/7', desc: 'זמינים לחירום בכל שעה, כולל שבתות וחגים.' },
            { icon: <CheckCircleOutlined />, title: 'אחריות מלאה', desc: 'אחריות על כל עבודה. באים לתקן אם יש בעיה.' },
          ].map((v, i) => (
            <div key={i} className={styles.valueCard}>
              <div className={styles.icon}>{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
