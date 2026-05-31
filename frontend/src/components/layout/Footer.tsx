import { useNavigate } from 'react-router-dom';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, ClockCircleOutlined, ToolOutlined } from '@ant-design/icons';
import styles from './Footer.module.scss';

const navLinks = [
  { label: 'דף הבית', path: '/' },
  { label: 'שירותים', path: '/services' },
  { label: 'גלריה', path: '/gallery' },
  { label: 'מחירון', path: '/prices' },
  { label: 'אודות', path: '/about' },
  { label: 'צור קשר', path: '/contact' },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.wave}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,0 L0,0 Z" fill="#f5f7fa" />
        </svg>
      </div>

      <div className={styles.content}>
        <div className={`${styles.col} ${styles.brand}`}>
          <div className={styles.logo}>
            <div className={styles.icon}><ToolOutlined /></div>
            <span className={styles.name}>צביקה סופר</span>
          </div>
          <p>
            אינסטלטור מוסמך עם ניסיון של מעל 20 שנה. מספקים שירות מקצועי, אמין ומהיר לבתים ועסקים באשקלון וכל אזור הדרום.
          </p>
        </div>

        <div className={styles.col}>
          <h3>ניווט מהיר</h3>
          <ul className={styles.links}>
            {navLinks.map((item) => (
              <li key={item.path} onClick={() => navigate(item.path)}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3>שירותים</h3>
          <ul className={styles.links}>
            <li>אינסטלציה כללית</li>
            <li>פתיחת סתימות</li>
            <li>תיקון דוודים</li>
            <li>התקנת מקלחות</li>
            <li>החלפת ברזים</li>
            <li>עבודות ריצוף</li>
          </ul>
        </div>

        <div className={styles.col}>
          <h3>צור קשר</h3>
          <div className={styles.contactItem}>
            <PhoneOutlined className={styles.icon} />
            <a href="tel:054-775-5054">054-775-5054</a>
          </div>
          <div className={styles.contactItem}>
            <MailOutlined className={styles.icon} />
            <a href="mailto:zvika@plumber.co.il">zvika@plumber.co.il</a>
          </div>
          <div className={styles.contactItem}>
            <EnvironmentOutlined className={styles.icon} />
            <span>אשקלון, ישראל</span>
          </div>
          <div className={styles.contactItem}>
            <ClockCircleOutlined className={styles.icon} />
            <span>א׳-ה׳ 07:00-20:00<br />ו׳ 07:00-14:00</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} צביקה סופר - כל הזכויות שמורות</span>
        <span className={styles.license}>רישיון אינסטלציה מס׳ 12345</span>
      </div>
    </footer>
  );
}
