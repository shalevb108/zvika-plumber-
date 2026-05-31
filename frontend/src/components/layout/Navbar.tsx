import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer } from 'antd';
import { MenuOutlined, PhoneOutlined, ToolOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './Navbar.module.scss';

const navItems = [
  { label: 'דף הבית', path: '/' },
  { label: 'שירותים', path: '/services' },
  { label: 'גלריה', path: '/gallery' },
  { label: 'מחירון', path: '/prices' },
  { label: 'אודות', path: '/about' },
  { label: 'המלצות', path: '/testimonials' },
  { label: 'שאלות נפוצות', path: '/faq' },
  { label: 'צור קשר', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const goTo = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <div className={styles.logo} onClick={() => goTo('/')}>
            <div className={styles.logoIcon}>
              <ToolOutlined />
            </div>
            <div className={styles.logoText}>
              <span className={styles.name}>צביקה סופר</span>
              <span className={styles.sub}>אינסטלטור מקצועי</span>
            </div>
          </div>

          <ul className={styles.nav}>
            {navItems.map((item) => (
              <li key={item.path}>
                <span
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                  onClick={() => goTo(item.path)}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a href="tel:050-1234567" className={styles.phoneBtn}>
              <PhoneOutlined />
              050-1234567
            </a>
            <button className={styles.menuBtn} onClick={() => setDrawerOpen(true)}>
              <MenuOutlined />
            </button>
          </div>
        </div>
      </nav>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        width={280}
        className={styles.drawer}
        closeIcon={<CloseOutlined />}
        title={
          <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, color: '#1565C0' }}>
            צביקה סופר
          </div>
        }
      >
        <ul className={styles.drawerNav}>
          {navItems.map((item) => (
            <li
              key={item.path}
              className={styles.drawerLink}
              onClick={() => goTo(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <a href="tel:050-1234567" className={styles.drawerPhone}>
          <PhoneOutlined />
          050-1234567
        </a>
      </Drawer>
    </>
  );
}
