const express = require('express');
const path = require('path');
const { getHemogramas, addHemograma, getHemogramaById, updateHemogramaById, deleteHemogramaById } = require('../controllers/HemogramaController');

const router = express.Router();

router.get('/', getHemogramas);
router.post('/', addHemograma);
router.get('/:id', getHemogramaById);
router.put('/:id', updateHemogramaById);
router.delete('/:id', deleteHemogramaById);

module.exports = router;
