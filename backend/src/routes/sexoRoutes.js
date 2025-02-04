const express = require('express');
const path = require('path');
const { getSexos, addSexo, updateSexoById, deleteSexoById } = require('../controllers/SexoController');

const router = express.Router();

router.get('/', getSexos);
router.post('/', addSexo);
router.put('/:id', updateSexoById);
router.delete('/:id', deleteSexoById);

module.exports = router;
