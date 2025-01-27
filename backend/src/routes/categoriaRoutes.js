const express = require('express');
const router = express.Router();
const { 
    getCategorias,
    getOneCategoria,
    addCategoria,
    updateCategoriaById,
    deleteCategoriaById } = require('../controllers/CategoriaController');

router.get('/', getCategorias);
router.get('/:id', getOneCategoria);
router.post('/', addCategoria);
router.put('/:id', updateCategoriaById);
router.delete('/:id', deleteCategoriaById);

module.exports = router;