const fs = require('fs'); // Importa el módulo 'fs' para manejar el sistema de archivos
const path = require('path'); // Importa el módulo 'path' para manejar rutas de archivos y directorios

const logDir = path.join(__dirname, 'logs'); // Establece la ruta al directorio de logs como una combinación de la ruta actual (__dirname) y la carpeta 'logs'

// Función asincrónica para asegurar que el directorio de logs exista
const ensureLogDirectoryExists = async () => {
  try {
    // Crea el directorio de logs de manera recursiva si no existe
    await fs.promises.mkdir(logDir, { recursive: true });
    console.log(`Log directory ${logDir} created successfully.`); // Imprime un mensaje si se crea el directorio de logs con éxito
  } catch (err) {
    console.error(`Error creating log directory: ${err.message}`); // Imprime un mensaje de error si ocurre algún problema al crear el directorio
    throw err; // Rechaza la promesa para manejar el error en el bloque catch de loggerPos
  }
};

// Función para obtener la ruta del archivo de log actual basado en la fecha actual
const getLogFilePath = () => {
  const now = new Date(); // Obtiene la fecha y hora actual
  const dateString = now.toISOString().slice(0, 10); // Obtiene la parte de la fecha en formato 'YYYY-MM-DD'
  return path.join(logDir, `${dateString}_log.log`); // Combina la ruta del directorio de logs con el nombre del archivo de log
};


// Función asincrónica para escribir en el archivo de log
const writeLog = async (logFilePath, message) => {
  try {
    const now = new Date().toISOString(); // Obtiene la fecha y hora actual en formato ISO
    // Filtra caracteres especiales del mensaje y agrega la fecha actual al formato de log
   // const sanitizedMessage = message.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
    // Agrega el mensaje al archivo de log especificado
    await fs.promises.appendFile(logFilePath, `[${now}] ${cleanLogText(message)}\n`);
  } catch (error) {
    console.error('Error writing to log file:', error); // Imprime un mensaje de error si ocurre un problema al escribir en el archivo de log
    throw error; // Rechaza la promesa para manejar el error en el bloque catch de loggerPos
  }
};

// Función principal para configurar el logger
const loggerPos = async () => {
  console.log('Escribiendo en log'); // Imprime un mensaje para indicar que se está escribiendo en el log
  try {
    await ensureLogDirectoryExists(); // Asegura que el directorio de logs exista
    const logFilePath = getLogFilePath(); // Obtiene la ruta del archivo de log actual

    // Escribe un mensaje de prueba en el archivo de log para asegurarse de que se pueda escribir correctamente
    await writeLog(logFilePath, 'Prueba de escritura en el archivo de registro.');

    // Establece el flujo de salida estándar y de error para escribir en el archivo de log
    process.stdout.write = (message) => writeLog(logFilePath, message);
    process.stderr.write = (message) => writeLog(logFilePath, message);
  } catch (error) {
    console.error('Error setting up logger:', error); // Imprime un mensaje de error si ocurre un problema al configurar el logger
  }
};
const cleanLogText = (logText) => {
  // Expresión regular para encontrar códigos ANSI
  const ansiRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
  
  // Reemplazar los códigos ANSI por caracteres de control
  return logText.replace(ansiRegex, '');
};
module.exports = { loggerPos }; // Exporta la función loggerPos para su uso en otros módulos
