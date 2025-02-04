const express = require('express');
const path = require('path');
const { getFormulaLeucocitarias, addFormulaLeucocitaria, getFormulaLeucocitariaById, updateFormulaLeucocitariaById, deleteFormulaLeucocitariaById } = require('../controllers/FormulaLeucocitariaController');

const router = express.Router();

router.get('/', getFormulaLeucocitarias);
router.post('/', addFormulaLeucocitaria);
router.get('/:id', getFormulaLeucocitariaById);
router.put('/:id', updateFormulaLeucocitariaById);
router.delete('/:id', deleteFormulaLeucocitariaById);

module.exports = router;
