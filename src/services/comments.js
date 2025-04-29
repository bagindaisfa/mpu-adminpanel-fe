import api from './api';

// Get all comments
export const getComments = async () => {
  const response = await api.get('/comments');
  return response.data;
};

// Approve comment
export const approveComment = async (commentId) => {
  const response = await api.put(`/comments/${commentId}`, {
    is_approved: true,
  });
  return response.data;
};

// Unapprove comment
export const unapproveComment = async (commentId) => {
  const response = await api.put(`/comments/${commentId}`, {
    is_approved: false,
  });
  return response.data;
};

// Delete comment
export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};
