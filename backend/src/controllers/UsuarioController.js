const Usuario = require('../services/UsuarioService');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const UsuarioController = {
    processRegister: async (req, res) => {
      const { email, password } = req.body;
      const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
      try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const getUsuario = await Usuario.findByEmail(email);
        if (getUsuario) return res.status(400).json({ error: 'El usuario ya existe' });
        const newUsuario = await Usuario.create({ 
          ...req.body, 
          password: hashedPassword
         });
        res.status(201).json({ message: 'Usuario creado', usuario: newUsuario });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
    findAll: async (req, res) => {
      try {
        const usuarios = await Usuario.findAll();
        res.json({ result: usuarios.length, usuarios: usuarios, status: 200, ok: true });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    findById: async (req, res) => {
      try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ usuario: usuario, status: 200, ok: true });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    processLogin: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
        const usuario = await Usuario.findByEmail(email);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        const validPassword = await bcryptjs.compare(password, usuario.password);
        if (!validPassword) return res.status(400).json({ error: 'Contraseña incorrecta' });
        res.json({ message: 'Bienvenido' });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
    update: async (req, res) => {
      try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        const usuarioUpdate = await Usuario.update(req.params.id, req.body);
        res.json({ message: 'Usuario actualizado', usuario: usuarioUpdate, status: 200, ok: true });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
    delete: async (req, res) => {
      try {
        const usuario = await Usuario.delete(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado', status: 200, ok: true });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
};

module.exports = UsuarioController;