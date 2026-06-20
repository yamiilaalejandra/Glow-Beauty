import { apiFetch, apiFetchAuth } from './api';

export const getStoredAccessories = async () => {
  return apiFetch('/accessories');
};

export const getAccessoryById = async (id) => {
  return apiFetch(`/accessories/${id}`);
};

export const findAccessoriesByQuery = async (query) => {
  return apiFetch(`/accessories/search?q=${encodeURIComponent(query)}`);
};

export const saveAccessories = () => {};
export const initializeAccessoryStorage = () => {};
export const getNextAccessoryId = () => 0;

export const createAccessory = async (data) => apiFetchAuth('/accessories', { method: 'POST', body: JSON.stringify(data) });
export const updateAccessory = async (id, data) => apiFetchAuth(`/accessories/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteAccessory = async (id) => apiFetchAuth(`/accessories/${id}`, { method: 'DELETE' });
