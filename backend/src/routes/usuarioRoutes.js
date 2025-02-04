const UsuarioController = require('../controllers/UsuarioController');
const router = require('express').Router();
const { validarUsuario, validateLogin } = require('../middlewares/usuarioValidate');

router.post('/register', validarUsuario, UsuarioController.processRegister);
router.post('/login', validateLogin, UsuarioController.processLogin);
router.get('/', UsuarioController.findAll);
router.get('/:id', UsuarioController.findById);
router.put('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.delete);

module.exports = router;