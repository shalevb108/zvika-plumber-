import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PhoneOutlined, ToolOutlined, FireOutlined,
  CheckCircleOutlined, StarFilled, SafetyCertificateOutlined,
  ThunderboltOutlined, ClockCircleOutlined, TeamOutlined,
} from '@ant-design/icons';
import type { Service, Testimonial } from '../types';
import { getServices, getTestimonials } from '../services/api';
import styles from './Home.module.scss';

const defaultServices: Service[] = [
  { _id: '1', title: 'אינסטלציה כללית', description: 'התקנה ותיקון של צינורות, ברזים ומערכות אינסטלציה לבתים ועסקים.', icon: 'tool', order: 1, active: true },
  { _id: '2', title: 'פתיחת סתימות', description: 'פתיחת סתימות מקצועית בשירותים, מטבח, ורכז ביוב – מהיר ויעיל.', icon: 'drop', order: 2, active: true },
  { _id: '3', title: 'תיקון דוודים', description: 'תיקון והחלפה של דוודי שמש וחשמל, אחריות מלאה על העבודה.', icon: 'fire', order: 3, active: true },
  { _id: '4', title: 'התקנת מקלחות ואמבטיות', description: 'התקנה מקצועית של מקלחות, אמבטיות ויחידות אמבטיה.', icon: 'home', order: 4, active: true },
  { _id: '5', title: 'זיהוי ותיקון נזילות', description: 'איתור נזילות נסתרות בעזרת ציוד מתקדם ותיקון מהיר.', icon: 'search', order: 5, active: true },
  { _id: '6', title: 'עבודות ריצוף וחיפוי', description: 'ריצוף ועבודות לוחות בחדרי שירותים ומטבחים.', icon: 'build', order: 6, active: true },
];

const defaultTestimonials: Testimonial[] = [
  { _id: '1', name: 'יוסי כהן', text: 'שירות מעולה! צביקה הגיע תוך שעה, תיקן את הנזילה במקצועיות. ממליץ בחום!', rating: 5, city: 'אשקלון', date: '2024-05', active: true },
  { _id: '2', name: 'רחל לוי', text: 'אמין, מקצועי ובמחיר הוגן. תיקן את הדוד תוך שעתיים. אחלה שירות!', rating: 5, city: 'קריית גת', date: '2024-04', active: true },
  { _id: '3', name: 'דוד אברהם', text: 'פתח סתימה קשה שאחרים לא הצליחו. מקצוען אמיתי! בהחלט אפנה שוב.', rating: 5, city: 'נתיבות', date: '2024-03', active: true },
];

const serviceIcons: Record<string, React.ReactNode> = {
  tool: <ToolOutlined />,
  drop: <ToolOutlined />,
  fire: <FireOutlined />,
  home: <ToolOutlined />,
  search: <SafetyCertificateOutlined />,
  build: <ThunderboltOutlined />,
};

export default function Home() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);

  useEffect(() => {
    getServices().then(d => { if (d.length > 0) setServices(d); }).catch(() => {});
    getTestimonials().then(d => { if (d.length > 0) setTestimonials(d.slice(0, 3)); }).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <SafetyCertificateOutlined />
            אינסטלטור מורשה ומוסמך
          </div>
          <h1 className={styles.heroTitle}>
            צביקה סופר
            <span>אינסטלטור מקצועי</span>
          </h1>
          <p className={styles.heroSubtitle}>
            שירות אינסטלציה מהיר, אמין ומקצועי באשקלון וכל אזור הדרום. זמינים 24/7 לתקלות דחופות.
          </p>
          <div className={styles.heroActions}>
            <a href="tel:054-775-5054" className={styles.heroBtnPrimary}>
              <PhoneOutlined /> התקשר עכשיו
            </a>
            <button className={styles.heroBtnSecondary} onClick={() => navigate('/services')}>
              <ToolOutlined /> השירותים שלנו
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>20<span className={styles.statSuffix}>+</span></span>
            <span className={styles.statLabel}>שנות ניסיון</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>1500<span className={styles.statSuffix}>+</span></span>
            <span className={styles.statLabel}>פרויקטים הושלמו</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>24<span className={styles.statSuffix}>/7</span></span>
            <span className={styles.statLabel}>זמינות לחירום</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>100<span className={styles.statSuffix}>%</span></span>
            <span className={styles.statLabel}>לקוחות מרוצים</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <h2 className="section-title">
            <span>השירותים</span> שלנו
          </h2>
          <p className="section-subtitle">מגוון שירותי אינסטלציה מקצועיים לביתך ועסקך</p>
        </div>
        <div className={styles.servicesGrid}>
          {services.slice(0, 6).map((s) => (
            <div key={s._id} className={styles.serviceCard} onClick={() => navigate('/services')}>
              <div className={styles.cardIcon}>
                {serviceIcons[s.icon] || <ToolOutlined />}
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className={styles.whyUs}>
        <div className={styles.whyGrid}>
          <div className={styles.whyContent}>
            <h2>למה לבחור ב<span>צביקה סופר</span>?</h2>
            <p>
              עם ניסיון של יותר מ-20 שנה בתחום האינסטלציה, אנחנו מספקים שירות שאפשר לסמוך עליו. מהגעה מהירה ועד עבודה מסודרת ונקייה.
            </p>
            <ul className={styles.whyList}>
              {[
                { title: 'הגעה מהירה', desc: 'מגיעים אליך תוך שעה בחירום', icon: <ThunderboltOutlined /> },
                { title: 'מחיר הוגן ושקוף', desc: 'הצעת מחיר לפני העבודה, ללא הפתעות', icon: <SafetyCertificateOutlined /> },
                { title: 'אחריות על העבודה', desc: 'אחריות מלאה על כל עבודה שמבוצעת', icon: <CheckCircleOutlined /> },
                { title: 'ניסיון וותיק', desc: 'מעל 20 שנה של ניסיון בתחום', icon: <TeamOutlined /> },
              ].map((item, i) => (
                <li key={i} className={styles.whyItem}>
                  <div className={styles.checkIcon}>{item.icon}</div>
                  <div className={styles.whyText}>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.whyImageBox}>
            <div className={styles.bigIcon}><ToolOutlined /></div>
            <h3>צביקה סופר - אינסטלטור מוסמך</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
              רישיון אינסטלטור מס׳ 12345<br />
              חבר לשכת האינסטלטורים בישראל
            </p>
            <div className={styles.statsInner}>
              <div className={styles.innerStat}>
                <div className={styles.num}>20+</div>
                <div className={styles.lbl}>שנות ניסיון</div>
              </div>
              <div className={styles.innerStat}>
                <div className={styles.num}>1500+</div>
                <div className={styles.lbl}>פרויקטים</div>
              </div>
              <div className={styles.innerStat}>
                <div className={styles.num}>24/7</div>
                <div className={styles.lbl}>זמינות</div>
              </div>
              <div className={styles.innerStat}>
                <div className={styles.num}>5⭐</div>
                <div className={styles.lbl}>דירוג ממוצע</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <h2 className="section-title">מה אומרים עלינו <span>הלקוחות</span>?</h2>
          <p className="section-subtitle">הלקוחות שלנו מספרים על חוויית השירות</p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t) => (
            <div key={t._id} className={styles.testimonialCard}>
              <div className={styles.stars}>
                {Array.from({ length: t.rating }, (_, i) => <StarFilled key={i} />)}
              </div>
              <p className={styles.text}>{t.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.name[0]}</div>
                <div className={styles.info}>
                  <h4>{t.name}</h4>
                  <span>{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <h2>צריך אינסטלטור עכשיו?</h2>
          <p>
            זמינים 24 שעות ביממה, 7 ימים בשבוע. התקשר ונגיע אליך מהר!
          </p>
          <a href="tel:054-775-5054" className={styles.ctaBtn}>
            <PhoneOutlined /> <ClockCircleOutlined /> 054-775-5054
          </a>
        </div>
      </section>
    </>
  );
}
