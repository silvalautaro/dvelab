const BioquimicaSanguinea = require('../models/bioquimicaSanguinea');

const getAllBioquimicaSanguineas = async () => {
  return await BioquimicaSanguinea.findAll();
};

const createBioquimicaSanguinea = async (data) => {
  return await BioquimicaSanguinea.create(data);
};

module.exports = {
  getAllBioquimicaSanguineas,
  createBioquimicaSanguinea,
};
