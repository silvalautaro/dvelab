const express = require('express');
const path = require('path');
const { getAllEstados, addEstado, updateEstadoById, deleteEstadoById } = require('../controllers/EstadoController');

const router = express.Router();

router.get('/', getAllEstados);
router.post('/', addEstado);
router.put('/:id', updateEstadoById);
router.delete('/:id', deleteEstadoById);

module.exports = router;
