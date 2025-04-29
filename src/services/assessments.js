// src/api/assessments.js
import api from './api';

export const getQuestions = async () => {
  const res = await api.get('/assessments');
  return res.data;
};

export const createQuestion = async (question_text) => {
  return await api.post('/assessments', { question: question_text });
};

export const updateQuestion = async (id, question_text) => {
  return await api.put(`/assessments/${id}`, { question: question_text });
};

export const toggleQuestionVisibility = async (id) => {
  return await api.patch(`/assessments/${id}/visibility`);
};

export const getAllAnswers = async () => {
  const res = await api.get('/assessments/answare');
  return res.data;
};
