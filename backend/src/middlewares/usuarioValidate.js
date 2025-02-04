const { body, validationResult } = require('express-validator');

// Middleware para validar los datos de un usuario
const validarUsuario = [
  body('nombre').isString().isLength({ max: 255 }).withMessage('El nombre es obligatorio y no debe exceder los 255 caracteres'),
  body('email').isEmail().isLength({ max: 255 }).withMessage('El correo electrónico es obligatorio y debe ser válido'),
  body('password').isString().isLength({ min: 6, max: 10 }).withMessage('La contraseña debe tener entre 6 y 10 caracteres'),
  body('telefono').optional().isString().isLength({ max: 15 }).withMessage('El teléfono no debe exceder los 15 caracteres'),
  body('estado').optional().isIn(['activo', 'inactivo']).withMessage('El estado debe ser "activo" o "inactivo"'),
  body('rol').optional().isIn(['admin', 'usuario']).withMessage('El rol debe ser "admin" o "usuario"'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
const validateLogin = [
  body('email').isEmail().withMessage('El correo electrónico es obligatorio y debe ser válido'),
  body('password').isString().isLength({ min: 6, max: 10 }).withMessage('La contraseña debe tener entre 6 y 10 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validarUsuario, validateLogin };
