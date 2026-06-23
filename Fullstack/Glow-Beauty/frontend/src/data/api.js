const BASE_URL = import.meta.env.VITE_API_URL || 'https://glow-beauty-production.up.railway.app';

const getToken = () =>
  localStorage.getItem('adminToken') || localStorage.getItem('token');

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

const extractError = (data) => {
  if (data.message) return data.message;
  if (data.errors && Array.isArray(data.errors)) {
    return data.errors.map((e) => e.msg).join(', ');
  }
  return 'Error en la solicitud';
};

export const apiFetch = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(extractError(data));
  return data;
};

export const apiFetchAuth = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: authHeaders(),
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(extractError(data));
  return data;
};
