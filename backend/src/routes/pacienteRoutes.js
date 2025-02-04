const express = require('express');
const path = require('path');
const { getPacientes, addPaciente, getPaciente, updatePacienteById, deletePacienteById } = require('../controllers/PacienteController');

const router = express.Router();

router.get('/', getPacientes);
router.post('/', addPaciente);
router.get('/:id', getPaciente);
router.put('/:id', updatePacienteById);
router.delete('/:id', deletePacienteById);

module.exports = router;