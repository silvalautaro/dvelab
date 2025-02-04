const Usuario = require('../models/usuario')
const sequelize = require('sequelize');

const UsuarioService = {
    create: async (data) => await Usuario.create(data),
    findAll: async () => await Usuario.findAll(),
    findById: async (id) => await Usuario.findByPk(id),
    findByEmail: async (email) => await Usuario.findOne({ where: { email } }),
    update: async (id, data) => {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) return null;
      return await usuario.update(data);
    },
    delete: async (id) => {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) return null;
      await usuario.destroy();
      return usuario;
    }
};

module.exports = UsuarioService;