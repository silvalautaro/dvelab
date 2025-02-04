const express = require('express');
const path = require('path');
const { getProfesionales, addProfesional, getProfesional, updateProfesionalById, deleteProfesionalById } = require('../controllers/ProfesionalController');

const router = express.Router();

router.get('/', getProfesionales);
router.post('/', addProfesional);
router.get('/:id_profesional', getProfesional);
router.put('/:id_profesional', updateProfesionalById);
router.delete('/:id_profesional', deleteProfesionalById);

module.exports = router;
