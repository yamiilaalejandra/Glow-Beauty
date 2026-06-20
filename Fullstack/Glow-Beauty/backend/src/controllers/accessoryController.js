const { Op } = require('sequelize');
const { Product } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const accessories = await Product.findAll({ where: { category: 'accessory' } });
    res.json(accessories);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const accessory = await Product.findOne({ where: { id: req.params.id, category: 'accessory' } });
    if (!accessory) return res.status(404).json({ message: 'Accesorio no encontrado' });
    res.json(accessory);
  } catch (err) { next(err); }
};

exports.search = async (req, res, next) => {
  try {
    const q = String(req.query.q || '').trim();
    const accessories = await Product.findAll({
      where: {
        category: 'accessory',
        [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },
          { description: { [Op.like]: `%${q}%` } },
          { longDescription: { [Op.like]: `%${q}%` } },
        ],
      },
    });
    res.json(accessories);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, description, longDescription, ingredients, price, image, stock } = req.body;
    const accessory = await Product.create({ name, description, longDescription, ingredients, price, image: image || '', stock: stock || 0, category: 'accessory' });
    res.status(201).json(accessory);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const accessory = await Product.findOne({ where: { id: req.params.id, category: 'accessory' } });
    if (!accessory) return res.status(404).json({ message: 'Accesorio no encontrado' });
    await accessory.update(req.body);
    res.json(accessory);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const accessory = await Product.findOne({ where: { id: req.params.id, category: 'accessory' } });
    if (!accessory) return res.status(404).json({ message: 'Accesorio no encontrado' });
    await accessory.destroy();
    res.json({ message: 'Accesorio eliminado' });
  } catch (err) { next(err); }
};
