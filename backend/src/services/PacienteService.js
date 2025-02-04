const { Paciente, Protocolo } = require('../models');

const getAllPacientes = async () => {
  return await Paciente.findAll();
};

const getPacienteById = async (id) => {
    return await Paciente.findOne({
      where: { id_paciente: id },
      include: [{
        model: Protocolo,
        as: 'protocolos'
      }]
    });
};

const createPaciente = async (data) => {
  return await Paciente.create(data);
};

const updatePaciente = async (id, data) => {
  return await Paciente.update(data, { where: { id_paciente: id } });
};

const deletePaciente = async (id) => {
  return await Paciente.destroy({ where: { id_paciente: id } });
};


module.exports = {
  getAllPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
};
