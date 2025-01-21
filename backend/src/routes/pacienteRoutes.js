const express = require('express');
const path = require('path');
const { getPacientes, addPaciente, getPaciente } = require('../controllers/PacienteController');

const router = express.Router();

router.get('/', getPacientes);
router.post('/', addPaciente);
router.get('/:id', getPaciente);

module.exports = router;