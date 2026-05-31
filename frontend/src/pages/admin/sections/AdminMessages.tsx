import { useEffect, useState } from 'react';
import { Table, Button, Tag, message, Space, Popconfirm, Badge } from 'antd';
import { DeleteOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ContactMessage } from '../../../types';
import { getContactMessages, markMessageRead, deleteMessage } from '../../../services/api';

export default function AdminMessages() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { setItems(await getContactMessages()); } catch { message.error('שגיאה'); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onRead = async (id: string) => {
    try { await markMessageRead(id); load(); }
    catch { message.error('שגיאה'); }
  };

  const onDelete = async (id: string) => {
    try { await deleteMessage(id); message.success('נמחק'); load(); }
    catch { message.error('שגיאה'); }
  };

  const unread = items.filter(i => !i.read).length;

  const columns = [
    {
      title: 'סטטוס',
      key: 'read',
      width: 90,
      render: (_: unknown, r: ContactMessage) => (
        <Tag color={r.read ? 'default' : 'blue'}>{r.read ? 'נקרא' : 'חדש'}</Tag>
      ),
    },
    { title: 'שם', dataIndex: 'name', key: 'name', width: 130 },
    {
      title: 'טלפון',
      dataIndex: 'phone',
      key: 'phone',
      width: 140,
      render: (v: string) => <a href={`tel:${v}`}>{v}</a>,
    },
    { title: 'אימייל', dataIndex: 'email', key: 'email', width: 180 },
    { title: 'הודעה', dataIndex: 'message', key: 'message', ellipsis: true },
    {
      title: 'תאריך',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 130,
      render: (v: string) => new Date(v).toLocaleDateString('he-IL'),
    },
    {
      title: 'פעולות',
      key: 'actions',
      width: 110,
      render: (_: unknown, r: ContactMessage) => (
        <Space>
          {!r.read && (
            <Button size="small" icon={<EyeOutlined />} onClick={() => onRead(r._id)} title="סמן כנקרא" />
          )}
          <Popconfirm title="למחוק?" onConfirm={() => onDelete(r._id)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h2 style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, margin: 0 }}>הודעות</h2>
          {unread > 0 && <Badge count={unread} style={{ backgroundColor: '#1565C0' }} />}
        </div>
        <Button icon={<ReloadOutlined />} onClick={load}>רענן</Button>
      </div>

      <Table
        dataSource={items}
        columns={columns}
        rowKey="_id"
        loading={loading}
        locale={{ emptyText: 'אין הודעות' }}
        rowClassName={(r: ContactMessage) => !r.read ? 'unread-row' : ''}
      />
    </div>
  );
}
