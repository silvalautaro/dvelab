const express = require('express');
const path = require('path');
const { getRazas, addRaza } = require('../controllers/RazaController');

const router = express.Router();

router.get('/', getRazas);
router.post('/', addRaza);

module.exports = router;
