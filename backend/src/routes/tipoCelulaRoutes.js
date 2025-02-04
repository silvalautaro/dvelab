const express = require('express');
const path = require('path');
const { getTipoCelulas, getTipoCelulaId, addTipoCelula, updateTipoCelulaById, deleteTipoCelulaById } = require('../controllers/TipoCelulaController');

const router = express.Router();

router.get('/', getTipoCelulas);

router.get('/:id', getTipoCelulaId);

router.post('/', addTipoCelula);

router.put('/:id', updateTipoCelulaById);

router.delete('/:id', deleteTipoCelulaById);

module.exports = router;
