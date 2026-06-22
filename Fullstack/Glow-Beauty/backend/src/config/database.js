const { Sequelize } = require('sequelize');

// Soportar varias formas comunes de configurar la conexión en diferentes entornos
const CONNECTION_URL =
  process.env.MYSQL_URL ||
  process.env.DATABASE_URL ||
  process.env.CLEARDB_DATABASE_URL ||
  process.env.JAWSDB_URL ||
  process.env.RAILWAY_DATABASE_URL ||
  process.env.RAILWAY_MYSQL_URL ||
  process.env.DATABASE_URL;

function sslOptionsIfNeeded(url) {
  // Forzar SSL si se indica con DB_SSL=true o la URL incluye ssl=true
  if (process.env.DB_SSL === 'true' || (typeof url === 'string' && /ssl=true/i.test(url))) {
    return { ssl: { rejectUnauthorized: false } };
  }
  return undefined;
}

let sequelize;

if (CONNECTION_URL) {
  const options = {
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 60000,
      ...sslOptionsIfNeeded(CONNECTION_URL),
    },
  };

  sequelize = new Sequelize(CONNECTION_URL, options);
} else {
  // Configuración por partes (útil en desarrollo o si Railway expone variables separadas)
  const opts = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 60000,
      ...sslOptionsIfNeeded(),
    },
  };

  sequelize = new Sequelize(
    process.env.DB_NAME || 'glow_beauty',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    opts
  );
}

module.exports = sequelize;