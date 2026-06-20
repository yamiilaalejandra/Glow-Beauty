const { Router } = require('express');
const { body } = require('express-validator');
const { register, login, adminLogin } = require('../controllers/authController');

const router = Router();

router.post('/register',
  [
    body('firstName').trim().notEmpty().withMessage('Nombre requerido'),
    body('lastName').trim().notEmpty().withMessage('Apellido requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  register
);

router.post('/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('Contraseña requerida'),
  ],
  login
);

router.post('/admin/login', adminLogin);

module.exports = router;
