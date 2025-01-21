const express = require('express');
const path = require('path');
const { getHemogramas, addHemograma } = require('../controllers/HemogramaController');

const router = express.Router();

router.get('/', getHemogramas);
router.post('/', addHemograma);

module.exports = router;
