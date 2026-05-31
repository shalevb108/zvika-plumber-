import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  order: number;
  active: boolean;
}

const ServiceSchema = new Schema<IService>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'tool' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Service = mongoose.model<IService>('Service', ServiceSchema);

export interface IGalleryItem extends Document {
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

const GallerySchema = new Schema<IGalleryItem>({
  imageUrl: { type: String, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  category: { type: String, default: 'כללי' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const GalleryItem = mongoose.model<IGalleryItem>('GalleryItem', GallerySchema);

export interface ITestimonial extends Document {
  name: string;
  text: string;
  rating: number;
  city: string;
  date: string;
  active: boolean;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  city: { type: String, default: 'אשקלון' },
  date: { type: String, default: '' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export interface IPriceItem extends Document {
  service: string;
  price: string;
  category: string;
  note: string;
  order: number;
}

const PriceSchema = new Schema<IPriceItem>({
  service: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, default: 'כללי' },
  note: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const PriceItem = mongoose.model<IPriceItem>('PriceItem', PriceSchema);

export interface IFaqItem extends Document {
  question: string;
  answer: string;
  category: string;
  order: number;
  active: boolean;
}

const FaqSchema = new Schema<IFaqItem>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'כללי' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const FaqItem = mongoose.model<IFaqItem>('FaqItem', FaqSchema);

export interface ISiteInfo extends Document {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  businessHours: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  licenseNumber: string;
  yearsExperience: number;
  projectsCompleted: number;
  happyClients: number;
}

const SiteInfoSchema = new Schema<ISiteInfo>({
  phone: { type: String, default: '054-775-5054' },
  whatsapp: { type: String, default: '972501234567' },
  email: { type: String, default: 'zvika@plumber.co.il' },
  address: { type: String, default: 'אשקלון, ישראל' },
  city: { type: String, default: 'אשקלון' },
  businessHours: { type: String, default: 'ראשון-חמישי 07:00-20:00, שישי 07:00-14:00' },
  heroTitle: { type: String, default: 'צביקה סופר - אינסטלטור מקצועי' },
  heroSubtitle: { type: String, default: 'שירות מהיר, אמין ומקצועי באשקלון והדרום' },
  aboutText: { type: String, default: 'אני צביקה סופר, אינסטלטור מוסמך עם ניסיון של מעל 20 שנה בתחום האינסטלציה. אני מספק שירות מקצועי, אמין ומהיר לבתים, עסקים ומפעלים באשקלון וכל אזור הדרום.' },
  licenseNumber: { type: String, default: '12345' },
  yearsExperience: { type: Number, default: 20 },
  projectsCompleted: { type: Number, default: 1500 },
  happyClients: { type: Number, default: 1200 },
}, { timestamps: true });

export const SiteInfo = mongoose.model<ISiteInfo>('SiteInfo', SiteInfoSchema);

export interface IContactMessage extends Document {
  name: string;
  phone: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
