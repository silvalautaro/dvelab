const express = require('express');
const path = require('path');
const { getCoagulogramas, addCoagulograma } = require('../controllers/CoagulogramaController');

const router = express.Router();

router.get('/', getCoagulogramas);
router.post('/', addCoagulograma);

module.exports = router;
