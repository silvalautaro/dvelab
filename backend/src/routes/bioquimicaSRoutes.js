const express = require('express');
const path = require('path');
const { getBioquimicaSanguineas, addBioquimicaSanguinea, getBioquimicaSanguineaById, updateBioquimicaSanguineaById, deleteBioquimicaSanguineaById } = require('../controllers/BioquimicaSanguineaController');

const router = express.Router();

router.get('/', getBioquimicaSanguineas);
router.post('/', addBioquimicaSanguinea);
router.get('/:id', getBioquimicaSanguineaById);
router.put('/:id', updateBioquimicaSanguineaById);
router.delete('/:id', deleteBioquimicaSanguineaById);

module.exports = router;