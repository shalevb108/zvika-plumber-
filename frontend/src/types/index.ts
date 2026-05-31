export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  active: boolean;
}

export interface GalleryItem {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  text: string;
  rating: number;
  city: string;
  date: string;
  active: boolean;
}

export interface PriceItem {
  _id: string;
  service: string;
  price: string;
  category: string;
  note: string;
  order: number;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  active: boolean;
}

export interface SiteInfo {
  _id?: string;
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

export interface ContactMessage {
  _id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}
