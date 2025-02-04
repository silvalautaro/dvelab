const express = require('express');
const path = require('path');
const { getProtocolos, addProtocolo, getProtocoloId, updateProtocoloId, deleteProtocoloId, searchProtocolosByFilters } = require('../controllers/ProtocoloController');

const router = express.Router();

router.get('/', getProtocolos);
router.get('/:id', getProtocoloId);
router.post('/', addProtocolo);
router.put('/:id', updateProtocoloId);
router.delete('/:id', deleteProtocoloId);
router.get('/go/search?', searchProtocolosByFilters);

module.exports = router;