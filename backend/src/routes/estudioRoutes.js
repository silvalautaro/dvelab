const express = require('express');
const path = require('path');
const { getEstudios, addEstudio, getEstudioById, updateEstudioById, deleteEstudioById } = require('../controllers/EstudioController');

const router = express.Router();

router.get('/', getEstudios);
router.post('/', addEstudio);
router.get('/:id', getEstudioById);
router.put('/:id', updateEstudioById);
router.delete('/:id', deleteEstudioById);

module.exports = router;
