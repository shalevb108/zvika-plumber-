import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined, ToolOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';

export default function AdminLogin() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async ({ password }: { password: string }) => {
    const ok = await login(password);
    if (ok) {
      message.success('ברוך הבא לפאנל הניהול!');
      navigate('/admin');
    } else {
      message.error('סיסמה שגויה');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0D47A1, #1565C0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      direction: 'rtl',
    }}>
      <Card
        style={{ width: '100%', maxWidth: 400, borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
        styles={{ body: { padding: '40px' } }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64,
            background: 'linear-gradient(135deg, #1565C0, #1976D2)',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '1.8rem', color: '#fff',
          }}>
            <ToolOutlined />
          </div>
          <h1 style={{ fontFamily: "'Heebo', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 4 }}>
            פאנל ניהול
          </h1>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>צביקה סופר - מערכת ניהול</p>
        </div>

        <Form form={form} onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="password"
            label="סיסמה"
            rules={[{ required: true, message: 'נא להזין סיסמה' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="הזן סיסמה"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%', height: 48, fontWeight: 700, fontSize: '1rem', borderRadius: 8 }}
            >
              כניסה
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
