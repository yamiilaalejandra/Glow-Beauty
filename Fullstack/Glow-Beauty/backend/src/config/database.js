const { Sequelize } = require('sequelize');

// Si Railway nos da una URL de conexión completa (interna), la usamos directamente.
// Si no existe (como en tu PC local), usamos los campos uno por uno.
const sequelize = process.env.MYSQL_URL || process.env.DATABASE_URL
  ? new Sequelize(process.env.MYSQL_URL || process.env.DATABASE_URL, {
      dialect: 'mysql',
      logging: false,
      dialectOptions: {
        connectTimeout: 60000 // Evita que se corte la conexión por falta de tiempo
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