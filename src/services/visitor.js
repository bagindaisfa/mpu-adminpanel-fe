import api from './api';

export const recordVisitor = (page) => {
  return api.post('/visitors', { page });
};

export const fetchVisitorStats = () => {
  return api.get('/visitors/stats');
};
