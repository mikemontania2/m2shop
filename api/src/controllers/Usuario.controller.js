const { Op } = require('sequelize');
const Usuario = require('../models/Usuario.models');
const { sequelize } = require('../../dbconfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registrar = async (req, res) => {
   try {
        const { email, password, nombre, apellido, telefono, documento, fechaNacimiento } = req.body;
        
        // Verificar si el email ya existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
          return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }
  
        // Hash de la contraseña
        const passwordHash = await bcrypt.hash(password, 10);
  
        const nuevoUsuario = await Usuario.create({
          email,
          password: passwordHash,
          nombre,
          apellido,
          telefono,
          documento,
          fechaNacimiento,
          rol: 'cliente'
        });
  
        // Generar token
        const token = jwt.sign(
          { id: nuevoUsuario.id, email: nuevoUsuario.email, rol: nuevoUsuario.rol },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
  
        res.status(201).json({
          mensaje: 'Usuario registrado exitosamente',
          token,
          usuario: {
            id: nuevoUsuario.id,
            email: nuevoUsuario.email,
            nombre: nuevoUsuario.nombre,
            apellido: nuevoUsuario.apellido,
            rol: nuevoUsuario.rol
          }
        });
      } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
      }
};
 const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      if (!usuario.activo) {
        return res.status(401).json({ mensaje: 'Usuario inactivo' });
      }

      const passwordValido = await bcrypt.compare(password, usuario.password);
      if (!passwordValido) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        mensaje: 'Login exitoso',
        token,
        usuario: {
          id: usuario.id,
          email: usuario.email,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          rol: usuario.rol
        }
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};
 const obtenerPerfil = async (req, res) => {
      try {
      const usuario = await Usuario.findByPk(req.usuario.id, {
        attributes: { exclude: ['password'] },
        include: [{ model: DireccionEnvio }]
      });

      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      res.json(usuario);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener perfil', error: error.message });
    } 
};
 const actualizarPerfil = async (req, res) => {
      try {
      const { nombre, apellido, telefono, documento, fechaNacimiento } = req.body;

      await Usuario.update(
        { nombre, apellido, telefono, documento, fechaNacimiento },
        { where: { id: req.usuario.id } }
      );

      const usuarioActualizado = await Usuario.findByPk(req.usuario.id, {
        attributes: { exclude: ['password'] }
      });

      res.json({ mensaje: 'Perfil actualizado', usuario: usuarioActualizado });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar perfil', error: error.message });
    } 
};
 const cambiarPassword = async (req, res) => {
       try {
      const { passwordActual, passwordNuevo } = req.body;

      const usuario = await Usuario.findByPk(req.usuario.id);
      const passwordValido = await bcrypt.compare(passwordActual, usuario.password);

      if (!passwordValido) {
        return res.status(400).json({ mensaje: 'Contraseña actual incorrecta' });
      }

      const passwordHash = await bcrypt.hash(passwordNuevo, 10);
      await Usuario.update({ password: passwordHash }, { where: { id: req.usuario.id } });

      res.json({ mensaje: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al cambiar contraseña', error: error.message });
    }
};
 const listarTodos = async (req, res) => {
       try {
      const { page = 1, limit = 20, rol } = req.query;
      const offset = (page - 1) * limit;

      const where = {};
      if (rol) where.rol = rol;

      const { count, rows } = await Usuario.findAndCountAll({
        where,
        attributes: { exclude: ['password'] },
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        total: count,
        paginas: Math.ceil(count / limit),
        paginaActual: parseInt(page),
        usuarios: rows
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar usuarios', error: error.message });
    }
};
module.exports = {
  registrar,login,obtenerPerfil,actualizarPerfil,cambiarPassword,listarTodos
};
