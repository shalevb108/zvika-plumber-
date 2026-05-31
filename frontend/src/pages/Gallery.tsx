import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { PictureOutlined, CloseOutlined } from '@ant-design/icons';
import type { GalleryItem } from '../types';
import { getGallery } from '../services/api';
import styles from './Gallery.module.scss';

const defaults: GalleryItem[] = [
  { _id: '1', imageUrl: '', title: 'החלפת ברז מטבח', description: 'החלפת ברז ישן בברז מודרני', category: 'מטבח', order: 1 },
  { _id: '2', imageUrl: '', title: 'תיקון צינור נזילה', description: 'תיקון נזילה בצינור קיר', category: 'נזילות', order: 2 },
  { _id: '3', imageUrl: '', title: 'התקנת מקלחת', description: 'התקנת מקלחת עם זכוכית', category: 'שירותים', order: 3 },
  { _id: '4', imageUrl: '', title: 'ריצוף שירותים', description: 'ריצוף חדש בחדר שירות', category: 'ריצוף', order: 4 },
  { _id: '5', imageUrl: '', title: 'התקנת דוד שמש', description: 'התקנת דוד שמש על גג', category: 'דוודים', order: 5 },
  { _id: '6', imageUrl: '', title: 'פתיחת סתימה', description: 'פתיחת סתימה קשה בביוב', category: 'סתימות', order: 6 },
  { _id: '7', imageUrl: '', title: 'שיפוץ חדר אמבטיה', description: 'שיפוץ מלא כולל ריצוף', category: 'שיפוצים', order: 7 },
  { _id: '8', imageUrl: '', title: 'התקנת כיור מטבח', description: 'כיור עם מסננת מיוחדת', category: 'מטבח', order: 8 },
  { _id: '9', imageUrl: '', title: 'תיקון מאסטר פלב', description: 'תיקון מאסטר פלב כולל', category: 'כללי', order: 9 },
];

const categories = ['הכל', 'מטבח', 'שירותים', 'נזילות', 'דוודים', 'ריצוף', 'סתימות', 'שיפוצים', 'כללי'];

const gradients = [
  'linear-gradient(135deg, #1565C0, #1976D2)',
  'linear-gradient(135deg, #0D47A1, #1565C0)',
  'linear-gradient(135deg, #FF6B00, #FF8C00)',
  'linear-gradient(135deg, #1976D2, #42A5F5)',
  'linear-gradient(135deg, #0D47A1, #1E88E5)',
  'linear-gradient(135deg, #FF6B00, #FF9800)',
];

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>(defaults);
  const [filter, setFilter] = useState('הכל');
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    getGallery().then(d => { if (d.length > 0) setItems(d); }).catch(() => {});
  }, []);

  const filtered = filter === 'הכל' ? items : items.filter(i => i.category === filter);

  return (
    <>
      <section className={styles.hero}>
        <h1>גלריית <span>עבודות</span></h1>
        <p>צפו בחלק מהעבודות שביצענו עבור לקוחותינו המרוצים</p>
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

          <div className={styles.masonry}>
            {filtered.map((item, idx) => (
              <div key={item._id} className={styles.item} onClick={() => setSelected(item)}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} loading="lazy" />
                ) : (
                  <div
                    className={styles.placeholder}
                    style={{ background: gradients[idx % gradients.length] }}
                  >
                    <PictureOutlined style={{ color: 'rgba(255,255,255,0.5)' }} />
                  </div>
                )}
                <div className={styles.overlay}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal
        open={!!selected}
        onCancel={() => setSelected(null)}
        footer={null}
        width={600}
        className={styles.modal}
        closeIcon={<CloseOutlined />}
        destroyOnClose
      >
        {selected && (
          <>
            {selected.imageUrl ? (
              <img src={selected.imageUrl} alt={selected.title} />
            ) : (
              <div style={{
                height: 300,
                background: gradients[0],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                color: 'rgba(255,255,255,0.4)',
              }}>
                <PictureOutlined />
              </div>
            )}
            <div className={styles.modalInfo}>
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
              <p style={{ color: '#1565C0', fontWeight: 600, marginTop: 8 }}>
                קטגוריה: {selected.category}
              </p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
