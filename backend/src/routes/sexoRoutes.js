const express = require('express');
const path = require('path');
const { getSexos, addSexo } = require('../controllers/SexoController');

const router = express.Router();

router.get('/', getSexos);
router.post('/', addSexo);

module.exports = router;
