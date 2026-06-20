const { Op } = require('sequelize');
const { Product } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.findAll({ where: { category: 'product' } });
    res.json(products);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id, category: 'product' } });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) { next(err); }
};

exports.search = async (req, res, next) => {
  try {
    const q = String(req.query.q || '').trim();
    const products = await Product.findAll({
      where: {
        category: 'product',
        [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },
          { description: { [Op.like]: `%${q}%` } },
          { longDescription: { [Op.like]: `%${q}%` } },
        ],
      },
    });
    res.json(products);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, description, longDescription, ingredients, price, image, stock } = req.body;
    const product = await Product.create({ name, description, longDescription, ingredients, price, image: image || '', stock: stock || 0, category: 'product' });
    res.status(201).json(product);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id, category: 'product' } });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    await product.update(req.body);
    res.json(product);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id, category: 'product' } });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    await product.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (err) { next(err); }
};
