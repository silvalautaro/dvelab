const express = require('express');
const generatePDF = require('../utils/pdfGenerator');
const router = express.Router();

router.post('/generate', (req, res) => {
  const { general, hemograma } = req.body;

  if (!general || !hemograma) {
    return res.status(400).send('Faltan datos');
  }

  generatePDF({ general, hemograma }, res);
});

module.exports = router;
