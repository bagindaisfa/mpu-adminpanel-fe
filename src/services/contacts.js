import api from './api';

// Get all comments
export const getContacts = async () => {
  const response = await api.get('user-contact/contacts');
  return response.data;
};

export const getSchedules = async () => {
  const response = await api.get('schedule/get-schedules');
  return response.data;
};
