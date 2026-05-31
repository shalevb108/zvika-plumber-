import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Menu, Button, Typography } from 'antd';
import {
  ToolOutlined, PictureOutlined, StarOutlined, DollarOutlined,
  QuestionCircleOutlined, SettingOutlined, MailOutlined,
  LogoutOutlined, HomeOutlined, MenuOutlined,
} from '@ant-design/icons';
import AdminServices from './sections/AdminServices';
import AdminGallery from './sections/AdminGallery';
import AdminTestimonials from './sections/AdminTestimonials';
import AdminPrices from './sections/AdminPrices';
import AdminFaq from './sections/AdminFaq';
import AdminSiteInfo from './sections/AdminSiteInfo';
import AdminMessages from './sections/AdminMessages';
import { useAuth } from '../../hooks/useAuth';

const { Sider, Content, Header } = Layout;
const { Title } = Typography;

const menuItems = [
  { key: '/admin/services', icon: <ToolOutlined />, label: 'שירותים' },
  { key: '/admin/gallery', icon: <PictureOutlined />, label: 'גלריה' },
  { key: '/admin/testimonials', icon: <StarOutlined />, label: 'המלצות' },
  { key: '/admin/prices', icon: <DollarOutlined />, label: 'מחירון' },
  { key: '/admin/faq', icon: <QuestionCircleOutlined />, label: 'שאלות נפוצות' },
  { key: '/admin/site-info', icon: <SettingOutlined />, label: 'הגדרות אתר' },
  { key: '/admin/messages', icon: <MailOutlined />, label: 'הודעות' },
];

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate('/admin/login');
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <Layout style={{ minHeight: '100vh', direction: 'rtl' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={220}
        style={{
          background: '#0D47A1',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          overflow: 'auto',
        }}
        trigger={null}
      >
        <div style={{
          padding: '20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: 8,
        }}>
          {!collapsed && (
            <>
              <div style={{
                width: 40, height: 40,
                background: '#FF6B00',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 8,
              }}>
                <ToolOutlined style={{ color: '#fff', fontSize: 18 }} />
              </div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', fontFamily: "'Heebo', sans-serif" }}>
                צביקה סופר
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                פאנל ניהול
              </div>
            </>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ background: 'transparent', border: 'none' }}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
        />

        <div style={{ padding: '16px', marginTop: 'auto', position: 'absolute', bottom: 60, width: '100%' }}>
          <Button
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
            style={{ width: '100%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', marginBottom: 8 }}
            size="small"
          >
            {!collapsed && 'לאתר'}
          </Button>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            danger
            style={{ width: '100%' }}
            size="small"
          >
            {!collapsed && 'יציאה'}
          </Button>
        </div>
      </Sider>

      <Layout style={{ marginRight: collapsed ? 80 : 220, transition: 'all 0.2s' }}>
        <Header style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 99,
        }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Title level={4} style={{ margin: 0, fontFamily: "'Heebo', sans-serif" }}>
            {menuItems.find(m => m.key === location.pathname)?.label || 'פאנל ניהול'}
          </Title>
        </Header>

        <Content style={{ padding: 24, background: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/admin/services" replace />} />
            <Route path="/services" element={<AdminServices />} />
            <Route path="/gallery" element={<AdminGallery />} />
            <Route path="/testimonials" element={<AdminTestimonials />} />
            <Route path="/prices" element={<AdminPrices />} />
            <Route path="/faq" element={<AdminFaq />} />
            <Route path="/site-info" element={<AdminSiteInfo />} />
            <Route path="/messages" element={<AdminMessages />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
