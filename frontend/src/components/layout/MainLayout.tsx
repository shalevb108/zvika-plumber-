import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';
import { SiteInfoProvider } from '../../context/SiteInfoContext';

export default function MainLayout() {
  return (
    <SiteInfoProvider>
      <Navbar />
      <main style={{ paddingTop: '70px' }}>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </SiteInfoProvider>
  );
}
