const express = require('express');
const path = require('path');
const { getAllEstados, updateEstado } = require('../controllers/EstadoController');

const router = express.Router();

router.get('/', getAllEstados);
router.put('/', updateEstado);

module.exports = router;
