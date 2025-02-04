const express = require('express');
const path = require('path');
const { getVeterinarias, addVeterinaria, updateVeterinariaById, deleteVeterinariaById } = require('../controllers/VeterinariaController');

const router = express.Router();

router.get('/', getVeterinarias);
router.post('/', addVeterinaria);
router.put('/:id', updateVeterinariaById);
router.delete('/:id', deleteVeterinariaById);

module.exports = router;
