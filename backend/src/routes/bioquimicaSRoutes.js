const express = require('express');
const path = require('path');
const { getBioquimicaSanguineas, addBioquimicaSanguinea } = require('../controllers/BioquimicaSanguineaController');

const router = express.Router();

router.get('/', getBioquimicaSanguineas);
router.post('/', addBioquimicaSanguinea);

module.exports = router;