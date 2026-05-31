import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Switch, message, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FaqItem } from '../../../types';
import { getFaq, createFaq, updateFaq, deleteFaq } from '../../../services/api';

export default function AdminFaq() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const load = async () => {
    setLoading(true);
    try { setItems(await getFaq()); } catch { message.error('שגיאה'); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); form.resetFields(); form.setFieldsValue({ active: true, order: 0 }); setModalOpen(true); };
  const openEdit = (item: FaqItem) => { setEditing(item); form.setFieldsValue(item); setModalOpen(true); };

  const onSave = async (values: Partial<FaqItem>) => {
    setSaving(true);
    try {
      if (editing) { await updateFaq(editing._id, values); message.success('עודכן'); }
      else { await createFaq(values); message.success('נוצר'); }
      setModalOpen(false); load();
    } catch { message.error('שגיאה'); } finally { setSaving(false); }
  };

  const onDelete = async (id: string) => {
    try { await deleteFaq(id); message.success('נמחק'); load(); }
    catch { message.error('שגיאה'); }
  };

  const columns = [
    { title: 'שאלה', dataIndex: 'question', key: 'question', ellipsis: true },
    { title: 'תשובה', dataIndex: 'answer', key: 'answer', ellipsis: true },
    { title: 'קטגוריה', dataIndex: 'category', key: 'category', width: 100 },
    { title: 'פעיל', dataIndex: 'active', key: 'active', width: 70, render: (v: boolean) => v ? '✓' : '✗' },
    {
      title: '', key: 'actions', width: 100,
      render: (_: unknown, r: FaqItem) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(r)} />
          <Popconfirm title="למחוק?" onConfirm={() => onDelete(r._id)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700 }}>ניהול שאלות נפוצות</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>שאלה חדשה</Button>
      </div>

      <Table dataSource={items} columns={columns} rowKey="_id" loading={loading} locale={{ emptyText: 'אין שאלות' }} />

      <Modal
        open={modalOpen} onCancel={() => setModalOpen(false)}
        title={editing ? 'עריכת שאלה' : 'שאלה חדשה'}
        onOk={() => form.submit()} okText="שמור" cancelText="ביטול"
        confirmLoading={saving} destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onSave}>
          <Form.Item name="question" label="שאלה" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="answer" label="תשובה" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
          <Form.Item name="category" label="קטגוריה"><Input /></Form.Item>
          <Form.Item name="order" label="סדר"><Input type="number" /></Form.Item>
          <Form.Item name="active" label="פעיל" valuePropName="checked"><Switch /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
