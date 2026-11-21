import api from './api';

export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  if (data.data?.token) localStorage.setItem('clevtech_token', data.data.token);
  return data.data.user;
};

export const logout = async () => {
  await api.post('/auth/logout');
  localStorage.removeItem('clevtech_token');
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data.data;
};
