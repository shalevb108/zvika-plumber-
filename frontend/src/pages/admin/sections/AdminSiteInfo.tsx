import { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card, Spin } from 'antd';
import type { SiteInfo } from '../../../types';
import { getSiteInfo, updateSiteInfo } from '../../../services/api';

export default function AdminSiteInfo() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSiteInfo().then(data => {
      form.setFieldsValue(data);
    }).catch(() => {
      message.error('שגיאה בטעינת הגדרות');
    }).finally(() => setLoading(false));
  }, [form]);

  const onSave = async (values: Partial<SiteInfo>) => {
    setSaving(true);
    try {
      await updateSiteInfo(values);
      message.success('הגדרות האתר עודכנו בהצלחה!');
    } catch {
      message.error('שגיאה בשמירת הגדרות');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>;

  return (
    <div>
      <h2 style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, marginBottom: 24 }}>הגדרות האתר</h2>

      <Form form={form} layout="vertical" onFinish={onSave}>
        <Card title="פרטי יצירת קשר" style={{ marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <Form.Item name="phone" label="טלפון"><Input /></Form.Item>
            <Form.Item name="whatsapp" label="וואטסאפ (ספרות בלבד)"><Input /></Form.Item>
            <Form.Item name="email" label="אימייל"><Input /></Form.Item>
            <Form.Item name="address" label="כתובת"><Input /></Form.Item>
            <Form.Item name="city" label="עיר"><Input /></Form.Item>
            <Form.Item name="businessHours" label="שעות פעילות"><Input /></Form.Item>
          </div>
        </Card>

        <Card title="תוכן ראשי" style={{ marginBottom: 24 }}>
          <Form.Item name="heroTitle" label="כותרת ראשית"><Input /></Form.Item>
          <Form.Item name="heroSubtitle" label="כותרת משנה"><Input /></Form.Item>
          <Form.Item name="aboutText" label="טקסט אודות">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Card>

        <Card title="נתונים סטטיסטיים" style={{ marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0 24px' }}>
            <Form.Item name="licenseNumber" label="מספר רישיון"><Input /></Form.Item>
            <Form.Item name="yearsExperience" label="שנות ניסיון"><Input type="number" /></Form.Item>
            <Form.Item name="projectsCompleted" label="פרויקטים"><Input type="number" /></Form.Item>
            <Form.Item name="happyClients" label="לקוחות מרוצים"><Input type="number" /></Form.Item>
          </div>
        </Card>

        <Button type="primary" htmlType="submit" loading={saving} size="large" style={{ minWidth: 160 }}>
          שמור שינויים
        </Button>
      </Form>
    </div>
  );
}
