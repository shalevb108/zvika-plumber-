import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import heIL from 'antd/locale/he_IL';
import App from './App';
import './styles/global.scss';

const theme = {
  token: {
    colorPrimary: '#1565C0',
    colorLink: '#1565C0',
    fontFamily: "'Assistant', sans-serif",
    borderRadius: 8,
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={heIL} theme={theme} direction="rtl">
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
