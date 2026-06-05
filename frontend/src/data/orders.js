const ORDER_STORAGE_KEY = 'glowBeautyOrders';

export const getStoredOrders = () => {
  return JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY)) || [];
};

export const saveOrders = (orders) => {
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event('glowBeautyOrdersUpdated'));
};

export const createOrder = ({ customerName, phone, email, shipping, paymentMethod, items, total, status }) => {
  const orders = getStoredOrders();
  const order = {
    id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    customerName,
    phone,
    email,
    shipping,
    paymentMethod,
    items,
    total,
    status
  };
  const nextOrders = [order, ...orders];
  saveOrders(nextOrders);
  return order;
};

export const deleteOrderById = (orderId) => {
  const updated = getStoredOrders().filter((order) => order.id !== orderId);
  saveOrders(updated);
  return updated;
};
