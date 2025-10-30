const path = require("path");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen ,actualizarP12} = require("../helpers/actualizar-imagen");

const fs = require("fs");

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  // Validar tipo
  const tiposValidos = ["productos", "empresas", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      msg: "No es un producto, empresa u usuario (tipo)"
    });
  }

  // Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      msg: "No hay ningún archivo"
    });
  }

  // Procesar la imagen...
  const file = req.files.imagen;

  const nombreCortado = file.name.split("."); 
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Validar extension
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
        message: "No es una extensión permitida"
    });
  }

  // Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // Path para guardar la imagen
  const path = `./src/uploads/${tipo}/${nombreArchivo}`;
  console.log(path);
  // Mover la imagen
  file.mv(path, err => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err?.original?.detail || err?.errors[0].message  ||  "Error al mover la imagen"
      });
    }

    // Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);

    res.status(200).json({
        message: "Archivo subido",
      nombreArchivo
    });
  });
};

const p12fileUpload = (req, res = response) => {
   const id = req.params.certificadoId;
 
  // Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      msg: "No hay ningún archivo"
    });
  }

  // Procesar la imagen...
  const file = req.files.certificado;

  const nombreCortado = file.name.split("."); 
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Validar extension
  const extensionesValidas = ["p12"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
        message: "No es una extensión permitida"
    });
  }
  // Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // Path para guardar la imagen
  const path = `./src/certificado/${nombreArchivo}`;
  console.log(path);
  // Mover la imagen
  file.mv(path, err => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err?.original?.detail || err?.errors[0].message  ||  "Error al mover la certificado"
      });
    }
 
    actualizarP12( id, nombreArchivo);

    res.status(200).json({
        message: "Archivo subido",
      nombreArchivo
    });
  });
};



const getImage = async (req, res = response) => {
  try {
    const { tipo, foto } = req.params;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    // imagen por defecto
    if (fs.existsSync(pathImg)) {
      res.sendFile(pathImg);
    } else {
      const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
      res.sendFile(pathImg);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error interno, verifique log"
    });
  }
};

module.exports = {
  fileUpload,
  getImage,
  p12fileUpload,
};
