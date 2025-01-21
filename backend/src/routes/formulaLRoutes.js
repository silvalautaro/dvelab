const express = require('express');
const path = require('path');
const { getFormulaLeucocitarias, addFormulaLeucocitaria } = require('../controllers/FormulaLeucocitariaController');

const router = express.Router();

router.get('/', getFormulaLeucocitarias);
router.post('/', addFormulaLeucocitaria);

module.exports = router;
