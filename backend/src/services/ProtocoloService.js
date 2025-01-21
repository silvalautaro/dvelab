const { Protocolo, Paciente, Veterinaria, Profesional, Estudio, Especie, Raza, Sexo, ArchivoPdf, Estado } = require('../models');

const getAllProtocolos = async () => {
  return await Protocolo.findAll({
    include: [
      { 
        model: Paciente, 
        include: [
          { model: Especie, attributes: ['tipo'] }, 
          { model: Raza, attributes: ['nombre'] }, 
          { model: Sexo, attributes: ['sexo'] }  
        ] 
      },
      Veterinaria,  
      Profesional,  
      Estudio,     
      Estado,        
      ArchivoPdf
    ],
  });
};

const getProtocoloById = async (id_protocolo) => {
  const protocolo = await Protocolo.findByPk(id_protocolo, {
    include: [
      { 
        model: Paciente, 
        include: [
          { model: Especie, attributes: ['tipo'] }, 
          { model: Raza, attributes: ['nombre'] }, 
          { model: Sexo, attributes: ['sexo'] }  
        ]  
      },
      Veterinaria,  
      Profesional,  
      Estudio,     
      Estado,        
      ArchivoPdf
    ],
  });

  return protocolo;
};

const createProtocolo = async (data) => {
  return await Protocolo.create(data);
};

module.exports = {
  getAllProtocolos,
  getProtocoloById,
  createProtocolo
};