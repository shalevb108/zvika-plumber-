import { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message, Popconfirm, Card, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, PictureOutlined, UploadOutlined } from '@ant-design/icons';
import type { GalleryItem } from '../../../types';
import { getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem, uploadImage, resolveImageUrl } from '../../../services/api';
import { compressImage } from '../../../utils/image';

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');
  const [form] = Form.useForm();

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const { data, contentType } = await compressImage(file);
      const url = await uploadImage(data, contentType);
      form.setFieldValue('imageUrl', url);
      setPreview(resolveImageUrl(url));
      message.success('התמונה הועלתה');
    } catch {
      message.error('שגיאה בהעלאת התמונה');
    } finally {
      setUploading(false);
    }
    return false; // prevent antd's default upload
  };

  const load = async () => {
    setLoading(true);
    try { setItems(await getGallery()); } catch { message.error('שגיאה בטעינה'); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setPreview('');
    setModalOpen(true);
  };

  const openEdit = (item: GalleryItem) => {
    setEditing(item);
    form.setFieldsValue(item);
    setPreview(resolveImageUrl(item.imageUrl));
    setModalOpen(true);
  };

  const onSave = async (values: Partial<GalleryItem>) => {
    setSaving(true);
    try {
      if (editing) { await updateGalleryItem(editing._id, values); message.success('עודכן'); }
      else { await createGalleryItem(values); message.success('נוצר'); }
      setModalOpen(false);
      load();
    } catch { message.error('שגיאה בשמירה'); } finally { setSaving(false); }
  };

  const onDelete = async (id: string) => {
    try { await deleteGalleryItem(id); message.success('נמחק'); load(); }
    catch { message.error('שגיאה במחיקה'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700 }}>ניהול גלריה</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>פריט חדש</Button>
      </div>

      {loading ? <p>טוען...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {items.map(item => (
            <Card
              key={item._id}
              cover={
                item.imageUrl
                  ? <img src={resolveImageUrl(item.imageUrl)} alt={item.title} style={{ height: 160, objectFit: 'cover' }} />
                  : <div style={{ height: 160, background: 'linear-gradient(135deg, #1565C0, #1976D2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'rgba(255,255,255,0.3)' }}><PictureOutlined /></div>
              }
              actions={[
                <EditOutlined key="edit" onClick={() => openEdit(item)} />,
                <Popconfirm key="del" title="למחוק?" onConfirm={() => onDelete(item._id)}>
                  <DeleteOutlined style={{ color: '#ff4d4f' }} />
                </Popconfirm>,
              ]}
              size="small"
            >
              <Card.Meta title={item.title || 'ללא כותרת'} description={item.category} />
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        title={editing ? 'עריכת פריט' : 'פריט חדש'}
        onOk={() => form.submit()}
        okText="שמור"
        cancelText="ביטול"
        confirmLoading={saving}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onSave}>
          <Form.Item label="תמונה">
            {preview && (
              <img
                src={preview}
                alt="תצוגה מקדימה"
                style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
              />
            )}
            <Upload
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              beforeUpload={handleUpload}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                {preview ? 'החלף תמונה' : 'העלה תמונה מהמכשיר'}
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item name="imageUrl" label="או הדבק קישור לתמונה">
            <Input placeholder="https://..." onChange={(e) => setPreview(resolveImageUrl(e.target.value))} />
          </Form.Item>
          <Form.Item name="title" label="כותרת">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="תיאור">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="category" label="קטגוריה">
            <Input />
          </Form.Item>
          <Form.Item name="order" label="סדר">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
