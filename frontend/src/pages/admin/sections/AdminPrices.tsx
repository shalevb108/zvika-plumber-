import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { PriceItem } from '../../../types';
import { getPrices, createPrice, updatePrice, deletePrice } from '../../../services/api';

export default function AdminPrices() {
  const [items, setItems] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PriceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const load = async () => {
    setLoading(true);
    try { setItems(await getPrices()); } catch { message.error('שגיאה'); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); form.resetFields(); setModalOpen(true); };
  const openEdit = (item: PriceItem) => { setEditing(item); form.setFieldsValue(item); setModalOpen(true); };

  const onSave = async (values: Partial<PriceItem>) => {
    setSaving(true);
    try {
      if (editing) { await updatePrice(editing._id, values); message.success('עודכן'); }
      else { await createPrice(values); message.success('נוצר'); }
      setModalOpen(false); load();
    } catch { message.error('שגיאה'); } finally { setSaving(false); }
  };

  const onDelete = async (id: string) => {
    try { await deletePrice(id); message.success('נמחק'); load(); }
    catch { message.error('שגיאה'); }
  };

  const columns = [
    { title: 'שירות', dataIndex: 'service', key: 'service' },
    { title: 'מחיר', dataIndex: 'price', key: 'price', width: 150, render: (v: string) => <strong style={{ color: '#1565C0' }}>{v}</strong> },
    { title: 'קטגוריה', dataIndex: 'category', key: 'category', width: 110 },
    { title: 'הערה', dataIndex: 'note', key: 'note', ellipsis: true },
    {
      title: '', key: 'actions', width: 100,
      render: (_: unknown, r: PriceItem) => (
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
        <h2 style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700 }}>ניהול מחירון</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>פריט חדש</Button>
      </div>

      <Table dataSource={items} columns={columns} rowKey="_id" loading={loading} locale={{ emptyText: 'אין פריטים' }} />

      <Modal
        open={modalOpen} onCancel={() => setModalOpen(false)}
        title={editing ? 'עריכת מחיר' : 'פריט מחיר חדש'}
        onOk={() => form.submit()} okText="שמור" cancelText="ביטול"
        confirmLoading={saving} destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onSave}>
          <Form.Item name="service" label="שירות" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="price" label="מחיר" rules={[{ required: true }]}><Input placeholder="₪200-₪400" /></Form.Item>
          <Form.Item name="category" label="קטגוריה"><Input /></Form.Item>
          <Form.Item name="note" label="הערה"><Input /></Form.Item>
          <Form.Item name="order" label="סדר"><Input type="number" /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
