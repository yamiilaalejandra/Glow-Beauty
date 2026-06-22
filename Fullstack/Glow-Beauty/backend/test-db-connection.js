require('dotenv').config();
const sequelize = require('./src/config/database');

function mask(s) {
  if (!s) return undefined;
  return s.replace(/(:\\/\\/.*:)(.*)@/, (m, p1) => p1 + '*****@');
}

(async () => {
  try {
    const url = process.env.MYSQL_URL || process.env.DATABASE_URL || process.env.RAILWAY_DATABASE_URL || '';
    console.log('Testing DB connection. Resolved URL (masked):', mask(url) || '(using separate host/port variables)');
    console.log('Using host:', process.env.DB_HOST || process.env.HOST || '(none)');
    console.log('Using port:', process.env.DB_PORT || process.env.PORT || '(none)');
    console.log('DB_SSL:', process.env.DB_SSL || 'undefined');

    await sequelize.authenticate({ logging: console.log });
    console.log('Database connection: OK');
    process.exit(0);
  } catch (err) {
    console.error('Database connection failed:');
    console.error(err);
    process.exit(1);
  }
})();
