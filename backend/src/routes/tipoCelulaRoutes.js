const express = require('express');
const path = require('path');
const { getTipoCelulas, getTipoCelulaId, addTipoCelula } = require('../controllers/TipoCelulaController');

const router = express.Router();

router.get('/', getTipoCelulas);

router.get('/:id', getTipoCelulaId);

router.post('/', addTipoCelula);

module.exports = router;
