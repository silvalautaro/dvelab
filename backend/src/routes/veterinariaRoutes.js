const express = require('express');
const path = require('path');
const { getVeterinarias, addVeterinaria } = require('../controllers/VeterinariaController');

const router = express.Router();

router.get('/', getVeterinarias);
router.post('/', addVeterinaria);

module.exports = router;
