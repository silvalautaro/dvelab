const express = require('express');
const path = require('path');
const { getObservaciones, addObservacion, updateObservacionById, deleteObservacionById } = require('../controllers/ObservacionController');

const router = express.Router();

router.get('/', getObservaciones);
router.post('/', addObservacion);
router.put('/:id', updateObservacionById);
router.delete('/:id', deleteObservacionById);

module.exports = router;
