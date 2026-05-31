import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth';
import servicesRoutes from './routes/services';
import galleryRoutes from './routes/gallery';
import testimonialsRoutes from './routes/testimonials';
import pricesRoutes from './routes/prices';
import faqRoutes from './routes/faq';
import siteInfoRoutes from './routes/siteInfo';
import contactRoutes from './routes/contact';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zvika-plumber';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const FRONTEND_URL_PROD = process.env.FRONTEND_URL_PROD || '';

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  FRONTEND_URL,
  FRONTEND_URL_PROD,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/prices', pricesRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/site-info', siteInfoRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'שרת פועל תקין' });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('מחובר ל-MongoDB');
    app.listen(PORT, () => {
      console.log(`השרת רץ על פורט ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('שגיאה בחיבור ל-MongoDB:', err);
    process.exit(1);
  });

export default app;
