import api from './api';

export const getAllBlogs = async () => {
  const response = await api.get('/blogs');
  return response.data;
};
export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (formData) => {
  const response = await api.post('/blogs', formData);
  return response.data;
};

export const updateBlog = async (id, formData) => {
  const response = await api.put(`/blogs/${id}`, formData);
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const toggleBlogVisibility = async (id) => {
  return await api.patch(`/blogs/${id}/visibility`);
};
