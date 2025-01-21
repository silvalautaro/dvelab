const express = require('express');
const path = require('path');
const { getEstudios, addEstudio } = require('../controllers/EstudioController');

const router = express.Router();

router.get('/', getEstudios);
router.post('/', addEstudio);

module.exports = router;
