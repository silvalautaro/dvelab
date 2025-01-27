const { Router } = require('express');
const router = Router();
const { getPrecios, getOnePrecio, addPrecio, updatePrecioById, deletePrecioById } = require('../controllers/PrecioController');

router.get('/', getPrecios);
router.get('/:id', getOnePrecio);
router.post('/', addPrecio);
router.put('/:id', updatePrecioById);
router.delete('/:id', deletePrecioById);

module.exports = router;