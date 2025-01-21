const { getAllHemogramas, createHemograma } = require('../services/HemogramaService');
const { validationResult } = require('express-validator');

const getHemogramas = async (req, res) => {
  try {
    let resultValidation = validationResult(req);
    if (!resultValidation.isEmpty()) {
      return res.status(400).json({ errors: resultValidation.array(), status: 400, ok: false });
    }
    const hemogramas = await getAllHemogramas(req.query.protocoloId);
    res.json({ result: hemogramas, status: 200, ok: true });
  } catch (err) {
      res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addHemograma = async (req, res) => {
  try {
    const nuevaHemograma = await createHemograma(req.body);
    res.status(201).json({ result: nuevaHemograma, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getHemogramas,
  addHemograma,
};
