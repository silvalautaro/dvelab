const express = require('express');
const path = require('path');
const { getEspecies, addEspecie, updateEspecieById, deleteEspecieById } = require('../controllers/EspecieController');

const router = express.Router();

router.get('/', getEspecies);
router.post('/', addEspecie);
router.put('/:id', updateEspecieById);
router.delete('/:id', deleteEspecieById);

module.exports = router;
