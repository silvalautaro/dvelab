const express = require('express');
const path = require('path');
const { getProtocolos, addProtocolo, getProtocoloId } = require('../controllers/ProtocoloController');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.get('/', getProtocolos);
router.post('/', upload.none(), addProtocolo);
router.get('/:id', getProtocoloId);

module.exports = router;