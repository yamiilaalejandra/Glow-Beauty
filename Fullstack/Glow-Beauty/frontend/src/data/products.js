import { apiFetch, apiFetchAuth } from './api';

export const getStoredProducts = async () => {
  return apiFetch('/products');
};

export const getProductById = async (id) => {
  return apiFetch(`/products/${id}`);
};

export const findProductsByQuery = async (query) => {
  return apiFetch(`/products/search?q=${encodeURIComponent(query)}`);
};

export const saveProducts = () => {};
export const initializeProductStorage = () => {};
export const getNextProductId = () => 0;

export const createProduct = async (data) => apiFetchAuth('/products', { method: 'POST', body: JSON.stringify(data) });
export const updateProduct = async (id, data) => apiFetchAuth(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProduct = async (id) => apiFetchAuth(`/products/${id}`, { method: 'DELETE' });
