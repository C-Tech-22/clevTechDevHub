import api from './api';

// --- Services (offerings) ---
export const getServices = async () => (await api.get('/services')).data.data;
export const createService = async (payload) => (await api.post('/services', payload)).data.data;
export const updateService = async (id, payload) => (await api.put(`/services/${id}`, payload)).data.data;
export const deleteService = async (id) => (await api.delete(`/services/${id}`)).data;

// --- Testimonials ---
export const getTestimonials = async () => (await api.get('/testimonials')).data.data;
export const createTestimonial = async (payload) => (await api.post('/testimonials', payload)).data.data;
export const updateTestimonial = async (id, payload) => (await api.put(`/testimonials/${id}`, payload)).data.data;
export const deleteTestimonial = async (id) => (await api.delete(`/testimonials/${id}`)).data;

// --- Contact ---
export const submitContactMessage = async (payload) => (await api.post('/contact', payload)).data;
export const getMessages = async (params = {}) => (await api.get('/contact', { params })).data;
export const updateMessageStatus = async (id, status) => (await api.put(`/contact/${id}/status`, { status })).data.data;
export const deleteMessage = async (id) => (await api.delete(`/contact/${id}`)).data;

// --- Quotes ---
export const submitQuote = async (payload) => (await api.post('/quotes', payload)).data;
export const getQuotes = async (params = {}) => (await api.get('/quotes', { params })).data;
export const getQuoteById = async (id) => (await api.get(`/quotes/${id}`)).data.data;
export const updateQuoteStatus = async (id, status) => (await api.put(`/quotes/${id}/status`, { status })).data.data;
export const addQuoteNote = async (id, note) => (await api.post(`/quotes/${id}/notes`, { note })).data.data;
export const deleteQuote = async (id) => (await api.delete(`/quotes/${id}`)).data;

// --- Settings ---
export const getSettings = async () => (await api.get('/settings')).data.data;
export const updateSettings = async (payload) => (await api.put('/settings', payload)).data.data;

// --- Analytics ---
export const trackEvent = async (type, path) => {
  try {
    await api.post('/analytics/track', { type, path });
  } catch {
    // Analytics is best-effort; never let a tracking failure disrupt navigation.
  }
};
export const getDashboardOverview = async () => (await api.get('/analytics/overview')).data.data;

// --- Uploads ---
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data.url;
};
