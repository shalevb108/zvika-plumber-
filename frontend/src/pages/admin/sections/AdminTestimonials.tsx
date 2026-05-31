import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Rate, Switch, message, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Testimonial } from '../../../types';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../../services/api';

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const load = async () => {
    setLoading(true);
    try { setItems(await getTestimonials()); } catch { message.error('שגיאה'); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ rating: 5, active: true });
    setModalOpen(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditing(item);
    form.setFieldsValue(item);
    setModalOpen(true);
  };

  const onSave = async (values: Partial<Testimonial>) => {
    setSaving(true);
    try {
      if (editing) { await updateTestimonial(editing._id, values); message.success('עודכן'); }
      else { await createTestimonial(values); message.success('נוצר'); }
      setModalOpen(false);
      load();
    } catch { message.error('שגיאה'); } finally { setSaving(false); }
  };

  const onDelete = async (id: string) => {
    try { await deleteTestimonial(id); message.success('נמחק'); load(); }
    catch { message.error('שגיאה'); }
  };

  const columns = [
    { title: 'שם', dataIndex: 'name', key: 'name', width: 130 },
    { title: 'עיר', dataIndex: 'city', key: 'city', width: 100 },
    { title: 'הודעה', dataIndex: 'text', key: 'text', ellipsis: true },
    { title: 'דירוג', dataIndex: 'rating', key: 'rating', width: 130, render: (v: number) => <Rate disabled defaultValue={v} /> },
    { title: 'פעיל', dataIndex: 'active', key: 'active', width: 70, render: (v: boolean) => v ? '✓' : '✗' },
    {
      title: '', key: 'actions', width: 100,
      render: (_: unknown, r: Testimonial) => (
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
        <h2 style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700 }}>ניהול המלצות</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>המלצה חדשה</Button>
      </div>

      <Table dataSource={items} columns={columns} rowKey="_id" loading={loading} locale={{ emptyText: 'אין המלצות' }} />

      <Modal
        open={modalOpen} onCancel={() => setModalOpen(false)}
        title={editing ? 'עריכת המלצה' : 'המלצה חדשה'}
        onOk={() => form.submit()} okText="שמור" cancelText="ביטול"
        confirmLoading={saving} destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onSave}>
          <Form.Item name="name" label="שם" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="city" label="עיר"><Input /></Form.Item>
          <Form.Item name="text" label="טקסט" rules={[{ required: true }]}><Input.TextArea rows={3} /></Form.Item>
          <Form.Item name="rating" label="דירוג"><Rate /></Form.Item>
          <Form.Item name="date" label="תאריך"><Input placeholder="MM/YYYY" /></Form.Item>
          <Form.Item name="active" label="פעיל" valuePropName="checked"><Switch /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
