import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import {
  PhoneOutlined, MailOutlined, EnvironmentOutlined,
  ClockCircleOutlined, SendOutlined,
} from '@ant-design/icons';
import { sendContactMessage } from '../services/api';
import styles from './Contact.module.scss';

const { TextArea } = Input;

export default function Contact() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { name: string; phone: string; email: string; message: string }) => {
    setLoading(true);
    try {
      await sendContactMessage(values);
      message.success('ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.');
      form.resetFields();
    } catch {
      message.error('שגיאה בשליחת ההודעה. נסה שנית.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <h1>צור <span>קשר</span></h1>
        <p>נשמח לעזור - השאירו פרטים ונחזור אליכם מהר</p>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.infoCol}>
            {[
              { icon: <PhoneOutlined />, label: 'טלפון', content: <a href="tel:050-1234567">050-1234567</a> },
              { icon: <MailOutlined />, label: 'אימייל', content: <a href="mailto:zvika@plumber.co.il">zvika@plumber.co.il</a> },
              { icon: <EnvironmentOutlined />, label: 'כתובת', content: <p>אשקלון, ישראל</p> },
              { icon: <ClockCircleOutlined />, label: 'שעות פעילות', content: <><p>ראשון-חמישי: 07:00-20:00</p><p>שישי: 07:00-14:00</p><p style={{ color: '#1565C0', fontWeight: 700, marginTop: 4 }}>חירום: 24/7</p></> },
            ].map((item, i) => (
              <div key={i} className={styles.infoCard}>
                <div className={styles.iconWrap}>{item.icon}</div>
                <div className={styles.infoText}>
                  <h4>{item.label}</h4>
                  {item.content}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.formCard}>
            <h2>שלח הודעה</h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              size="large"
              requiredMark={false}
            >
              <Form.Item
                name="name"
                label="שם מלא"
                rules={[{ required: true, message: 'נא להזין שם' }]}
              >
                <Input placeholder="ישראל ישראלי" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="מספר טלפון"
                rules={[
                  { required: true, message: 'נא להזין מספר טלפון' },
                  { pattern: /^[0-9\-+\s]{9,15}$/, message: 'מספר טלפון לא תקין' },
                ]}
              >
                <Input placeholder="050-1234567" type="tel" />
              </Form.Item>

              <Form.Item
                name="email"
                label="אימייל (אופציונלי)"
                rules={[{ type: 'email', message: 'אימייל לא תקין' }]}
              >
                <Input placeholder="mail@example.com" />
              </Form.Item>

              <Form.Item
                name="message"
                label="הודעה"
                rules={[{ required: true, message: 'נא לכתוב הודעה' }]}
              >
                <TextArea
                  rows={5}
                  placeholder="תאר את הבעיה או השאלה שלך..."
                  showCount
                  maxLength={500}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className={styles.submitBtn}
                  icon={<SendOutlined />}
                >
                  שלח הודעה
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
