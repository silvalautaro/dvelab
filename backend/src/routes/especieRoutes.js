const express = require('express');
const path = require('path');
const { getEspecies, addEspecie } = require('../controllers/EspecieController');

const router = express.Router();

router.get('/', getEspecies);
router.post('/', addEspecie);

module.exports = router;
