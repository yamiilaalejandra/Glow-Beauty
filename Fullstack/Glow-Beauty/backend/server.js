require('dotenv').config();
const app = require('./src/app');
// Importamos directamente la instancia desde database.js y sin llaves
const sequelize = require('./src/config/database'); 

const PORT = process.env.PORT || 3001;

// Usamos force: false o alter: true. Para la primera vez en Railway, 
// alter: true está perfecto para que fabrique las tablas si no existen.
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced successfully');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
  process.exit(1);
});