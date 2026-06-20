const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Admin = require('./Admin');

module.exports = { sequelize, User, Product, Order, Admin };
