import api from './api';

export const getPosts = async (params = {}) => {
  const { data } = await api.get('/blog', { params });
  return data;
};

export const getPostBySlug = async (slug) => {
  const { data } = await api.get(`/blog/slug/${slug}`);
  return data.data;
};

export const getPostByIdAdmin = async (id) => {
  const { data } = await api.get(`/blog/${id}`);
  return data.data;
};

export const createPost = async (payload) => {
  const { data } = await api.post('/blog', payload);
  return data.data;
};

export const updatePost = async (id, payload) => {
  const { data } = await api.put(`/blog/${id}`, payload);
  return data.data;
};

export const deletePost = async (id) => {
  const { data } = await api.delete(`/blog/${id}`);
  return data;
};
