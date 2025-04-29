import api from './api'; // pastikan instance api sudah setup Authorization Bearer

// Fetch statistik angka-angka utama di dashboard
export const fetchStats = () => api.get('/dashboard/stats');

// Fetch tren visitor harian (grafik)
export const fetchVisitorTrends = () => api.get('/visitors/stats');

// Fetch blog terbaru
export const fetchLatestBlogs = () => api.get('/dashboard/latest-blogs');

// Fetch komentar terbaru
export const fetchLatestComments = () => api.get('/dashboard/latest-comments');

// Fetch visitor terbaru
export const fetchLatestVisitors = () => api.get('/dashboard/latest-visitors');

// (Opsional) Fetch assessment terbaru kalau mau ditampilkan di dashboard
export const fetchLatestAssessments = () =>
  api.get('/dashboard/latest-assessments');
