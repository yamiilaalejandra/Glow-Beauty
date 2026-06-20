import { apiFetchAuth } from './api';

export const createOrder = async (orderData) => {
  return apiFetchAuth('/orders', { method: 'POST', body: JSON.stringify(orderData) });
};

export const getStoredOrders = async () => {
  return apiFetchAuth('/orders');
};

export const deleteOrderById = async (id) => {
  return apiFetchAuth(`/orders/${id}`, { method: 'DELETE' });
};

export const updateOrderStatus = async (id, status) => {
  return apiFetchAuth(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
};

export const saveOrders = () => {};
