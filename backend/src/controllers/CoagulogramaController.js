const { getAllCoagulogramas, createCoagulograma } = require('../services/CoagulogramaService');

const getCoagulogramas = async (req, res) => {
  try {
    const Coagulogramas = await getAllCoagulogramas();
    res.json({ result: Coagulogramas, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addCoagulograma = async (req, res) => {
  try {
    const nuevaCoagulograma = await createCoagulograma(req.body);
    res.status(201).json({ result: nuevaCoagulograma, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getCoagulogramas,
  addCoagulograma,
};
