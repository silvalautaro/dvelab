const BioquimicaSanguinea = require('../models/bioquimicaSanguinea');
let bioquimicaSanguinea;
const getAllBioquimicaSanguineas = async () => {
  return await BioquimicaSanguinea.findAll();
};

const createBioquimicaSanguinea = async (data) => {
  return await BioquimicaSanguinea.create(data);
};

const getBioquimicaSanguinea = async (id_protocolo) => {
  return await BioquimicaSanguinea.findOne({
    where: { id_protocolo },
  });
};

const updateBioquimicaSanguinea = async (id_protocolo, data) => {
  bioquimicaSanguinea = await getBioquimicaSanguinea(id_protocolo);
  if(!bioquimicaSanguinea) {
    throw new Error('Bioquimica Sanguinea no encontrada');
  }
  return await bioquimicaSanguinea.update(data);
};

const deleteBioquimicaSanguinea = async (id_protocolo) => {
  bioquimicaSanguinea = await getBioquimicaSanguinea(id_protocolo);
  if(!bioquimicaSanguinea) {
    throw new Error('Bioquimica Sanguinea no encontrada');
  }
  return await bioquimicaSanguinea.destroy();
};

module.exports = {
  getAllBioquimicaSanguineas,
  createBioquimicaSanguinea,
  getBioquimicaSanguinea,
  updateBioquimicaSanguinea,
  deleteBioquimicaSanguinea
};
