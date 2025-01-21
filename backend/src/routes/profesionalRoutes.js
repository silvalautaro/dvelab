const express = require('express');
const path = require('path');
const { getProfesionales, addProfesional } = require('../controllers/ProfesionalController');

const router = express.Router();

router.get('/', getProfesionales);
router.post('/', addProfesional);

module.exports = router;
