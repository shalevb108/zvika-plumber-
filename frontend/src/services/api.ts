import axios from 'axios';
import type { Service, GalleryItem, Testimonial, PriceItem, FaqItem, SiteInfo, ContactMessage } from '../types';

const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Services
export const getServices = () => api.get<Service[]>('/services').then(r => r.data);
export const createService = (data: Partial<Service>) => api.post<Service>('/services', data).then(r => r.data);
export const updateService = (id: string, data: Partial<Service>) => api.put<Service>(`/services/${id}`, data).then(r => r.data);
export const deleteService = (id: string) => api.delete(`/services/${id}`).then(r => r.data);

// Gallery
export const getGallery = () => api.get<GalleryItem[]>('/gallery').then(r => r.data);
export const createGalleryItem = (data: Partial<GalleryItem>) => api.post<GalleryItem>('/gallery', data).then(r => r.data);
export const updateGalleryItem = (id: string, data: Partial<GalleryItem>) => api.put<GalleryItem>(`/gallery/${id}`, data).then(r => r.data);
export const deleteGalleryItem = (id: string) => api.delete(`/gallery/${id}`).then(r => r.data);

// Testimonials
export const getTestimonials = () => api.get<Testimonial[]>('/testimonials').then(r => r.data);
export const createTestimonial = (data: Partial<Testimonial>) => api.post<Testimonial>('/testimonials', data).then(r => r.data);
export const updateTestimonial = (id: string, data: Partial<Testimonial>) => api.put<Testimonial>(`/testimonials/${id}`, data).then(r => r.data);
export const deleteTestimonial = (id: string) => api.delete(`/testimonials/${id}`).then(r => r.data);

// Prices
export const getPrices = () => api.get<PriceItem[]>('/prices').then(r => r.data);
export const createPrice = (data: Partial<PriceItem>) => api.post<PriceItem>('/prices', data).then(r => r.data);
export const updatePrice = (id: string, data: Partial<PriceItem>) => api.put<PriceItem>(`/prices/${id}`, data).then(r => r.data);
export const deletePrice = (id: string) => api.delete(`/prices/${id}`).then(r => r.data);

// FAQ
export const getFaq = () => api.get<FaqItem[]>('/faq').then(r => r.data);
export const createFaq = (data: Partial<FaqItem>) => api.post<FaqItem>('/faq', data).then(r => r.data);
export const updateFaq = (id: string, data: Partial<FaqItem>) => api.put<FaqItem>(`/faq/${id}`, data).then(r => r.data);
export const deleteFaq = (id: string) => api.delete(`/faq/${id}`).then(r => r.data);

// Site Info
export const getSiteInfo = () => api.get<SiteInfo>('/site-info').then(r => r.data);
export const updateSiteInfo = (data: Partial<SiteInfo>) => api.put<SiteInfo>('/site-info', data).then(r => r.data);

// Contact
export const sendContactMessage = (data: { name: string; phone: string; email: string; message: string }) =>
  api.post('/contact', data).then(r => r.data);
export const getContactMessages = () => api.get<ContactMessage[]>('/contact').then(r => r.data);
export const markMessageRead = (id: string) => api.patch<ContactMessage>(`/contact/${id}/read`).then(r => r.data);
export const deleteMessage = (id: string) => api.delete(`/contact/${id}`).then(r => r.data);

// Auth
export const login = (password: string) =>
  api.post<{ token: string; message: string }>('/auth/login', { password }).then(r => r.data);

export default api;
