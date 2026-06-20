const { Order, Product } = require('../models');
const { sequelize } = require('../models');

exports.create = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { customerName, phone, email, shipping, paymentMethod, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: 'El carrito está vacío' });
    }

    // Validate stock
    for (const item of items) {
      const product = await Product.findByPk(item.id, { transaction: t });
      if (!product) {
        await t.rollback();
        return res.status(400).json({ message: `Producto con id ${item.id} no encontrado` });
      }
      if (product.stock < item.quantity) {
        await t.rollback();
        return res.status(400).json({ message: `Stock insuficiente para "${product.name}"` });
      }
    }

    // Deduct stock
    for (const item of items) {
      const product = await Product.findByPk(item.id, { transaction: t });
      await product.update({ stock: product.stock - item.quantity }, { transaction: t });
    }

    const subtotal = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);
    const tax = subtotal * 0.10;
    const shippingCost = subtotal > 50 ? 0 : 10;
    const total = subtotal + tax + shippingCost;

    const orderId = `ORD-${Date.now()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

    const order = await Order.create({
      orderId,
      customerName,
      phone,
      email,
      street: shipping.street,
      number: shipping.number,
      floorDepto: shipping.floorDepto || '',
      cityProvince: shipping.cityProvince,
      postalCode: shipping.postalCode,
      paymentMethod,
      items,
      subtotal,
      tax,
      shipping: shippingCost,
      total,
      status: 'Pendiente',
    }, { transaction: t });

    await t.commit();
    res.status(201).json(order);
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
    res.json(orders);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    await order.destroy();
    res.json({ message: 'Orden eliminada' });
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    const { status } = req.body;
    const validStatuses = ['Pendiente', 'En proceso', 'Enviado', 'Entregado', 'Cancelado'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }
    await order.update({ status });
    res.json(order);
  } catch (err) { next(err); }
};
