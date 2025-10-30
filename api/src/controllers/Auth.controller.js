const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { response } = require("express");
const { generarJWT } = require("../helper/jwt-helper");
const Usuario = require("../models/Usuario.models");

/**
 * @route POST /api/auth/register
 * @desc Registrar un nuevo usuario
 * @access Public
 */
const register = async (req, res = response) => {
  try {
    const { email, password, nombre, telefono, direccion, tipoDocumento, documento } = req.body;

    // Validar que el email no exista
    const existeUsuario = await Usuario.findOne({ 
      where: { email: email.toLowerCase() } 
    });

    if (existeUsuario) {
      return res.status(400).json({
        error: "El email ya está registrado"
      });
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({
        error: "La contraseña debe tener al menos 6 caracteres"
      });
    }

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    // Crear nuevo usuario
    const nuevoUsuario = await Usuario.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      nombre,
      telefono: telefono || null,
      direccion: direccion || null,
      tipoDocumento: tipoDocumento || 'ninguno',
      documento: documento || null,
      rol: 'cliente',
      emailVerificado: false,
      activo: true,
      bloqueado: false,
      intentos: 0
    });

    // Generar token JWT
    const token = await generarJWT(nuevoUsuario.id);

    // Obtener usuario sin contraseña
    const usuarioRespuesta = await Usuario.findByPk(nuevoUsuario.id, {
      attributes: { exclude: ['password', 'intentos', 'bloqueado'] }
    });

    res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      token,
      user: usuarioRespuesta
    });

  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ 
      error: error?.original?.detail || "Error al registrar el usuario" 
    });
  }
};

/**
 * @route POST /api/auth/login
 * @desc Iniciar sesión de usuario
 * @access Public
 */
const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const userDB = await Usuario.findOne({
      where: {
        email: email.toLowerCase(),
        activo: true
      }
    });

    if (!userDB) {
      return res.status(404).json({
        error: "Credenciales incorrectas"
      });
    }

    // Verificar si el usuario está bloqueado
    if (userDB.bloqueado) {
      return res.status(401).json({
        error: "Usuario bloqueado por múltiples intentos fallidos. Contacte al administrador."
      });
    }

    // Verificar contraseña
    const validPassword = await bcryptjs.compare(password, userDB.password);

    if (!validPassword) {
      // Incrementar intentos fallidos
      userDB.intentos = (userDB.intentos || 0) + 1;
      
      // Bloquear después de 3 intentos
      if (userDB.intentos >= 3) {
        userDB.bloqueado = true;
      }
      
      await userDB.save();

      return res.status(400).json({
        error: "Contraseña incorrecta",
        intentosRestantes: userDB.bloqueado ? 0 : (3 - userDB.intentos)
      });
    }

    // Login exitoso - resetear intentos
    userDB.intentos = 0;
    await userDB.save();

    // Generar token
    const token = await generarJWT(userDB.id);

    // Obtener usuario sin datos sensibles
    const usuarioRespuesta = await Usuario.findByPk(userDB.id, {
      attributes: { exclude: ['password', 'intentos', 'bloqueado'] }
    });

    res.json({
      mensaje: "Login exitoso",
      token,
      user: usuarioRespuesta
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      error: "Error al iniciar sesión"
    });
  }
};

/**
 * @route POST /api/auth/renew
 * @desc Renovar token JWT
 * @access Private
 */
const renewToken = async (req, res = response) => {
  try {
    const userId = req.usuario.id;
    
    // Buscar usuario actualizado
    const usuario = await Usuario.findByPk(userId, {
      attributes: { exclude: ['password', 'intentos', 'bloqueado'] }
    });

    if (!usuario || !usuario.activo) {
      return res.status(401).json({
        error: "Usuario no válido o inactivo"
      });
    }

    // Generar nuevo token
    const tokenNew = await generarJWT(usuario.id);

    res.status(200).json({
      mensaje: "Token renovado exitosamente",
      token: tokenNew,
      user: usuario
    });

  } catch (error) {
    console.error("Error en renewToken:", error);
    res.status(401).json({
      error: "Token inválido o expirado"
    });
  }
};

/**
 * @route POST /api/auth/update-password
 * @desc Actualizar contraseña del usuario (requiere autenticación)
 * @access Private
 */
const updatePassword = async (req, res = response) => {
  try {
    const { passwordActual, passwordNuevo } = req.body;
    const userId = req.usuario.id;

    // Buscar usuario
    const user = await Usuario.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    // Verificar contraseña actual
    const validPassword = await bcryptjs.compare(passwordActual, user.password);

    if (!validPassword) {
      return res.status(400).json({
        error: "La contraseña actual es incorrecta"
      });
    }

    // Validar nueva contraseña
    if (passwordNuevo.length < 6) {
      return res.status(400).json({
        error: "La nueva contraseña debe tener al menos 6 caracteres"
      });
    }

    // Encriptar nueva contraseña
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(passwordNuevo, salt);

    // Actualizar contraseña y resetear intentos
    user.password = hashedPassword;
    user.intentos = 0;
    user.bloqueado = false;

    await user.save();

    res.status(200).json({
      mensaje: "Contraseña actualizada exitosamente"
    });

  } catch (error) {
    console.error("Error en updatePassword:", error);
    res.status(500).json({ 
      error: error?.original?.detail || "Error al actualizar la contraseña" 
    });
  }
};

/**
 * @route POST /api/auth/reset-password
 * @desc Restablecer contraseña (admin o reset por email)
 * @access Public/Admin
 */
const resetPassword = async (req, res = response) => {
  try {
    const { email, passwordNuevo } = req.body;

    // Buscar usuario
    let user = await Usuario.findOne({ 
      where: { email: email.toLowerCase() } 
    });

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    // Validar nueva contraseña
    if (passwordNuevo.length < 6) {
      return res.status(400).json({
        error: "La contraseña debe tener al menos 6 caracteres"
      });
    }

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(passwordNuevo, salt);

    // Actualizar contraseña y desbloquear cuenta
    user.password = hashedPassword;
    user.intentos = 0;
    user.bloqueado = false;

    await user.save();

    res.status(200).json({
      mensaje: "Contraseña restablecida exitosamente"
    });

  } catch (error) {
    console.error("Error en resetPassword:", error);
    res.status(500).json({ 
      error: error?.original?.detail || "Error al restablecer la contraseña" 
    });
  }
};

/**
 * @route GET /api/auth/profile
 * @desc Obtener perfil del usuario autenticado
 * @access Private
 */
const getProfile = async (req, res = response) => {
  try {
    const userId = req.usuario.id;

    const usuario = await Usuario.findByPk(userId, {
      attributes: { exclude: ['password', 'intentos', 'bloqueado'] }
    });

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    res.json({
      user: usuario
    });

  } catch (error) {
    console.error("Error en getProfile:", error);
    res.status(500).json({
      error: "Error al obtener el perfil"
    });
  }
};

/**
 * @route PUT /api/auth/profile
 * @desc Actualizar perfil del usuario autenticado
 * @access Private
 */
const updateProfile = async (req, res = response) => {
  try {
    const userId = req.usuario.id;
    const { nombre, telefono, direccion, tipoDocumento, documento, fechaNacimiento } = req.body;

    const usuario = await Usuario.findByPk(userId);

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    // Actualizar solo los campos proporcionados
    if (nombre) usuario.nombre = nombre;
    if (telefono !== undefined) usuario.telefono = telefono;
    if (direccion !== undefined) usuario.direccion = direccion;
    if (tipoDocumento) usuario.tipoDocumento = tipoDocumento;
    if (documento !== undefined) usuario.documento = documento;
    if (fechaNacimiento !== undefined) usuario.fechaNacimiento = fechaNacimiento;

    await usuario.save();

    const usuarioActualizado = await Usuario.findByPk(userId, {
      attributes: { exclude: ['password', 'intentos', 'bloqueado'] }
    });

    res.json({
      mensaje: "Perfil actualizado exitosamente",
      user: usuarioActualizado
    });

  } catch (error) {
    console.error("Error en updateProfile:", error);
    res.status(500).json({
      error: error?.original?.detail || "Error al actualizar el perfil"
    });
  }
};

/**
 * @route POST /api/auth/logout
 * @desc Cerrar sesión (opcional, principalmente client-side)
 * @access Private
 */
const logout = async (req, res = response) => {
  try {
    // En JWT, el logout es principalmente client-side (eliminar token)
    res.json({
      mensaje: "Sesión cerrada exitosamente"
    });

  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({
      error: "Error al cerrar sesión"
    });
  }
};

// ========================================
// FUNCIONES DE ADMINISTRACIÓN (ADMIN)
// ========================================

/**
 * @route GET /api/auth/users
 * @desc Listar todos los usuarios
 * @access Admin
 */
const listarUsuarios = async (req, res = response) => {
  try {
    const { page = 1, limit = 10, rol, activo, buscar } = req.query;
    
    const offset = (page - 1) * limit;
    const where = {};

    // Filtros
    if (rol) where.rol = rol;
    if (activo !== undefined) where.activo = activo === 'true';
    if (buscar) {
      where[Op.or] = [
        { nombre: { [Op.iLike]: `%${buscar}%` } },
        { email: { [Op.iLike]: `%${buscar}%` } }
      ];
    }

    const { count, rows } = await Usuario.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      usuarios: rows
    });

  } catch (error) {
    console.error('Error listando usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

/**
 * @route GET /api/auth/users/:id
 * @desc Obtener usuario por ID
 * @access Admin
 */
const obtenerUsuarioPorId = async (req, res = response) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ usuario });

  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

/**
 * @route PUT /api/auth/users/:id
 * @desc Actualizar usuario (admin)
 * @access Admin
 */
const actualizarUsuario = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, direccion, tipoDocumento, documento, rol, activo, emailVerificado } = req.body;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar campos
    if (nombre !== undefined) usuario.nombre = nombre;
    if (telefono !== undefined) usuario.telefono = telefono;
    if (direccion !== undefined) usuario.direccion = direccion;
    if (tipoDocumento !== undefined) usuario.tipoDocumento = tipoDocumento;
    if (documento !== undefined) usuario.documento = documento;
    if (rol !== undefined) usuario.rol = rol;
    if (activo !== undefined) usuario.activo = activo;
    if (emailVerificado !== undefined) usuario.emailVerificado = emailVerificado;

    await usuario.save();

    const usuarioActualizado = await Usuario.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      mensaje: 'Usuario actualizado exitosamente',
      usuario: usuarioActualizado
    });

  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

/**
 * @route PUT /api/auth/users/:id/toggle-status
 * @desc Activar/Desactivar usuario
 * @access Admin
 */
const toggleStatusUsuario = async (req, res = response) => {
  try {
    const { id } = req.params;
    
    const usuario = await Usuario.findByPk(id);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    usuario.activo = !usuario.activo;
    await usuario.save();
    
    res.json({
      mensaje: `Usuario ${usuario.activo ? 'activado' : 'desactivado'} exitosamente`,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        activo: usuario.activo
      }
    });

  } catch (error) {
    console.error('Error al cambiar estado del usuario:', error);
    res.status(500).json({ error: 'Error al cambiar estado' });
  }
};

/**
 * @route PUT /api/auth/users/:id/unlock
 * @desc Desbloquear usuario
 * @access Admin
 */
const desbloquearUsuario = async (req, res = response) => {
  try {
    const { id } = req.params;
    
    const usuario = await Usuario.findByPk(id);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    usuario.bloqueado = false;
    usuario.intentos = 0;
    await usuario.save();
    
    res.json({
      mensaje: 'Usuario desbloqueado exitosamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        bloqueado: usuario.bloqueado
      }
    });

  } catch (error) {
    console.error('Error al desbloquear usuario:', error);
    res.status(500).json({ error: 'Error al desbloquear usuario' });
  }
};

/**
 * @route DELETE /api/auth/users/:id
 * @desc Eliminar usuario
 * @access Admin
 */
const eliminarUsuario = async (req, res = response) => {
  try {
    const { id } = req.params;
    
    const usuario = await Usuario.findByPk(id);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // No permitir que el admin se elimine a sí mismo
    if (usuario.id === req.usuario.id) {
      return res.status(400).json({ 
        error: 'No puedes eliminar tu propia cuenta' 
      });
    }
    
    await usuario.destroy();
    
    res.json({
      mensaje: 'Usuario eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

module.exports = {
  register,
  login,
  renewToken,
  updatePassword,
  resetPassword,
  getProfile,
  updateProfile,
  logout,
  // Funciones Admin
  listarUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  toggleStatusUsuario,
  desbloquearUsuario,
  eliminarUsuario
};