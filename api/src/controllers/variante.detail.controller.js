const { Op } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Variante = require('../models/Variante.models');
const Producto = require('../models/Producto.models');
const Descuento = require('../models/Descuento.models');
const moment = require('moment');
const { aplicarDescuento } = require('../helper/productos.helper');
const VarianteAtributo = require('../models/VarianteAtributo.models');
const ValorAtributo = require('../models/ValorAtributo.models');
const Atributo = require('../models/Atributo.models');

/**
 * Obtener descuento vigente para una variante
 */
const getDescuentoVigente = async (varianteId) => {
  const hoy = moment().format('YYYY-MM-DD');

  const descuento = await Descuento.findOne({
    where: {
      varianteId,
      activo: true,
      fechaDesde: { [Op.lte]: hoy },
      fechaHasta: { [Op.gte]: hoy },
      tipo: 'PRODUCTO'
    },
    attributes: ['valor'],
    raw: true
  });

  return descuento;
};

 

/**
 * Obtener todas las variantes del producto con sus atributos
 * Retorna estructura plana: { slug, varianteId, atributos: { nombreAtributo: { id, valor, metadata } } }
 */
const getVariantesConAtributos = async (productoId) => {
  // 1️⃣ Obtener todas las variantes activas del producto
  const variantes = await Variante.findAll({
    where: { productoId, activo: true },
    attributes: ['id', 'slug', 'imagenUrl', 'precio'],
    include: [
      {
        model: VarianteAtributo,
        as: 'atributos',
        attributes: ['id', 'orden'],
        include: [
          {
            model: ValorAtributo,
            as: 'valorAtributo',
            attributes: ['id', 'valor', 'propiedades'],
            include: [
              {
                model: Atributo,
                as: 'atributo',
                attributes: ['id', 'nombre', 'orden']
              }
            ]
          }
        ]
      }
    ],
    order: [
      ['id', 'ASC'],
      [{ model: VarianteAtributo, as: 'atributos' }, 'orden', 'ASC'],
      [{ model: VarianteAtributo, as: 'atributos' }, { model: ValorAtributo, as: 'valorAtributo' }, { model: Atributo, as: 'atributo' }, 'orden', 'ASC']
    ]
  });

  // 2️⃣ Reestructurar el resultado al mismo formato que tenías
  const resultado = variantes.map(v => ({
    id: v.id,
    slug: v.slug,
    imagenUrl: v.imagenUrl,
    precio: parseFloat(v.precio),
    atributos: v.atributos.reduce((acc, va) => {
      const atributo = va.valorAtributo.atributo;
      acc[atributo.nombre] = {
        atributoId: atributo.id,
        atributoOrden: atributo.orden,
        valorId: va.valorAtributo.id,
        valor: va.valorAtributo.valor,
        metadata: va.valorAtributo.propiedades || {}
      };
      return acc;
    }, {})
  }));

  return resultado;
};

/**
 * Construir opciones de atributos disponibles según la variante actual
 * Para cada atributo, solo muestra valores compatibles con los OTROS atributos seleccionados
 */
const construirOpcionesAtributos = (todasVariantes, varianteActual) => {
  const atributosActuales = varianteActual.atributos;
  const nombresAtributos = Object.keys(atributosActuales);
  
  // Estructura: Map<nombreAtributo, Map<valorId, { valor, metadata, slug, etc }>>
  const opcionesMap = new Map();

  // Inicializar estructura para cada atributo
  nombresAtributos.forEach(nombreAttr => {
    opcionesMap.set(nombreAttr, {
      id: atributosActuales[nombreAttr].atributoId,
      nombre: nombreAttr,
      orden: atributosActuales[nombreAttr].atributoOrden,
      valores: new Map()
    });
  });

  // Para cada atributo, buscar los valores disponibles
  nombresAtributos.forEach(nombreAtributoActual => {
    const opcionGrupo = opcionesMap.get(nombreAtributoActual);

    // Obtener los OTROS atributos seleccionados (no el actual)
    const otrosAtributos = nombresAtributos.filter(n => n !== nombreAtributoActual);
    
    // Filtrar variantes que coincidan con los OTROS atributos
    const variantesFiltradas = todasVariantes.filter(v => {
      return otrosAtributos.every(otroNombre => {
        const valorSeleccionado = atributosActuales[otroNombre].valor;
        return v.atributos[otroNombre]?.valor === valorSeleccionado;
      });
    });

    // Recolectar los valores únicos de este atributo
    variantesFiltradas.forEach(v => {
      const atributo = v.atributos[nombreAtributoActual];
      if (!atributo) return;

      if (!opcionGrupo.valores.has(atributo.valorId)) {
        opcionGrupo.valores.set(atributo.valorId, {
          id: atributo.valorId,
          valor: atributo.valor,
          metadata: atributo.metadata,
          slug: v.slug,
          imagenUrl: v.imagenUrl, 
          seleccionado: atributo.valorId === atributosActuales[nombreAtributoActual].valorId
        });
      }
    });
  });

  // Convertir a array
  return Array.from(opcionesMap.values())
    .map(grupo => ({
      id: grupo.id,
      nombre: grupo.nombre,
      orden: grupo.orden,
      valores: Array.from(grupo.valores.values())
        .sort((a, b) => a.valor.localeCompare(b.valor))
    }))
    .sort((a, b) => a.orden - b.orden);
};

/**
 * GET /api/variantes/:identificador
 * Obtiene el detalle completo de una variante por ID o slug
 */
const getVarianteDetail = async (req, res) => {
  try {
    const { identificador } = req.params;

    // Determinar si es ID numérico o slug
    const isNumeric = !isNaN(identificador);
    const whereClause = isNumeric
      ? { id: parseInt(identificador), activo: true }
      : { slug: identificador, activo: true };

    // 1. Obtener la variante principal
    const variante = await Variante.findOne({
      where: whereClause,
      attributes: [
        'id',
        'sku',
        'nombre',
        'slug',
        'precio',
        'imagenUrl',
        'images',
        'destacado',
        'nuevo',
        'productoId'
      ],
      raw: true
    });

    if (!variante) {
      return res.status(404).json({
        success: false,
        message: 'Variante no encontrada'
      });
    }

    // 2. Obtener descuento y calcular precios
    const descuento = await getDescuentoVigente(variante.id); 
  const { price, originalPrice } = aplicarDescuento(
      variante.precio,
      0,
      descuento
    );
    // 3. Obtener información del producto padre
    const producto = await Producto.findOne({
      where: { id: variante.productoId },
      attributes: [
        'id',
        'nombre',
        'descripcion',
        'usosRecomendados',
        'propiedades'
      ],
      raw: true
    });

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto padre no encontrado'
      });
    }

    // 4. Obtener todas las variantes del producto con sus atributos
    const todasVariantes = await getVariantesConAtributos(variante.productoId);
console.log(JSON.stringify(todasVariantes,2))
    // 5. Encontrar la variante actual en el array
    const varianteActual = todasVariantes.find(v => v.id === variante.id);

    if (!varianteActual) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron atributos para la variante'
      });
    }

    // 6. Construir opciones de atributos disponibles
    const opciones = construirOpcionesAtributos(todasVariantes, varianteActual);

    // 7. Construir respuesta final
    res.json( {
        // Información principal de la variante
        id: variante.id,
        sku: variante.sku,
        nombre: variante.nombre,
        slug: variante.slug,
        precio: price,
        precioOriginal: originalPrice,
        descuentoPorcentaje: descuento?.valor || 0,
        
        // Imágenes
        imagenPrincipal: variante.imagenUrl,
        imagenes: variante.images || [],
        
        // Badges
        destacado: variante.destacado,
        nuevo: variante.nuevo,
        
        // Información del producto
        descripcion: producto.descripcion,
        usosRecomendados: producto.usosRecomendados || [],
        propiedades: producto.propiedades || [],
        
        // Opciones de atributos (Variedad, Presentación, etc.)
        // Cada valor tiene su slug para navegar
        opciones
      }
    );
  } catch (error) {
    console.error('Error al obtener detalle de variante:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener detalle de variante',
      error: error.message
    });
  }
};

module.exports = {
  getVarianteDetail
};