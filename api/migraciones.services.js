const fs = require('fs').promises;
const path = require('path');
const Categoria = require('./src/models/Categoria.models');
const Producto = require('./src/models/Producto.models');
const Variante = require('./src/models/Variante.models');
const Atributo = require('./src/models/Atributo.models');
const ValorAtributo = require('./src/models/ValorAtributo.models');
const VarianteAtributo = require('./src/models/VarianteAtributo.models');
const Descuento = require('./src/models/Descuento.models');

// === MAPAS GLOBALES (sustituyen a los this.xxx) ===
const categoriasMap = new Map();
const subcategoriasMap = new Map();
const productosMap = new Map();
const atributosMap = new Map();
const valoresAtributosMap = new Map();

// ==================================================
const ejecutarMigracion = async () => {
  try {
    console.log('🚀 Iniciando migración de datos...\n');

    const variantesData = await cargarDatos();
    console.log(`📦 Cargadas ${variantesData.length} variantes del JSON\n`);

    await procesarCategorias(variantesData);
    await procesarProductos(variantesData);
    await procesarAtributos(variantesData);
    await procesarVariantes(variantesData);
    await procesarDescuentos(variantesData);

    console.log('\n✅ Migración completada exitosamente!');
    mostrarEstadisticas();
  } catch (error) {
    console.error('❌ Error en la migración:', error);
    throw error;
  }
};

// ==================================================
const cargarDatos = async () => {
  const filePath = path.join(__dirname, 'variantes_convertidos.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

// ==================================================
const cargarCategoriasGeneradas = async () => {
  try {
    const filePath = path.join(__dirname, 'categorias_generadas.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    console.warn('⚠️  No se pudo cargar categorias_generadas.json');
    return [];
  }
};

// ==================================================
const procesarCategorias = async (variantes) => {
  console.log('📁 Procesando categorías y subcategorías...');

  const categoriasSet = new Set();
  const subcategoriasTemp = new Map();

  variantes.forEach(v => {
    if (v.category) {
      categoriasSet.add(v.category);

      if (v.subcategory) {
        if (!subcategoriasTemp.has(v.category)) {
          subcategoriasTemp.set(v.category, new Set());
        }
        subcategoriasTemp.get(v.category).add(v.subcategory);
      }
    }
  });

  const categoriasGeneradas = await cargarCategoriasGeneradas();

  for (const catSlug of categoriasSet) {
    const catData = categoriasGeneradas.find(c => c.id === catSlug);
    const [categoria, created] = await Categoria.findOrCreate({
      where: { slug: catSlug },
      defaults: {
        nombre: catData?.name || slugToName(catSlug),
        slug: catSlug,
        descripcion: catData?.description || '',
        imagenUrl: catData?.image || null,
        orden: 0,
        activo: true,
      },
    });

    categoriasMap.set(catSlug, categoria.id);
    if (created) console.log(`  ✓ Categoría creada: ${categoria.nombre}`);
  }

  for (const [catSlug, subCats] of subcategoriasTemp) {
    const categoriaId = categoriasMap.get(catSlug);
    const catData = categoriasGeneradas.find(c => c.id === catSlug);

    for (const subSlug of subCats) {
      const subData = catData?.subcategories?.find(s => s.id === subSlug);

      const [subcategoria, created] = await Categoria.findOrCreate({
        where: { slug: subSlug },
        defaults: {
          nombre: subData?.name || slugToName(subSlug),
          slug: subSlug,
          descripcion: subData?.description || '',
          categoriasPadreId: categoriaId,
          orden: 0,
          activo: true,
        },
      });

      subcategoriasMap.set(subSlug, subcategoria.id);
      if (created) console.log(`    ✓ Subcategoría creada: ${subcategoria.nombre}`);
    }
  }

  console.log(`✅ Procesadas ${categoriasMap.size} categorías y ${subcategoriasMap.size} subcategorías\n`);
};

// ==================================================
const procesarProductos = async (variantes) => {
  console.log('📦 Procesando productos...');

  const productosTemp = new Map();

  variantes.forEach(v => {
    if (!productosTemp.has(v.producto)) {
      productosTemp.set(v.producto, { nombre: v.producto, variantes: [] });
    }
    productosTemp.get(v.producto).variantes.push(v);
  });

  for (const [nombreProducto, data] of productosTemp) {
    const primeraVariante = data.variantes[0];
    const categoriaId = categoriasMap.get(primeraVariante.category);
    const subcategoriaId = subcategoriasMap.get(primeraVariante.subcategory);
    const slug = generarSlug(nombreProducto);

    const [producto, created] = await Producto.findOrCreate({
      where: { slug },
      defaults: {
        nombre: nombreProducto,
        slug,
        descripcion: primeraVariante.descripcion || null,
        usosRecomendados: primeraVariante.usosRecomendados || null,
        propiedades: primeraVariante.propiedades || null,
        categoriaId,
        subcategoriaId,
        activo: true,
      },
    });

    productosMap.set(nombreProducto, producto.id);
    if (created) console.log(`  ✓ Producto creado: ${producto.nombre}`);
  }

  console.log(`✅ Procesados ${productosMap.size} productos\n`);
};
 
// ==================================================
const procesarAtributos = async (variantes) => {
  console.log('🏷️  Procesando atributos y valores...');

  // Solo 2 atributos: Variedad y Presentación
  const [atributoVariedad] = await Atributo.findOrCreate({
    where: { nombre: 'Variedad' },
    defaults: { nombre: 'Variedad', orden: 1, activo: true },
  });
  atributosMap.set('variedad', atributoVariedad.id);

  const [atributoPresentacion] = await Atributo.findOrCreate({
    where: { nombre: 'Presentación' },
    defaults: { nombre: 'Presentación', orden: 2, activo: true },
  });
  atributosMap.set('presentacion', atributoPresentacion.id);

  // Mapas para evitar duplicados
  const variedadesMap = new Map();
  const presentacionesMap = new Map();

  // Recorremos todas las variantes
  variantes.forEach(v => {
    // --- VARIEDAD ---
    if (v.variedad) {
      const color = Array.isArray(v.color) ? v.color[0] : v.color || null;
      if (!variedadesMap.has(v.variedad)) {
        variedadesMap.set(v.variedad, color);
      }
    }

    // --- PRESENTACIÓN ---
    if (v.presentacion) {
      // Buscar imagen relacionada a la presentación
      let imagenPresentacion = null;
      if (Array.isArray(v.images)) {
        imagenPresentacion = v.images.find(img =>
          img.toLowerCase().includes(v.presentacion.toLowerCase())
        ) || null;
      }
      // Si no se encuentra, usar imagen principal
      if (!imagenPresentacion && v.image) {
        imagenPresentacion = v.image;
      }

      if (!presentacionesMap.has(v.presentacion)) {
        presentacionesMap.set(v.presentacion, imagenPresentacion);
      }
    }
  });

  // Crear valores para Variedad (con color)
  for (const [nombreVariedad, color] of variedadesMap.entries()) {
    const [valor] = await ValorAtributo.findOrCreate({
      where: { atributoId: atributoVariedad.id, valor: nombreVariedad },
      defaults: {
        atributoId: atributoVariedad.id,
        valor: nombreVariedad,
        propiedades: color ? { color } : null,
        activo: true,
      },
    });
    valoresAtributosMap.set(`variedad-${nombreVariedad}`, valor.id);
  }

  // Crear valores para Presentación (con imagen)
  for (const [presentacion, imagen] of presentacionesMap.entries()) {
    const propiedades = imagen ? { imagen } : null;
    const [valor] = await ValorAtributo.findOrCreate({
      where: { atributoId: atributoPresentacion.id, valor: presentacion },
      defaults: {
        atributoId: atributoPresentacion.id,
        valor: presentacion,
        propiedades,
        activo: true,
      },
    });
    valoresAtributosMap.set(`presentacion-${presentacion}`, valor.id);
  }

  console.log(`✅ Procesados 2 atributos (Variedad y Presentación) con ${valoresAtributosMap.size} valores\n`);
};
 
// ==================================================
const procesarVariantes = async (variantes) => {
  console.log('🎨 Procesando variantes...');
  let contadorCreadas = 0;

  for (const v of variantes) {
    const productoId = productosMap.get(v.producto);
    if (!productoId) {
      console.warn(`⚠️  Producto no encontrado: ${v.producto}`);
      continue;
    }

    const [variante, created] = await Variante.findOrCreate({
      where: { sku: v.sku },
      defaults: {
        productoId,
        sku: v.sku,
        slug: generarSlug(`${v.producto} ${v.variedad || ''} ${v.presentacion || ''}`),
        precio: parseFloat(v.price) || 0,
        precioOriginal: parseFloat(v.originalPrice) || null,
        imagenUrl: v.image || null,
        images: v.images || null,
        stock: v.stock || 0,
        destacado: v.featured || false,
        nuevo: false,
        activo: true,
      },
    });

    if (created) {
      contadorCreadas++;
      let orden = 1;

      const agregarAtributo = async (clave, valor) => {
        if (!valor) return;
        const valorId = valoresAtributosMap.get(`${clave}-${valor}`);
        if (valorId) {
          await VarianteAtributo.create({
            varianteId: variante.id,
            valorAtributoId: valorId,
            orden: orden++,
          });
        }
      };

      await agregarAtributo('variedad', v.variedad);
      await agregarAtributo('presentacion', v.presentacion);
    }
  }

  console.log(`✅ Procesadas ${contadorCreadas} variantes nuevas\n`);
};

// ==================================================
const procesarDescuentos = async () => {
  console.log('💰 Procesando descuentos...');
  try {
    const filePath = path.join(__dirname, 'descuentos.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const descuentosData = JSON.parse(data);

    let contadorCreados = 0;

    for (const desc of descuentosData) {
      let varianteId = null;

      if (desc.tipoDescuento === 'PRODUCTO' && desc.sku) {
        const variante = await Variante.findOne({ where: { sku: desc.sku } });
        varianteId = variante?.id || null;
      }

      const [_, created] = await Descuento.findOrCreate({
        where: { id: desc.id },
        defaults: {
          varianteId,
          activo: true,
          cantDesde: parseFloat(desc.cantDesde) || 1,
          cantHasta: parseFloat(desc.cantHasta) || 999999999,
          fechaDesde: new Date(),
          fechaHasta: new Date('2025-12-31'),
          valor: parseFloat(desc.descuento) || 0,
          tipo: desc.tipoDescuento || 'PRODUCTO',
        },
      });

      if (created) contadorCreados++;
    }

    console.log(`✅ Procesados ${contadorCreados} descuentos nuevos\n`);
  } catch {
    console.warn('⚠️  No se pudo cargar descuentos.json');
  }
};

// ==================================================
const mostrarEstadisticas = () => {
  console.log('\n📊 Estadísticas de migración:');
  console.log('═══════════════════════════════════════');
  console.log(`  Categorías: ${categoriasMap.size}`);
  console.log(`  Subcategorías: ${subcategoriasMap.size}`);
  console.log(`  Productos: ${productosMap.size}`);
  console.log(`  Atributos: ${atributosMap.size}`);
  console.log(`  Valores de atributos: ${valoresAtributosMap.size}`);
  console.log('═══════════════════════════════════════\n');
};

// ==================================================
const slugToName = (slug) =>
  slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

const generarSlug = (texto) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// ==================================================
module.exports = { ejecutarMigracion };
