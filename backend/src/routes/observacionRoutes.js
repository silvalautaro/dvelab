const express = require('express');
const path = require('path');
const { getObservaciones, addObservacion } = require('../controllers/ObservacionController');

const router = express.Router();

router.get('/', getObservaciones);
router.post('/', addObservacion);

module.exports = router;
