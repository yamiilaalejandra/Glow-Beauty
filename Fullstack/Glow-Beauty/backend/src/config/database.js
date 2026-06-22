const { Sequelize } = require('sequelize');

const sequelize = process.env.MYSQL_URL || process.env.DATABASE_URL
  ? new Sequelize(process.env.MYSQL_URL || process.env.DATABASE_URL, {
      dialect: 'mysql',
      logging: false,
      // AGREGA ESTO PARA EVITAR QUE SE CORTE EN RAILWAY
      pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000
      },
      dialectOptions: {
        connectTimeout: 60000
      }
    })
  : new Sequelize(
      process.env.DB_NAME || 'glow_beauty',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
      }
    );

module.exports = sequelize;