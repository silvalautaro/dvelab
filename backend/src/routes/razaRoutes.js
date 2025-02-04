const express = require('express');
const path = require('path');
const { getRazas, addRaza, updateRazaById, deleteRazaById } = require('../controllers/RazaController');

const router = express.Router();

router.get('/', getRazas);
router.post('/', addRaza);
router.put('/:id', updateRazaById);
router.delete('/:id', deleteRazaById);

module.exports = router;
