import api from './api';

export const getAllCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const createCategory = async (payload) => {
  const res = await api.post('/categories', payload);
  return res.data;
};

export const updateCategory = async (id, payload) => {
  const res = await api.put(`/categories/${id}`, payload);
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};
