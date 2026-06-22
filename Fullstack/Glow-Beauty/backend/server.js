require('dotenv').config();
const app = require('./src/app');
// Importamos directamente la instancia desde database.js y sin llaves
const sequelize = require('./src/config/database'); 

const PORT = process.env.PORT || 3001;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startServer(maxRetries = 10) {
  let attempt = 0;
  let delay = 2000; // 2s

  while (true) {
    try {
      attempt++;
      console.log(`DB connection attempt ${attempt}`);
      await sequelize.authenticate();
      console.log('Database authenticated');

      // Sync once connected
      await sequelize.sync({ alter: true });
      console.log('Database synced successfully');

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
      break;
    } catch (err) {
      console.error(`DB connection attempt ${attempt} failed:`, err && err.message ? err.message : err);

      if (attempt >= maxRetries) {
        console.warn(`Reached ${maxRetries} attempts — switching to continuous retries every ${delay / 1000}s`);
        attempt = 0; // reset attempt counter but keep retrying
      }

      console.log(`Retrying DB connection in ${delay / 1000}s...`);
      await wait(delay);
      delay = Math.min(delay * 2, 60000); // exponential backoff up to 60s
    }
  }
}

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

startServer();