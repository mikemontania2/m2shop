const fs = require('fs')
const variantes = require('./variantes.json')

// ✅ Función para limpiar y normalizar textos
function normalizeText (str) {
  if (!str) return ''
  return str
    .normalize('NFD') // separa acentos de las letras
    .replace(/[\u0300-\u036f]/g, '') // elimina los acentos
    .replace(/ñ/g, 'n') // reemplaza ñ manualmente
    .replace(/[^a-zA-Z0-9\s-]/g, '') // elimina caracteres especiales
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // reemplaza espacios por guiones
}

// 🔁 Función para transformar los datos
const convertProductos = data => {
  return data
    .filter(p => p.activo === 'X')
    .map((p, index) => {
      const producto = (p.titulo || '').trim()
      const variedad = (p.variedad || '').trim()
      const presentacion = (p.presentacion || '').trim()
      const partes = [producto, variedad, presentacion].filter(Boolean)
      const name = partes.join(' ')

      const category = normalizeText(p.categoria)
      const subcategory = normalizeText(p.categoria2)
      const descripcionHTML = `<p>${p.descripcion || ''}</p>`

      const propiedadesArray = p.propiedades
        ? p.propiedades.split('\n').map(x => x.trim()).filter(Boolean)
        : []

      const usosArray = p.usosrecomendados ? [p.usosrecomendados.trim()] : []

      const precio = parseFloat(p.precio) || 0
      const descuento = parseFloat(p.descuento) || 0
      const originalPrice = precio.toFixed(0)
      const price = descuento > 0 ? (precio * (1 - descuento / 100)).toFixed(0) : originalPrice

      return {
        id: index + 1,
        producto,
        variedad,
        presentacion,
        name,
        category,
        subcategory,
        sku: p.codproductoerp,
        image: p.img1,
        images: [p.img1, p.img2].filter(Boolean),
        price,
        originalPrice,
        size: [p.presentacion],
        featured: false,
        descripcion: descripcionHTML,
        usosRecomendados: usosArray,
        propiedades: propiedadesArray,
        stock: 0,
        color: p.color ? [p.color] : []
      }
    })
}

// 🔄 Ejecutar conversión
const resultado = convertProductos(variantes)

// 💾 Guardar en archivo JSON
fs.writeFileSync(
  'variantes_convertidos.json',
  JSON.stringify(resultado, null, 2),
  'utf8'
)

console.log(
  '✅ Conversión completada. Archivo generado: variantes_convertidos.json'
)
