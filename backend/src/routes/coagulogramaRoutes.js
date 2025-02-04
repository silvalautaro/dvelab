const express = require('express');
const path = require('path');
const { getCoagulogramas, addCoagulograma, getCoagulogramaById, updateCoagulogramaById, deleteCoagulogramaById } = require('../controllers/CoagulogramaController');

const router = express.Router();

router.get('/', getCoagulogramas);
router.post('/', addCoagulograma);
router.get('/:id', getCoagulogramaById);
router.put('/:id', updateCoagulogramaById);
router.delete('/:id', deleteCoagulogramaById);

module.exports = router;
