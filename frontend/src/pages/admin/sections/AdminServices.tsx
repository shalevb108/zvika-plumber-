import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Switch, message, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Service } from '../../../types';
import { getServices, createService, updateService, deleteService } from '../../../services/api';

export default function AdminServices() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const load = async () => {
    setLoading(true);
    try {
      // Fetch all, not just active
      const data = await getServices();
      setItems(data);
    } catch {
      message.error('שגיאה בטעינת שירותים');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ active: true, order: 0, icon: 'tool' });
    setModalOpen(true);
  };

  const openEdit = (item: Service) => {
    setEditing(item);
    form.setFieldsValue(item);
    setModalOpen(true);
  };

  const onSave = async (values: Partial<Service>) => {
    setSaving(true);
    try {
      if (editing) {
        await updateService(editing._id, values);
        message.success('שירות עודכן');
      } else {
        await createService(values);
        message.success('שירות נוצר');
      }
      setModalOpen(false);
      load();
    } catch {
      message.error('שגיאה בשמירה');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteService(id);
      message.success('שירות נמחק');
      load();
    } catch {
      message.error('שגיאה במחיקה');
    }
  };

  const columns = [
    { title: 'כותרת', dataIndex: 'title', key: 'title' },
    { title: 'תיאור', dataIndex: 'description', key: 'description', ellipsis: true },
    { title: 'סדר', dataIndex: 'order', key: 'order', width: 70 },
    {
      title: 'פעיל',
      dataIndex: 'active',
      key: 'active',
      width: 80,
      render: (val: boolean) => <span style={{ color: val ? '#52c41a' : '#ff4d4f' }}>{val ? 'כן' : 'לא'}</span>,
    },
    {
      title: 'פעולות',
      key: 'actions',
      width: 120,
      render: (_: unknown, record: Service) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="למחוק?" onConfirm={() => onDelete(record._id)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700 }}>ניהול שירותים</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>שירות חדש</Button>
      </div>

      <Table
        dataSource={items}
        columns={columns}
        rowKey="_id"
        loading={loading}
        locale={{ emptyText: 'אין שירותים' }}
        style={{ background: '#fff', borderRadius: 8 }}
      />

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        title={editing ? 'עריכת שירות' : 'שירות חדש'}
        onOk={() => form.submit()}
        okText="שמור"
        cancelText="ביטול"
        confirmLoading={saving}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onSave}>
          <Form.Item name="title" label="כותרת" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="תיאור" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="icon" label="אייקון (tool/drop/fire/home/search/build)">
            <Input />
          </Form.Item>
          <Form.Item name="order" label="סדר">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="active" label="פעיל" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
