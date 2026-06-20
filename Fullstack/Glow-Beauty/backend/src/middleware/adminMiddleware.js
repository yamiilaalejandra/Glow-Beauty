const authMiddleware = require('./authMiddleware');

module.exports = [
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso restringido a administradores' });
    }
    next();
  },
];
