const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  longDescription: { type: DataTypes.TEXT, allowNull: false },
  ingredients: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  image: { type: DataTypes.STRING, defaultValue: '' },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  category: {
    type: DataTypes.ENUM('product', 'accessory'),
    allowNull: false,
    defaultValue: 'product',
  },
}, { tableName: 'products' });

module.exports = Product;
