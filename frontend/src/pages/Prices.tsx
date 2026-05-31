import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { PriceItem } from '../types';
import { getPrices } from '../services/api';
import styles from './Prices.module.scss';

const defaults: PriceItem[] = [
  { _id: '1', service: 'פתיחת סתימה פשוטה', price: '₪200-₪350', category: 'סתימות', note: '', order: 1 },
  { _id: '2', service: 'פתיחת סתימה קשה', price: '₪350-₪600', category: 'סתימות', note: 'כולל שימוש בציוד מיוחד', order: 2 },
  { _id: '3', service: 'החלפת ברז רגיל', price: '₪150-₪250', category: 'ברזים', note: 'לא כולל חומרים', order: 3 },
  { _id: '4', service: 'החלפת ברז מטבח', price: '₪200-₪350', category: 'ברזים', note: 'כולל התקנה', order: 4 },
  { _id: '5', service: 'תיקון דוד שמש', price: '₪300-₪500', category: 'דוודים', note: 'תלוי בסוג הבעיה', order: 5 },
  { _id: '6', service: 'החלפת דוד שמש', price: '₪1,500-₪3,000', category: 'דוודים', note: 'כולל התקנה, לא כולל דוד', order: 6 },
  { _id: '7', service: 'תיקון נזילה בצינור', price: '₪250-₪400', category: 'נזילות', note: 'לא כולל שבירת קיר', order: 7 },
  { _id: '8', service: 'איתור נזילה נסתרת', price: '₪300-₪500', category: 'נזילות', note: 'כולל ציוד אלקטרוני', order: 8 },
  { _id: '9', service: 'התקנת כיור מטבח', price: '₪200-₪350', category: 'התקנות', note: 'לא כולל כיור', order: 9 },
  { _id: '10', service: 'התקנת אסלה', price: '₪200-₪400', category: 'התקנות', note: 'לא כולל אסלה', order: 10 },
  { _id: '11', service: 'התקנת מקלחת', price: '₪400-₪700', category: 'התקנות', note: 'לא כולל ציוד', order: 11 },
  { _id: '12', service: 'ריצוף שירותים (מ"ר)', price: '₪150-₪250', category: 'ריצוף', note: 'לא כולל חומרים', order: 12 },
  { _id: '13', service: 'שיחת חירום (24/7)', price: '₪150 תוספת', category: 'חירום', note: 'בנוסף למחיר השירות', order: 13 },
];

const allCategories = ['הכל', ...Array.from(new Set(defaults.map(d => d.category)))];

const columns = [
  {
    title: 'שירות',
    dataIndex: 'service',
    key: 'service',
    render: (text: string) => <strong>{text}</strong>,
  },
  {
    title: 'מחיר משוער',
    dataIndex: 'price',
    key: 'price',
    render: (text: string) => (
      <span style={{ color: '#1565C0', fontWeight: 700, fontSize: '1rem' }}>{text}</span>
    ),
  },
  {
    title: 'הערות',
    dataIndex: 'note',
    key: 'note',
    render: (text: string) => text ? <span style={{ color: '#666', fontSize: '0.85rem' }}>{text}</span> : '-',
  },
];

export default function Prices() {
  const [prices, setPrices] = useState<PriceItem[]>(defaults);
  const [filter, setFilter] = useState('הכל');
  const [categories, setCategories] = useState(allCategories);

  useEffect(() => {
    getPrices().then(d => {
      if (d.length > 0) {
        setPrices(d);
        setCategories(['הכל', ...Array.from(new Set(d.map(i => i.category)))]);
      }
    }).catch(() => {});
  }, []);

  const filtered = filter === 'הכל' ? prices : prices.filter(p => p.category === filter);

  return (
    <>
      <section className={styles.hero}>
        <h1><span>מחירון</span> שירותים</h1>
        <p>מחירים הוגנים ושקופים - ללא הפתעות</p>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.filterBar}>
            {categories.map(c => (
              <button
                key={c}
                className={`${styles.filterBtn} ${filter === c ? styles.active : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className={styles.tableWrap}>
            <Table
              dataSource={filtered}
              columns={columns}
              rowKey="_id"
              pagination={false}
              locale={{ emptyText: 'אין פריטים' }}
            />
          </div>

          <div className={styles.note}>
            <InfoCircleOutlined style={{ color: '#FF6B00', fontSize: '1.1rem', marginTop: 2 }} />
            <div>
              <strong>שימו לב:</strong> המחירים המוצגים הם משוערים בלבד. המחיר הסופי נקבע לאחר ביקור ואבחון בשטח.
              הצעת מחיר מלאה ניתנת לפני תחילת כל עבודה, ללא התחייבות.
              לפרטים ותיאום: <a href="tel:054-775-5054" style={{ color: '#1565C0', fontWeight: 600 }}>054-775-5054</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
