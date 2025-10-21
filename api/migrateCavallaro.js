const Bcryptjs = require("bcryptjs");
const Usuario = require("./src/models/usuario.model");
const Sucursal = require("./src/models/sucursal.model");
const Marca = require("./src/models/marca.model");
const Variedad = require("./src/models/variedad.model");
const Presentacion = require("./src/models/presentacion.model");
const Producto = require("./src/models/producto.model");
const ListaPrecio = require("./src/models/listaPrecio.model");
const Valoracion = require("./src/models/valoracion.model");
const CondicionPago = require("./src/models/condicionPago.model");
const Numeracion = require("./src/models/numeracion.model");
const Variante = require("./src/models/variante.model");
const Unidad = require("./src/models/unidad.model");
const { clienteCavallaroJson } = require("./src/json/clientesavallaro.json");
const ClienteSucursal = require("./src/models/ClienteSucursal.model");
const Cliente = require("./src/models/cliente.model");
const Categoria = require("./src/models/categoria.model");
const SubCategoria = require("./src/models/subCategoria.model");

const migrateCavallaroDB = async (facturaId, notaCreditoId, empresaId) => {
  /***************SUCURSAL******************************* */
  const sucursal = await Sucursal.create({
    descripcion: "CAPIATA",
    direccion: "CARRETERA RUTA MCAL. FRANCISCO SOLANO LOPEZ",
    cel: "(0981) 627-369",
    telefono: "(021) 588 9000",
    empresaId: empresaId,
    email: "sucursal@example.com"
  });

  const sucursal1 = await Sucursal.create({
    descripcion: "LUQUE",
    direccion: "AVDA.GRAL. ELIZARDO AQUINO ENTRE MCAL SUCRE Y SAN MARTIN",
    cel: "(0981) 223 162",
    telefono: "(021) 588 9000",
    empresaId: empresaId,
    email: "sucursal@example.com"
  });

  const sucursal2 = await Sucursal.create({
    descripcion: "MARIANO ROQUE ALONSO",
    direccion: "RUTA TRANSCHACO C/ HERNANDARIAS 714",
    cel: "(0981) 277-318",
    telefono: "(021) 588 9000",
    empresaId: empresaId,
    email: "sucursal@example.com"
  });

  const sucursal3 = await Sucursal.create({
    descripcion: "JULIO CORREA",
    direccion: "485 ENTRE TTE CESAR VELAZQUEZ Y DOMINGO PORTILLO",
    cel: "(0986) 133-183",
    telefono: "(021) 588 9000",
    empresaId: empresaId,
    email: "sucursal@example.com"
  });

  const sucursal4 = await Sucursal.create({
    descripcion: "MBURUCUYA",
    direccion: "AVDA. SANTISIMA TRINIDAD E/ DR. RAMON ZUBIZARRETA",
    cel: "(0981) 390-050",
    telefono: "(021) 588 9000",
    empresaId: empresaId,
    email: "sucursal@example.com"
  });

  /******************Numeraciones********************* */
  const numeracion1 = await Numeracion.create({
    empresaId: empresaId,
    sucursalId: sucursal.id,
    inicioTimbrado: "2022-06-17",
    finTimbrado: "9999-12-31",
    itide: facturaId,
    numeroInicio: 1,
    numeroFin: 999999999,
    serie: "001-001",
    timbrado: "12559587",
    ultimoNumero: 2006251,
    tipoComprobante: "TICKET",
    tipoImpresion: "TICKET",
    activo: true
  });

  const numeracion2 = await Numeracion.create({
    empresaId: empresaId,
    sucursalId: sucursal1.id,
    inicioTimbrado: "2022-11-21",
    finTimbrado: "9999-12-31",
    itide: facturaId,
    numeroInicio: 1,
    numeroFin: 999999999,
    serie: "012-001",
    timbrado: "16032661",
    ultimoNumero: 27801,
    tipoComprobante: "TICKET",
    tipoImpresion: "TICKET",
    activo: true
  });

  const numeracion3 = await Numeracion.create({
    empresaId: empresaId,
    sucursalId: sucursal2.id,
    inicioTimbrado: "2022-11-21",
    finTimbrado: "9999-12-31",
    itide: facturaId,
    numeroInicio: 1,
    numeroFin: 999999999,
    serie: "013-001",
    timbrado: "16032661",
    ultimoNumero: 0,
    tipoComprobante: "TICKET",
    tipoImpresion: "TICKET",
    activo: true
  });
  const numeracion4 = await Numeracion.create({
    empresaId: empresaId,
    sucursalId: sucursal3.id,
    inicioTimbrado: "2022-11-21",
    finTimbrado: "9999-12-31",
    itide: facturaId,
    numeroInicio: 1,
    numeroFin: 999999999,
    serie: "014-001",
    timbrado: "16032661",
    ultimoNumero: 0,
    tipoComprobante: "TICKET",
    tipoImpresion: "TICKET",
    activo: true
  });
  const numeracion5 = await Numeracion.create({
    empresaId: empresaId,
    sucursalId: sucursal4.id,
    inicioTimbrado: "2022-11-21",
    finTimbrado: "9999-12-31",
    itide: facturaId,
    numeroInicio: 1,
    numeroFin: 999999999,
    serie: "015-001",
    timbrado: "16032661",
    ultimoNumero: 0,
    tipoComprobante: "TICKET",
    tipoImpresion: "TICKET",
    activo: true
  });
  const numeracion6 = await Numeracion.create({
    empresaId: empresaId,
    sucursalId: sucursal.id,
    inicioTimbrado: "2022-11-21",
    finTimbrado: "9999-12-31",
    itide: facturaId,
    numeroInicio: 1,
    numeroFin: 999999999,
    serie: "011-002",
    timbrado: "16032661",
    ultimoNumero: 0,
    tipoComprobante: "TICKET",
    tipoImpresion: "TICKET",
    activo: true
  });

  const numeracion7 = await Numeracion.create({
    empresaId: empresaId,
    sucursalId: sucursal1.id,
    inicioTimbrado: "2022-11-21",
    finTimbrado: "9999-12-31",
    itide: facturaId,
    numeroInicio: 1,
    numeroFin: 999999999,
    serie: "012-002",
    timbrado: "16032661",
    ultimoNumero: 0,
    tipoComprobante: "TICKET",
    tipoImpresion: "TICKET",
    activo: true
  });

  const numeracion8 = await Numeracion.create({
    empresaId: empresaId,
    sucursalId: sucursal2.id,
    inicioTimbrado: "2022-11-21",
    finTimbrado: "9999-12-31",
    itide: facturaId,
    numeroInicio: 1,
    numeroFin: 999999999,
    serie: "013-002",
    timbrado: "16032661",
    ultimoNumero: 0,
    tipoComprobante: "TICKET",
    tipoImpresion: "TICKET",
    activo: true
  });
  const numeracion9 = await Numeracion.create({
    empresaId: empresaId,
    sucursalId: sucursal.id,
    inicioTimbrado: "2022-06-17",
    finTimbrado: "9999-12-31",
    itide: notaCreditoId,
    numeroInicio: 1,
    numeroFin: 999999999,
    serie: "001-001",
    timbrado: "12559587",
    ultimoNumero: 611979,
    tipoComprobante: "TICKET",
    tipoImpresion: "TICKET",
    activo: true
  });

  // Crear usuario asociado a la empresa y sucursal
  const salt = Bcryptjs.genSaltSync();
  const userAdmin = await Usuario.create({
    empresaId: empresaId,
    sucursalId: sucursal.id,
    numPrefId: numeracion1.id,
    numNcPrefId: numeracion9.id,
    username: "admin@admin.com",
    usuario: "Miguel Montania",
    password: Bcryptjs.hashSync("123456", salt),
    img: "9634534584326567563.jpg",
    rol: "admin", // Puedes ajustar el rol según tus necesidades
    intentos: 0,
    activo: true,
    bloqueado: false
  });

  const vendedorCapiata = await Usuario.create({
    empresaId: empresaId,
    sucursalId: sucursal.id,
    numPrefId: numeracion1.id,
    username: "vendedor@capiata.com",
    usuario: "Capiata",
    password: Bcryptjs.hashSync("123456", salt),
    img: "9634534584325567563.png",
    rol: "vendedor", // Puedes ajustar el rol según tus necesidades
    intentos: 0,
    activo: true,
    bloqueado: false
  });

  const vendedorLuque = await Usuario.create({
    empresaId: empresaId,
    sucursalId: sucursal1.id,
    numPrefId: numeracion2.id,
    username: "vendedor@luque.com",
    usuario: "Luque",
    password: Bcryptjs.hashSync("123456", salt),
    img: "9634534584325567563.png",
    rol: "vendedor", // Puedes ajustar el rol según tus necesidades
    intentos: 0,
    activo: true,
    bloqueado: false
  });

  const vendedorMra = await Usuario.create({
    empresaId: empresaId,
    sucursalId: sucursal2.id,
    numPrefId: numeracion3.id,
    username: "vendedor@mra.com",
    usuario: "Mariano R. Alonso",
    password: Bcryptjs.hashSync("123456", salt),
    img: "9634534584325567563.png",
    rol: "vendedor", // Puedes ajustar el rol según tus necesidades
    intentos: 0,
    activo: true,
    bloqueado: false
  });
  const vendedorJCorrea = await Usuario.create({
    empresaId: empresaId,
    sucursalId: sucursal3.id,
    numPrefId: numeracion4.id,
    username: "vendedor@jc.com",
    usuario: "Julio Correa",
    password: Bcryptjs.hashSync("123456", salt),
    img: "9634534584325567563.png",
    rol: "vendedor", // Puedes ajustar el rol según tus necesidades
    intentos: 0,
    activo: true,
    bloqueado: false
  });
  const vendedorMburucuya = await Usuario.create({
    empresaId: empresaId,
    sucursalId: sucursal4.id,
    numPrefId: numeracion5.id,
    username: "vendedor@mburucuya.com",
    usuario: "Mburucuya",
    password: Bcryptjs.hashSync("123456", salt),
    img: "9634534584325567563.png",
    rol: "vendedor", // Puedes ajustar el rol según tus necesidades
    intentos: 0,
    activo: true,
    bloqueado: false
  });

  // Inserta las unidades en la base de datos
  const unidadUN = await Unidad.create({
    code: "UN",
    descripcion: "Unidad",
    empresaId: empresaId,
    activo: true
  });
  const unidadCJ = await Unidad.create({
    code: "CJ",
    descripcion: "Caja",
    empresaId: empresaId,
    activo: true
  });
  const unidadDSP = await Unidad.create({
    code: "DSP",
    descripcion: "Display",
    empresaId: empresaId,
    activo: true
  });
  const unidadROL = await Unidad.create({
    code: "ROL",
    descripcion: "Rollo",
    empresaId: empresaId,
    activo: true
  });
  const unidadPCK = await Unidad.create({
    code: "PCK",
    descripcion: "Pack",
    empresaId: empresaId,
    activo: true
  });

  const marca1 = await Marca.create({
    descripcion: "Cavallaro",
    activo: true,
    empresaId: empresaId
  });
  const marca2 = await Marca.create({
    descripcion: "Pixol",
    activo: true,
    empresaId: empresaId
  });
  const marca3 = await Marca.create({
    descripcion: "Agricultor",
    activo: true,
    empresaId: empresaId
  });
  const marca4 = await Marca.create({
    descripcion: "Obrero",
    activo: true,
    empresaId: empresaId
  });
  const marca5 = await Marca.create({
    descripcion: "C Glicerina",
    activo: true,
    empresaId: empresaId
  });
  const marca6 = await Marca.create({
    descripcion: "C2",
    activo: true,
    empresaId: empresaId
  });
  const marca7 = await Marca.create({
    descripcion: "Guairá Extra",
    activo: true,
    empresaId: empresaId
  });
  const marca8 = await Marca.create({
    descripcion: "Guairá Deluxe",
    activo: true,
    empresaId: empresaId
  });
  const marca9 = await Marca.create({
    descripcion: "Coco Cavallaro",
    activo: true,
    empresaId: empresaId
  });
  const marca10 = await Marca.create({
    descripcion: "Insuperable",
    activo: true,
    empresaId: empresaId
  });
  const marca11 = await Marca.create({
    descripcion: "Guairá Opti-System",
    activo: true,
    empresaId: empresaId
  });
  const marca12 = await Marca.create({
    descripcion: "gliCrina",
    activo: true,
    empresaId: empresaId
  });
  const marca13 = await Marca.create({
    descripcion: "Sole Mio",
    activo: true,
    empresaId: empresaId
  });
  const marca14 = await Marca.create({
    descripcion: "Cavallaro Premium",
    activo: true,
    empresaId: empresaId
  });
  const marca15 = await Marca.create({
    descripcion: "Guairá Profesional",
    activo: true,
    empresaId: empresaId
  });
  const marca16 = await Marca.create({
    descripcion: "IO",
    activo: true,
    empresaId: empresaId
  });
  const marca17 = await Marca.create({
    descripcion: "Guairá Opti-Fiber",
    activo: true,
    empresaId: empresaId
  });
  const marca18 = await Marca.create({
    descripcion: "Tropical",
    activo: true,
    empresaId: empresaId
  });
  const marca19 = await Marca.create({
    descripcion: "Mio",
    activo: true,
    empresaId: empresaId
  });
  const marca20 = await Marca.create({
    descripcion: "Guairá Opti-Color",
    activo: true,
    empresaId: empresaId
  });
  const marca = await Marca.create({
    descripcion: "",
    activo: true,
    empresaId: empresaId
  });
 const categoria2 = await Categoria.create({
      descripcion: "Cuidado de las Prendas",
      activo: true,
      empresaId: empresaId
    });
    const categoria3 = await Categoria.create({
      descripcion: "Higiene Personal",
      activo: true,
      empresaId: empresaId
    });
    const categoria1 = await Categoria.create({
      descripcion: "Limpieza y Desinfección del Hogar",
      activo: true,
      empresaId: empresaId
    });

    const subCategoria1 = await SubCategoria.create({
      descripcion: "Bolsas para residuos",
      categoriaId: categoria1.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria2 = await SubCategoria.create({
      descripcion: "Desodorante de ambiente",
      categoriaId: categoria1.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria3 = await SubCategoria.create({
      descripcion: "Detergente lavavajilla",
      categoriaId: categoria1.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria4 = await SubCategoria.create({
      descripcion: "Lavandina",
      categoriaId: categoria1.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria5 = await SubCategoria.create({
      descripcion: "Trapo de piso",
      categoriaId: categoria1.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria6 = await SubCategoria.create({
      descripcion: "Coco Puro",
      categoriaId: categoria2.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria7 = await SubCategoria.create({
      descripcion: "Jabón en pan / Barra para lavar la ropa",
      categoriaId: categoria2.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria8 = await SubCategoria.create({
      descripcion: "Polvo para lavar la ropa",
      categoriaId: categoria2.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria9 = await SubCategoria.create({
      descripcion: "Jabón prensado",
      categoriaId: categoria2.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria10 = await SubCategoria.create({
      descripcion: "Suavizante",
      categoriaId: categoria2.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria11 = await SubCategoria.create({
      descripcion: "Coco multiuso",
      categoriaId: categoria3.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria12 = await SubCategoria.create({
      descripcion: "Jabón de tocador",
      categoriaId: categoria3.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria13 = await SubCategoria.create({
      descripcion: "Jabón hotelero",
      categoriaId: categoria3.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria15 = await SubCategoria.create({
      descripcion: "Coco tocador",
      categoriaId: categoria3.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria16 = await SubCategoria.create({
      descripcion: "Líquido para lavar la ropa",
      categoriaId: categoria2.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria17 = await SubCategoria.create({
      descripcion: "Combos",
      categoriaId: categoria2.id,
      activo: true,
      empresaId: empresaId
    });
    const subCategoria18 = await SubCategoria.create({
      descripcion: "Limpiador",
      categoriaId: categoria1.id,
      activo: true,
      empresaId: empresaId
    });


  const producto1 = await Producto.create({
    nombre: "BOLSA PARA RESIDUOS PIXOL - BAÑO",
    descripcion: "",
    categoriaId: categoria1.id,
    subCategoriaId: subCategoria1.id,
    marcaId: marca2.id,
    activo: false,
    empresaId: empresaId
  });
  const producto2 = await Producto.create({
    nombre: "BOLSA PARA RESIDUOS PIXOL",
    descripcion: "",
    categoriaId: categoria1.id,
    subCategoriaId: subCategoria1.id,
    marcaId: marca2.id,
    activo: true,
    empresaId: empresaId
  });
  const producto3 = await Producto.create({
    nombre: "DESODORANTE DE AMBIENTE CAVALLARO",
    descripcion: "",
    categoriaId: categoria1.id,
    subCategoriaId: subCategoria2.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto4 = await Producto.create({
    nombre: "DETERGENTE LAVAVAJILLAS CAVALLARO",
    descripcion: "",
    categoriaId: categoria1.id,
    subCategoriaId: subCategoria3.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto5 = await Producto.create({
    nombre: "DETERGENTE LAVAVAJILLAS PIXOL FORMULA CONCENTRADA",
    descripcion: "",
    categoriaId: categoria1.id,
    subCategoriaId: subCategoria3.id,
    marcaId: marca2.id,
    activo: true,
    empresaId: empresaId
  });
  const producto6 = await Producto.create({
    nombre: "JABON DE COCO PURO COCO CAVALLARO",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria6.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto7 = await Producto.create({
    nombre: "JABON DE TOCADOR C GLICERINA",
    descripcion: "",
    categoriaId: categoria3.id,
    subCategoriaId: subCategoria12.id,
    marcaId: marca5.id,
    activo: true,
    empresaId: empresaId
  });
  const producto8 = await Producto.create({
    nombre: "JABON DE TOCADOR C2",
    descripcion: "",
    categoriaId: categoria3.id,
    subCategoriaId: subCategoria12.id,
    marcaId: marca6.id,
    activo: true,
    empresaId: empresaId
  });
  const producto9 = await Producto.create({
    nombre: "JABON DE TOCADOR COCO CAVALLARO",
    descripcion: "",
    categoriaId: categoria3.id,
    subCategoriaId: subCategoria15.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto10 = await Producto.create({
    nombre: "JABON DE TOCADOR IO",
    descripcion: "",
    categoriaId: categoria3.id,
    subCategoriaId: subCategoria12.id,
    marcaId: marca16.id,
    activo: true,
    empresaId: empresaId
  });
  const producto11 = await Producto.create({
    nombre: "JABON DE TOCADOR C",
    descripcion: "",
    categoriaId: categoria3.id,
    subCategoriaId: subCategoria13.id,
    marcaId: marca5.id,
    activo: true,
    empresaId: empresaId
  });
  const producto12 = await Producto.create({
    nombre: "JABON DE TOCADOR CAVALLARO",
    descripcion: "",
    categoriaId: categoria3.id,
    subCategoriaId: subCategoria13.id,
    marcaId: marca19.id,
    activo: true,
    empresaId: empresaId
  });
  const producto13 = await Producto.create({
    nombre: "JABON EN POLVO COCO CAVALLARO",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria8.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto14 = await Producto.create({
    nombre: 'JABON LIQUIDO ""MULTIUSO"" COCO CAVALLARO',
    descripcion: "",
    categoriaId: categoria3.id,
    subCategoriaId: subCategoria11.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto15 = await Producto.create({
    nombre: "JABON LIQUIDO PARA LAVAR LA ROPA COCO CAVALLARO",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria6.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto16 = await Producto.create({
    nombre: "JABON PARA LAVAR LA ROPA AGRICULTOR",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria7.id,
    marcaId: marca3.id,
    activo: true,
    empresaId: empresaId
  });
  const producto17 = await Producto.create({
    nombre: "JABON PARA LAVAR LA ROPA GUAIRA DELUXE CON COCO y GLICERINA",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria7.id,
    marcaId: marca8.id,
    activo: true,
    empresaId: empresaId
  });
  const producto18 = await Producto.create({
    nombre: "JABON PARA LAVAR LA ROPA GUAIRA EXTRA",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria7.id,
    marcaId: marca7.id,
    activo: true,
    empresaId: empresaId
  });
  const producto19 = await Producto.create({
    nombre: "JABON PARA LAVAR LA ROPA TROPICAL",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria7.id,
    marcaId: marca18.id,
    activo: true,
    empresaId: empresaId
  });
  const producto20 = await Producto.create({
    nombre: "LAVANDINA CAVALLARO",
    descripcion: "",
    categoriaId: categoria1.id,
    subCategoriaId: subCategoria4.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto21 = await Producto.create({
    nombre: "POLVO PARA LAVAR LA ROPA GUAIRA OPTI SYSTEM",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria8.id,
    marcaId: marca17.id,
    activo: true,
    empresaId: empresaId
  });
  const producto22 = await Producto.create({
    nombre: "POLVO PARA LAVAR LA ROPA GUAIRA DELUXE",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria8.id,
    marcaId: marca8.id,
    activo: true,
    empresaId: empresaId
  });
  const producto23 = await Producto.create({
    nombre: "POLVO PARA LAVAR LA ROPA GUAIRA EXTRA",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria8.id,
    marcaId: marca7.id,
    activo: true,
    empresaId: empresaId
  });
  const producto24 = await Producto.create({
    nombre: "POLVO PARA LAVAR LA ROPA GUAIRA PROFESIONAL",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria8.id,
    marcaId: marca15.id,
    activo: true,
    empresaId: empresaId
  });
  const producto25 = await Producto.create({
    nombre: "POLVO PARA LAVAR LA ROPA INSUPERABLE",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria8.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto26 = await Producto.create({
    nombre: "SUAVIZANTE CAVALLARO EDICION ESPECIAL",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria10.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto27 = await Producto.create({
    nombre: "SUAVIZANTE CAVALLARO PREMIUM",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria10.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto28 = await Producto.create({
    nombre: "TRAPO  DE PISO PIXOL",
    descripcion: "",
    categoriaId: categoria1.id,
    subCategoriaId: subCategoria5.id,
    marcaId: marca2.id,
    activo: true,
    empresaId: empresaId
  });
  const producto29 = await Producto.create({
    nombre: "JABÓN DE TOCADOR PARA HOTEL",
    descripcion: "",
    categoriaId: categoria3.id,
    subCategoriaId: subCategoria13.id,
    marcaId: marca1.id,
    activo: false,
    empresaId: empresaId
  });
  const producto32 = await Producto.create({
    nombre: "POLVO PARA LAVAR LA ROPA GUAIRA OPTI-COLORS",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria8.id,
    marcaId: marca20.id,
    activo: false,
    empresaId: empresaId
  });
  const producto34 = await Producto.create({
    nombre: "JABÓN PARA LAVAR LA ROPA GUAIRA DELUXE CON GLICERINA Y LIMÓN",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria7.id,
    marcaId: marca8.id,
    activo: true,
    empresaId: empresaId
  });
  const producto35 = await Producto.create({
    nombre: "JABÓN PARA LAVAR LA ROPA GUAIRA DELUXE CON AZUL BLANQUEADOR",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria7.id,
    marcaId: marca8.id,
    activo: true,
    empresaId: empresaId
  });
  const producto36 = await Producto.create({
    nombre: "DETERGENTE LAVAVAJILLAS INSUPERABLE",
    descripcion: "",
    categoriaId: categoria1.id,
    subCategoriaId: subCategoria3.id,
    marcaId: marca10.id,
    activo: true,
    empresaId: empresaId
  });
  const producto38 = await Producto.create({
    nombre: "LÍQUIDO PARA LAVAR ROPA INSUPERABLE",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria16.id,
    marcaId: marca10.id,
    activo: true,
    empresaId: empresaId
  });
  const producto39 = await Producto.create({
    nombre: "COMBO AMIG@ NATURALISTA",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria17.id,
    marcaId: marca1.id,
    activo: false,
    empresaId: empresaId
  });
  const producto40 = await Producto.create({
    nombre: "COMBO AMIG@ FAMILIERO",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria17.id,
    marcaId: marca1.id,
    activo: false,
    empresaId: empresaId
  });
  const producto41 = await Producto.create({
    nombre: "COMBO AMIG@ ASADERO",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria17.id,
    marcaId: marca1.id,
    activo: false,
    empresaId: empresaId
  });
  const producto42 = await Producto.create({
    nombre: "COMBO AMIG@ ECONOMICO",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria17.id,
    marcaId: marca1.id,
    activo: false,
    empresaId: empresaId
  });
  const producto44 = await Producto.create({
    nombre: "JABON DE TOCADOR C2 HUMECTANTE ",
    descripcion: "",
    categoriaId: categoria3.id,
    subCategoriaId: subCategoria12.id,
    marcaId: marca6.id,
    activo: true,
    empresaId: empresaId
  });
  const producto45 = await Producto.create({
    nombre: "JABON DE TOCADOR NATURAL COCO CAVALLARO CON ACEITE ESENCIAL",
    descripcion: "",
    categoriaId: categoria3.id,
    subCategoriaId: subCategoria15.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto46 = await Producto.create({
    nombre: "COMBO NAVIDEÑO 1",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria17.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto47 = await Producto.create({
    nombre: "COMBO NAVIDEÑO 2",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria17.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto48 = await Producto.create({
    nombre: "COMBO NAVIDEÑO 3",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria17.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });
  const producto49 = await Producto.create({
    nombre: "LIMPIADOR CONCENTRADO DESINFECTANTE PIXOL",
    descripcion: "",
    categoriaId: categoria1.id,
    subCategoriaId: subCategoria18.id,
    marcaId: marca2.id,
    activo: true,
    empresaId: empresaId
  });
  const producto50 = await Producto.create({
    nombre: "JABON DE TOCADOR C2 HUMECTANTE ",
    descripcion: "",
    categoriaId: categoria3.id,
    subCategoriaId: subCategoria12.id,
    marcaId: marca6.id,
    activo: false,
    empresaId: empresaId
  });
  const producto56 = await Producto.create({
    nombre: "COMBO NAVIDEÑO 4",
    descripcion: "",
    categoriaId: categoria2.id,
    subCategoriaId: subCategoria17.id,
    marcaId: marca1.id,
    activo: true,
    empresaId: empresaId
  });

  const variedad1 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#258f00",
    descripcion: "Azahar"
  });
  const variedad2 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ac23af",
    descripcion: "Lavanda"
  });
  const variedad3 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f7f7f7",
    descripcion: "Uva"
  });
  const variedad4 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f339c2",
    descripcion: "Fantasía"
  });
  const variedad5 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#1385dd",
    descripcion: "Clásico"
  });
  const variedad6 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ffd600",
    descripcion: "Delicado"
  });
  const variedad7 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#92d99a",
    descripcion: "Intenso"
  });
  const variedad8 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#eda28b",
    descripcion: "Essences"
  });
  const variedad9 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#edd040",
    descripcion: "Neutro"
  });
  const variedad10 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#02b3e5",
    descripcion: "Blue"
  });
  const variedad11 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#bae0e1",
    descripcion: "White"
  });
  const variedad12 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#c4e361",
    descripcion: "Green"
  });
  const variedad13 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#e85896",
    descripcion: "Pink"
  });
  const variedad14 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#fa9523",
    descripcion: "Orange"
  });
  const variedad15 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#fed627",
    descripcion: "Yellow"
  });
  const variedad16 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#5e4e97",
    descripcion: "Sensaciones"
  });
  const variedad17 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#999896",
    descripcion: "Urbano Sensual"
  });
  const variedad18 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#295e6e",
    descripcion: "Armonía y Relajación"
  });
  const variedad19 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#cb803d",
    descripcion: "Misterio del Oriente"
  });
  const variedad20 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#cf633c",
    descripcion: "Fruit & Flower"
  });
  const variedad21 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#dfaca9",
    descripcion: "Glamour"
  });
  const variedad22 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#86b490",
    descripcion: "Acción"
  });
  const variedad23 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ec88d2",
    descripcion: "Romance"
  });
  const variedad24 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#eece79",
    descripcion: "Intimo"
  });
  const variedad25 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#63a6af",
    descripcion: "Frescura Marina"
  });
  const variedad26 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#be4a53",
    descripcion: "Rubí"
  });
  const variedad27 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#347a56",
    descripcion: "Esmeralda"
  });
  const variedad28 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#e0b431",
    descripcion: "Ambar"
  });
  const variedad29 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#4284b4",
    descripcion: "Azul Blanqueador"
  });
  const variedad30 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#71c66c",
    descripcion: "Glicerina y Limón"
  });
  const variedad31 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#d5ccbd",
    descripcion: "Coco y Glicerina"
  });
  const variedad32 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#576452",
    descripcion: "Verde"
  });
  const variedad33 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#a58860",
    descripcion: "Marrón"
  });
  const variedad34 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ebe1d5",
    descripcion: "Blanco"
  });
  const variedad35 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#dfbfd4",
    descripcion: "Rosado"
  });
  const variedad36 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#de4c43",
    descripcion: "Normal"
  });
  const variedad37 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#61d62e",
    descripcion: "Limón"
  });
  const variedad38 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f0192e",
    descripcion: "Manzana"
  });
  const variedad39 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#b99869",
    descripcion: "Ropa delicada y Elastizada"
  });
  const variedad40 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#e97e8f",
    descripcion: "Ropa de bebé"
  });
  const variedad42 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f859a0",
    descripcion: "Floral"
  });
  const variedad43 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#c2c39d",
    descripcion: "Almendras"
  });
  const variedad44 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#014498",
    descripcion: "Opti-Fiber"
  });
  const variedad45 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f72626",
    descripcion: "Opti-Colors"
  });
  const variedad46 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ff1572",
    descripcion: "Dulce Sensación"
  });
  const variedad47 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#009719",
    descripcion: "Frescura Intensa"
  });
  const variedad48 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#778fd9",
    descripcion: "Sueve Susuro"
  });
  const variedad49 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ffa500",
    descripcion: "Energía Vital"
  });
  const variedad50 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#00abeb",
    descripcion: "Brisa Fresca"
  });
  const variedad51 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ff4701",
    descripcion: "Tropical"
  });
  const variedad52 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#fdd512",
    descripcion: "Super Resistente"
  });
  const variedad53 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#cc61ba",
    descripcion: "Ropa Color"
  });
  const variedad54 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#37d767",
    descripcion: "Ropa Diaria"
  });
  const variedad55 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f0cb47",
    descripcion: "Natural"
  });
  const variedad56 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#38cb1a",
    descripcion: "Citrus"
  });
  const variedad57 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#bf17ee",
    descripcion: "Oriental"
  });
  const variedad58 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#41e614",
    descripcion: "Tropical NO"
  });
  const variedad59 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#065be5",
    descripcion: "Fresh"
  });
  const variedad60 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f0e919",
    descripcion: "Exótica"
  });
  const variedad61 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#79baec",
    descripcion: "Marina"
  });
  const variedad62 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#e68d28",
    descripcion: "Frutal"
  });
  const variedad63 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ff6d1f",
    descripcion: "Premium"
  });
  const variedad64 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#2bd016",
    descripcion: "Economico"
  });
  const variedad65 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ade6f0",
    descripcion: "Baño"
  });
  const variedad66 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ffc72e",
    descripcion: "Mango & Mburucuya"
  });
  const variedad67 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ff75c6",
    descripcion: "Durazno & Frutos Rojos"
  });
  const variedad68 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#80e62d",
    descripcion: "Manzana verde & Pera"
  });
  const variedad69 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ff80c3",
    descripcion: "Ropa Delicada"
  });
  const variedad70 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#359aff",
    descripcion: "Ropa Blanca"
  });
  const variedad71 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#b6b0a5",
    descripcion: "Clásico Natural"
  });
  const variedad72 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#d1d1d1",
    descripcion: "Natural Fresh"
  });
  const variedad73 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#eae448",
    descripcion: "Surtido"
  });
  const variedad74 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#abf2bd",
    descripcion: "Coco Clásico"
  });
  const variedad75 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ec22db",
    descripcion: "Deluxe"
  });
  const variedad76 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#eb961e",
    descripcion: "Extra"
  });
  const variedad77 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#0e19af",
    descripcion: "Profesional"
  });
  const variedad78 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#e4d211",
    descripcion: "Concentrado"
  });
  const variedad79 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f339c2",
    descripcion: "Antibacterial Fantasía"
  });
  const variedad80 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#52d123",
    descripcion: "Antibacterial Azahar"
  });
  const variedad81 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#cc5cf5",
    descripcion: "Antibacterial Lavanda"
  });
  const variedad82 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#1171ee",
    descripcion: "Antibacterial Marina"
  });
  const variedad83 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#7b21e8",
    descripcion: "Antibacterial Uva"
  });
  const variedad84 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f36ddd",
    descripcion: "Dulce  Pasión"
  });
  const variedad85 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#c336f7",
    descripcion: "Calma Mistica"
  });
  const variedad86 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#79ee2b",
    descripcion: "Equilibrio Natural"
  });
  const variedad87 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#009dff",
    descripcion: "Frescura Infinita"
  });
  const variedad88 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f77a36",
    descripcion: "Mágica Energía"
  });
  const variedad89 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#97d293",
    descripcion: "Armonia Pura"
  });
  const variedad90 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#b3e1f5",
    descripcion: "Leche de Almendras"
  });
  const variedad91 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#eeaad2",
    descripcion: "Vainilla y Frutos Rojos"
  });
  const variedad92 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#8ce8c0",
    descripcion: "Naranja y Jazmín"
  });
  const variedad94 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f05cd7",
    descripcion: "Coco Floral"
  });
  const variedad95 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#09be70",
    descripcion: "Verbena"
  });
  const variedad96 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#b1e246",
    descripcion: "Petit Grain "
  });
  const variedad97 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ffffff",
    descripcion: "PREMIUM"
  });
  const variedad98 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#fcfcfc",
    descripcion: "ECONOMICO"
  });
  const variedad99 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#fafafa",
    descripcion: "COCO PURO"
  });
  const variedad100 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#cd70b8",
    descripcion: "Berries"
  });
  const variedad101 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f86381",
    descripcion: "Bouquet Floral"
  });
  const variedad102 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#6ed8b5",
    descripcion: "Frescura Herbal"
  });
  const variedad103 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#f0f401",
    descripcion: "Citronella"
  });
  const variedad104 = await Variedad.create({
    activo: true,
    empresaId: empresaId,
    color: "#ffffff",
    descripcion: "SURTIDO"
  });

  const presentacion1 = await Presentacion.create({
    descripcion: "Bidón de 4L",
    activo: true,
    size: 4000,
    empresaId: empresaId
  });
  const presentacion2 = await Presentacion.create({
    descripcion: "Bolsa de 80g",
    activo: true,
    size: 80,
    empresaId: empresaId
  });
  const presentacion3 = await Presentacion.create({
    descripcion: "Bolsa de 200g",
    activo: true,
    size: 200,
    empresaId: empresaId
  });
  const presentacion4 = await Presentacion.create({
    descripcion: "Bolsa de 400g",
    activo: true,
    size: 400,
    empresaId: empresaId
  });
  const presentacion5 = await Presentacion.create({
    descripcion: "Bolsa de 600g",
    activo: true,
    size: 600,
    empresaId: empresaId
  });
  const presentacion6 = await Presentacion.create({
    descripcion: "Bolsa de 800g",
    activo: true,
    size: 800,
    empresaId: empresaId
  });
  const presentacion7 = await Presentacion.create({
    descripcion: "Bolsa de 2Kg",
    activo: true,
    size: 2000,
    empresaId: empresaId
  });
  const presentacion8 = await Presentacion.create({
    descripcion: "Bolsa de 3,4Kg",
    activo: true,
    size: 3400,
    empresaId: empresaId
  });
  const presentacion9 = await Presentacion.create({
    descripcion: "Bolsa de 5Kg",
    activo: true,
    size: 5000,
    empresaId: empresaId
  });
  const presentacion10 = await Presentacion.create({
    descripcion: "Bolsa de 10Kg",
    activo: true,
    size: 10000,
    empresaId: empresaId
  });
  const presentacion11 = await Presentacion.create({
    descripcion: "Bolsa de 150g",
    activo: true,
    size: 150,
    empresaId: empresaId
  });
  const presentacion12 = await Presentacion.create({
    descripcion: "Bolsa de 1Kg",
    activo: true,
    size: 1000,
    empresaId: empresaId
  });
  const presentacion13 = await Presentacion.create({
    descripcion: "Bolsa de 3Kg",
    activo: true,
    size: 3000,
    empresaId: empresaId
  });
  const presentacion14 = await Presentacion.create({
    descripcion: "Pan de 60g",
    activo: true,
    size: 60,
    empresaId: empresaId
  });
  const presentacion15 = await Presentacion.create({
    descripcion: "Pan de 100g",
    activo: true,
    size: 100,
    empresaId: empresaId
  });
  const presentacion16 = await Presentacion.create({
    descripcion: "Pan de 200g",
    activo: true,
    size: 200,
    empresaId: empresaId
  });
  const presentacion17 = await Presentacion.create({
    descripcion: "Pack 10 x 40g",
    activo: true,
    size: 400,
    empresaId: empresaId
  });
  const presentacion18 = await Presentacion.create({
    descripcion: "Barra de 500g",
    activo: true,
    size: 500,
    empresaId: empresaId
  });
  const presentacion19 = await Presentacion.create({
    descripcion: "Barra de 1000g",
    activo: true,
    size: 1000,
    empresaId: empresaId
  });
  const presentacion20 = await Presentacion.create({
    descripcion: "Pan de 180g",
    activo: true,
    size: 180,
    empresaId: empresaId
  });
  const presentacion21 = await Presentacion.create({
    descripcion: "Pan de 130g",
    activo: true,
    size: 130,
    empresaId: empresaId
  });
  const presentacion22 = await Presentacion.create({
    descripcion: "Pack de 5 x 180g",
    activo: true,
    size: 900,
    empresaId: empresaId
  });
  const presentacion23 = await Presentacion.create({
    descripcion: "Pan de 250g",
    activo: true,
    size: 25,
    empresaId: empresaId
  });
  const presentacion24 = await Presentacion.create({
    descripcion: "Pan de 230g",
    activo: true,
    size: 230,
    empresaId: empresaId
  });
  const presentacion26 = await Presentacion.create({
    descripcion: "Bidón de 5L",
    activo: true,
    size: 5000,
    empresaId: empresaId
  });
  const presentacion27 = await Presentacion.create({
    descripcion: "Botella 900ml",
    activo: true,
    size: 900,
    empresaId: empresaId
  });
  const presentacion28 = await Presentacion.create({
    descripcion: "Botella Suav. 500ml",
    activo: true,
    size: 500,
    empresaId: empresaId
  });
  const presentacion29 = await Presentacion.create({
    descripcion: "Caja de 20 x 300g",
    activo: true,
    size: 6000,
    empresaId: empresaId
  });
  const presentacion30 = await Presentacion.create({
    descripcion: "Pack de 20 x 180g",
    activo: true,
    size: 3600,
    empresaId: empresaId
  });
  const presentacion31 = await Presentacion.create({
    descripcion: "Bidón de 10L",
    activo: true,
    size: 10000,
    empresaId: empresaId
  });
  const presentacion32 = await Presentacion.create({
    descripcion: "Pack de 15 x 25g",
    activo: true,
    size: 375,
    empresaId: empresaId
  });
  const presentacion33 = await Presentacion.create({
    descripcion: "Doypack 1600ml",
    activo: true,
    size: 1600,
    empresaId: empresaId
  });
  const presentacion34 = await Presentacion.create({
    descripcion: "Doypack 450ml",
    activo: true,
    size: 450,
    empresaId: empresaId
  });
  const presentacion35 = await Presentacion.create({
    descripcion: "Sachet 70ml",
    activo: true,
    size: 70,
    empresaId: empresaId
  });
  const presentacion36 = await Presentacion.create({
    descripcion: "Botella 1.5L",
    activo: true,
    size: 1500,
    empresaId: empresaId
  });
  const presentacion37 = await Presentacion.create({
    descripcion: "Doypack 2L",
    activo: true,
    size: 2000,
    empresaId: empresaId
  });
  const presentacion38 = await Presentacion.create({
    descripcion: "Tripack 3 x 130g",
    activo: true,
    size: 390,
    empresaId: empresaId
  });
  const presentacion39 = await Presentacion.create({
    descripcion: "Caja de 500 x 10g",
    activo: true,
    size: 5000,
    empresaId: empresaId
  });
  const presentacion40 = await Presentacion.create({
    descripcion: "Pastilla 130g",
    activo: true,
    size: 130,
    empresaId: empresaId
  });
  const presentacion41 = await Presentacion.create({
    descripcion: "Pastilla 85g",
    activo: true,
    size: 85,
    empresaId: empresaId
  });
  const presentacion42 = await Presentacion.create({
    descripcion: "Pastilla 25g",
    activo: true,
    size: 25,
    empresaId: empresaId
  });
  const presentacion43 = await Presentacion.create({
    descripcion: "Pastilla 100g",
    activo: true,
    size: 100,
    empresaId: empresaId
  });
  const presentacion44 = await Presentacion.create({
    descripcion: "Pack surtido 20 x 10g",
    activo: true,
    size: 200,
    empresaId: empresaId
  });
  const presentacion45 = await Presentacion.create({
    descripcion: "Pastilla 125g",
    activo: true,
    size: 125,
    empresaId: empresaId
  });
  const presentacion46 = await Presentacion.create({
    descripcion: "Caja de 300 x 20g",
    activo: true,
    size: 6000,
    empresaId: empresaId
  });
  const presentacion47 = await Presentacion.create({
    descripcion: "Tripack 3 x 80g",
    activo: true,
    size: 240,
    empresaId: empresaId
  });
  const presentacion48 = await Presentacion.create({
    descripcion: "1 Unidad",
    activo: true,
    size: 1,
    empresaId: empresaId
  });
  const presentacion49 = await Presentacion.create({
    descripcion: "Rollo x 100 Unidades",
    activo: true,
    size: 100,
    empresaId: empresaId
  });
  const presentacion50 = await Presentacion.create({
    descripcion: "Rollo x 30 Unidades",
    activo: true,
    size: 30,
    empresaId: empresaId
  });
  const presentacion51 = await Presentacion.create({
    descripcion: "Bolsa de 100L",
    activo: true,
    size: 100,
    empresaId: empresaId
  });
  const presentacion52 = await Presentacion.create({
    descripcion: "Bolsa de 150L",
    activo: true,
    size: 150,
    empresaId: empresaId
  });
  const presentacion53 = await Presentacion.create({
    descripcion: "Bolsa de 200L",
    activo: true,
    size: 200,
    empresaId: empresaId
  });
  const presentacion54 = await Presentacion.create({
    descripcion: "Caja 30 x 60g",
    activo: true,
    size: 180,
    empresaId: empresaId
  });
  const presentacion55 = await Presentacion.create({
    descripcion: "Caja de 20 x 200g",
    activo: true,
    size: 4000,
    empresaId: empresaId
  });
  const presentacion56 = await Presentacion.create({
    descripcion: "Doypack 900ml",
    activo: true,
    size: 900,
    empresaId: empresaId
  });
  const presentacion57 = await Presentacion.create({
    descripcion: "Caja de 250 x 25g",
    activo: true,
    size: 625,
    empresaId: empresaId
  });
  const presentacion58 = await Presentacion.create({
    descripcion: "Pack surtido 25 x 10g",
    activo: true,
    size: 25,
    empresaId: empresaId
  });
  const presentacion59 = await Presentacion.create({
    descripcion: "Caja de 20 x 250g",
    activo: true,
    size: 25,
    empresaId: empresaId
  });
  const presentacion60 = await Presentacion.create({
    descripcion: "Caja de 20 x 180g",
    activo: true,
    size: 180,
    empresaId: empresaId
  });
  const presentacion61 = await Presentacion.create({
    descripcion: "Botella 500ml ",
    activo: true,
    size: 500,
    empresaId: empresaId
  });
  const presentacion62 = await Presentacion.create({
    descripcion: "Botella 500ml.",
    activo: true,
    size: 500,
    empresaId: empresaId
  });
  const presentacion63 = await Presentacion.create({
    descripcion: "Bolsa de 400g.",
    activo: true,
    size: 400,
    empresaId: empresaId
  });
  const presentacion64 = await Presentacion.create({
    descripcion: "Estuche de 125g",
    activo: true,
    size: 125,
    empresaId: empresaId
  });
  const presentacion65 = await Presentacion.create({
    descripcion: "Estuche de 100 g",
    activo: true,
    size: 100,
    empresaId: empresaId
  });
  const presentacion66 = await Presentacion.create({
    descripcion: "Sachet 1600ml",
    activo: true,
    size: 1600,
    empresaId: empresaId
  });
  const presentacion67 = await Presentacion.create({
    descripcion: "Doypack 200ml	",
    activo: true,
    size: 200,
    empresaId: empresaId
  });
  const presentacion68 = await Presentacion.create({
    descripcion: "Doypack 400ml	",
    activo: true,
    size: 400,
    empresaId: empresaId
  });
  const presentacion69 = await Presentacion.create({
    descripcion: "Doypack 800ml",
    activo: true,
    size: 800,
    empresaId: empresaId
  });
  const presentacion70 = await Presentacion.create({
    descripcion: "Doypack 500ml	",
    activo: true,
    size: 500,
    empresaId: empresaId
  });
  const presentacion71 = await Presentacion.create({
    descripcion: "KIT",
    activo: true,
    size: 0,
    empresaId: empresaId
  });
  const presentacion72 = await Presentacion.create({
    descripcion: "Caja de 20 x 150g	",
    activo: true,
    size: 150,
    empresaId: empresaId
  });
  const presentacion73 = await Presentacion.create({
    descripcion: "Pastilla 90g",
    activo: true,
    size: 90,
    empresaId: empresaId
  });
  const presentacion74 = await Presentacion.create({
    descripcion: "Pack Promocional 1400ml",
    activo: true,
    size: 1400,
    empresaId: empresaId
  });

  const variante25 = await Variante.create({
    codErp: "300000000",
    porcIva: 10,
    img: "37aec798-59d0-44a3-8981-d9e0b248e502.jpg",
    codBarra: "",
    productoId: producto6.id,
    unidadId: unidadUN.id,
    variedadId: variedad34.id,
    presentacionId: presentacion16.id,
    activo: true,
    empresaId: empresaId
  });
  const variante22 = await Variante.create({
    codErp: "300000002",
    porcIva: 10,
    img: "5569183d-b6f9-4430-b2bb-273c37b2039a.jpg",
    codBarra: "",
    productoId: producto6.id,
    unidadId: unidadUN.id,
    variedadId: variedad34.id,
    presentacionId: presentacion17.id,
    activo: true,
    empresaId: empresaId
  });
  const variante23 = await Variante.create({
    codErp: "300000003",
    porcIva: 10,
    img: "7500633b-8264-4bb3-8a2e-1eb6e36fa894.jpg",
    codBarra: "",
    productoId: producto6.id,
    unidadId: unidadUN.id,
    variedadId: variedad34.id,
    presentacionId: presentacion15.id,
    activo: true,
    empresaId: empresaId
  });
  const variante90 = await Variante.create({
    codErp: "300000007",
    porcIva: 10,
    img: "bc650974-1b03-43f8-9567-1b3b4d41566f.jpg",
    codBarra: "",
    productoId: producto20.id,
    unidadId: unidadUN.id,
    variedadId: variedad78.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante89 = await Variante.create({
    codErp: "300000008",
    porcIva: 10,
    img: "abcfb12c-4def-4436-86d2-c570ffd9af7d.jpg",
    codBarra: "",
    productoId: producto20.id,
    unidadId: unidadUN.id,
    variedadId: variedad78.id,
    presentacionId: presentacion31.id,
    activo: true,
    empresaId: empresaId
  });
  const variante57 = await Variante.create({
    codErp: "300000009",
    porcIva: 10,
    img: "4f00f884-773d-4996-8755-5f64b4c0c351.jpg",
    codBarra: "",
    productoId: producto12.id,
    unidadId: unidadUN.id,
    variedadId: variedad73.id,
    presentacionId: presentacion44.id,
    activo: true,
    empresaId: empresaId
  });
  const variante15 = await Variante.create({
    codErp: "300000015",
    porcIva: 10,
    img: "716da456-ac0d-473f-953e-13bffe6232f7.jpg",
    codBarra: "",
    productoId: producto4.id,
    unidadId: unidadUN.id,
    variedadId: variedad78.id,
    presentacionId: presentacion61.id,
    activo: true,
    empresaId: empresaId
  });
  const variante14 = await Variante.create({
    codErp: "300000016",
    porcIva: 10,
    img: "35e93ce3-e1b7-418b-be8e-5de2f9aac5fe.jpg",
    codBarra: "",
    productoId: producto4.id,
    unidadId: unidadUN.id,
    variedadId: variedad78.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante134 = await Variante.create({
    codErp: "300000023",
    porcIva: 10,
    img: "c9dd0b72-b512-40c4-a744-8dc457d5addb.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion36.id,
    activo: true,
    empresaId: empresaId
  });
  const variante136 = await Variante.create({
    codErp: "300000029",
    porcIva: 10,
    img: "0d01b390-fe60-442e-95d0-2be1ee8fb349.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion1.id,
    activo: true,
    empresaId: empresaId
  });
  const variante138 = await Variante.create({
    codErp: "300000030",
    porcIva: 10,
    img: "1d883b26-8e95-45b2-988c-cde9c23f1223.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion28.id,
    activo: true,
    empresaId: empresaId
  });
  const variante146 = await Variante.create({
    codErp: "300000031",
    porcIva: 10,
    img: "bd77bf07-e1b4-4732-8eee-e4b1cf16a0c5.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad6.id,
    presentacionId: presentacion28.id,
    activo: true,
    empresaId: empresaId
  });
  const variante153 = await Variante.create({
    codErp: "300000032",
    porcIva: 10,
    img: "b70768cd-7ebc-4263-ab96-440176f44279.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad7.id,
    presentacionId: presentacion28.id,
    activo: true,
    empresaId: empresaId
  });
  const variante140 = await Variante.create({
    codErp: "300000033",
    porcIva: 10,
    img: "8abdbf4a-f7ef-4374-b77e-ff0b2890a867.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion56.id,
    activo: true,
    empresaId: empresaId
  });
  const variante155 = await Variante.create({
    codErp: "300000034",
    porcIva: 10,
    img: "9ff1a20f-74f6-4d0f-a8ff-01762a751981.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad7.id,
    presentacionId: presentacion56.id,
    activo: true,
    empresaId: empresaId
  });
  const variante142 = await Variante.create({
    codErp: "300000036",
    porcIva: 10,
    img: "c8b63750-ca64-482b-9434-763938617ae5.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad6.id,
    presentacionId: presentacion36.id,
    activo: true,
    empresaId: empresaId
  });
  const variante149 = await Variante.create({
    codErp: "300000037",
    porcIva: 10,
    img: "04f40722-d0c5-4851-83ff-6eeb31c602f6.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad7.id,
    presentacionId: presentacion36.id,
    activo: true,
    empresaId: empresaId
  });
  const variante135 = await Variante.create({
    codErp: "300000038",
    porcIva: 10,
    img: "bd8207d2-85a8-4b4d-a9bc-9fb8a6123786.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion37.id,
    activo: true,
    empresaId: empresaId
  });
  const variante150 = await Variante.create({
    codErp: "300000039",
    porcIva: 10,
    img: "c0175cff-98d6-4bc0-bbf7-48fbbb95f42d.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad7.id,
    presentacionId: presentacion37.id,
    activo: true,
    empresaId: empresaId
  });
  const variante145 = await Variante.create({
    codErp: "300000040",
    porcIva: 10,
    img: "df50ec08-0cb8-4916-a53c-52d3a95574e3.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad6.id,
    presentacionId: presentacion34.id,
    activo: true,
    empresaId: empresaId
  });
  const variante152 = await Variante.create({
    codErp: "300000041",
    porcIva: 10,
    img: "0555a019-ed4d-48cb-861d-6890435bbfd2.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad7.id,
    presentacionId: presentacion34.id,
    activo: true,
    empresaId: empresaId
  });
  const variante144 = await Variante.create({
    codErp: "300000042",
    porcIva: 10,
    img: "f7495d26-1597-4e88-b0d5-15e979b6a57c.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad6.id,
    presentacionId: presentacion1.id,
    activo: true,
    empresaId: empresaId
  });
  const variante151 = await Variante.create({
    codErp: "300000043",
    porcIva: 10,
    img: "51a3030b-c9aa-4a6c-9468-5cbb92b83aa6.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad7.id,
    presentacionId: presentacion1.id,
    activo: true,
    empresaId: empresaId
  });
  const variante139 = await Variante.create({
    codErp: "300000046",
    porcIva: 10,
    img: "2ca6f955-2a56-4cd4-8168-70af0e8e1b27.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadDSP.id,
    variedadId: variedad5.id,
    presentacionId: presentacion35.id,
    activo: true,
    empresaId: empresaId
  });
  const variante154 = await Variante.create({
    codErp: "300000047",
    porcIva: 10,
    img: "1ef1e8d0-45ba-4847-845f-0f9741a91e24.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadDSP.id,
    variedadId: variedad7.id,
    presentacionId: presentacion35.id,
    activo: true,
    empresaId: empresaId
  });
  const variante137 = await Variante.create({
    codErp: "300000048",
    porcIva: 10,
    img: "659f48b8-5199-4fc3-9ca7-6cbd44b9ce36.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion34.id,
    activo: true,
    empresaId: empresaId
  });
  const variante27 = await Variante.create({
    codErp: "300000050",
    porcIva: 10,
    img: "a6238703-0463-443a-889e-371b39543a87.jpg",
    codBarra: "",
    productoId: producto6.id,
    unidadId: unidadUN.id,
    variedadId: variedad34.id,
    presentacionId: presentacion18.id,
    activo: true,
    empresaId: empresaId
  });
  const variante24 = await Variante.create({
    codErp: "300000052",
    porcIva: 10,
    img: "07eea7b4-38cd-4d36-ab67-039a1e5c4c9c.jpg",
    codBarra: "",
    productoId: producto6.id,
    unidadId: unidadUN.id,
    variedadId: variedad34.id,
    presentacionId: presentacion19.id,
    activo: true,
    empresaId: empresaId
  });
  const variante50 = await Variante.create({
    codErp: "300000055",
    porcIva: 10,
    img: "150c0c8d-fe0b-4957-9b61-ea4ad9858679.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadCJ.id,
    variedadId: variedad42.id,
    presentacionId: presentacion57.id,
    activo: true,
    empresaId: empresaId
  });
  const variante46 = await Variante.create({
    codErp: "300000056",
    porcIva: 10,
    img: "92145545-b940-4e3a-8938-b7ffa4c04e90.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadCJ.id,
    variedadId: variedad43.id,
    presentacionId: presentacion57.id,
    activo: true,
    empresaId: empresaId
  });
  const variante48 = await Variante.create({
    codErp: "300000057",
    porcIva: 10,
    img: "f7677d0a-1003-4bbe-8299-05702fd6d23d.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadCJ.id,
    variedadId: variedad71.id,
    presentacionId: presentacion57.id,
    activo: true,
    empresaId: empresaId
  });
  const variante49 = await Variante.create({
    codErp: "300000065",
    porcIva: 10,
    img: "bf941652-dfa4-4a1e-b3d7-f1bd21366a68.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadUN.id,
    variedadId: variedad42.id,
    presentacionId: presentacion43.id,
    activo: true,
    empresaId: empresaId
  });
  const variante65 = await Variante.create({
    codErp: "300000074",
    porcIva: 10,
    img: "0f9b002d-d9db-48ec-9889-5ab5727f411d.jpg",
    codBarra: "",
    productoId: producto13.id,
    unidadId: unidadUN.id,
    variedadId: variedad39.id,
    presentacionId: presentacion2.id,
    activo: true,
    empresaId: empresaId
  });
  const variante63 = await Variante.create({
    codErp: "300000075",
    porcIva: 10,
    img: "a68ac70e-304a-404d-aeca-88d9f75c770b.jpg",
    codBarra: "",
    productoId: producto13.id,
    unidadId: unidadUN.id,
    variedadId: variedad39.id,
    presentacionId: presentacion3.id,
    activo: true,
    empresaId: empresaId
  });
  const variante61 = await Variante.create({
    codErp: "300000078",
    porcIva: 10,
    img: "51c472ec-f63b-4ebf-8fb7-c916321ab366.jpg",
    codBarra: "",
    productoId: producto13.id,
    unidadId: unidadUN.id,
    variedadId: variedad40.id,
    presentacionId: presentacion2.id,
    activo: true,
    empresaId: empresaId
  });
  const variante59 = await Variante.create({
    codErp: "300000079",
    porcIva: 10,
    img: "1802ee86-0a25-4d97-86b4-f9f7b244cbc1.jpg",
    codBarra: "",
    productoId: producto13.id,
    unidadId: unidadUN.id,
    variedadId: variedad40.id,
    presentacionId: presentacion3.id,
    activo: true,
    empresaId: empresaId
  });
  const variante60 = await Variante.create({
    codErp: "300000080",
    porcIva: 10,
    img: "5eb61175-bc24-4641-a01d-674cced98449.jpg",
    codBarra: "",
    productoId: producto13.id,
    unidadId: unidadUN.id,
    variedadId: variedad40.id,
    presentacionId: presentacion63.id,
    activo: true,
    empresaId: empresaId
  });
  const variante62 = await Variante.create({
    codErp: "300000081",
    porcIva: 10,
    img: "2a5320ba-c72a-45c6-941a-40eb58ffb801.jpg",
    codBarra: "",
    productoId: producto13.id,
    unidadId: unidadUN.id,
    variedadId: variedad40.id,
    presentacionId: presentacion6.id,
    activo: true,
    empresaId: empresaId
  });
  const variante64 = await Variante.create({
    codErp: "300000086",
    porcIva: 10,
    img: "a734f0fd-11c3-477f-9bf8-8c1d9acd758e.jpg",
    codBarra: "",
    productoId: producto13.id,
    unidadId: unidadUN.id,
    variedadId: variedad39.id,
    presentacionId: presentacion63.id,
    activo: true,
    empresaId: empresaId
  });
  const variante66 = await Variante.create({
    codErp: "300000087",
    porcIva: 10,
    img: "2f7ea225-46b5-4ddd-a799-9288a9718642.jpg",
    codBarra: "",
    productoId: producto13.id,
    unidadId: unidadUN.id,
    variedadId: variedad39.id,
    presentacionId: presentacion6.id,
    activo: true,
    empresaId: empresaId
  });
  const variante79 = await Variante.create({
    codErp: "300000090",
    porcIva: 10,
    img: "7f75c60d-3bcf-44b6-9078-77682d7531f6.jpg",
    codBarra: "",
    productoId: producto18.id,
    unidadId: unidadUN.id,
    variedadId: variedad33.id,
    presentacionId: presentacion21.id,
    activo: true,
    empresaId: empresaId
  });
  const variante82 = await Variante.create({
    codErp: "300000091",
    porcIva: 10,
    img: "f0b1a16c-5e44-4e55-b24e-3187ba27894c.jpg",
    codBarra: "",
    productoId: producto18.id,
    unidadId: unidadUN.id,
    variedadId: variedad32.id,
    presentacionId: presentacion21.id,
    activo: true,
    empresaId: empresaId
  });
  const variante75 = await Variante.create({
    codErp: "300000092",
    porcIva: 10,
    img: "0ca2e5c3-ae64-491c-9f6c-443927bba303.jpg",
    codBarra: "",
    productoId: producto17.id,
    unidadId: unidadUN.id,
    variedadId: variedad31.id,
    presentacionId: presentacion21.id,
    activo: true,
    empresaId: empresaId
  });
  const variante77 = await Variante.create({
    codErp: "300000095",
    porcIva: 10,
    img: "e04158b7-35b1-4dc6-a320-f6a8ecba89a0.jpg",
    codBarra: "",
    productoId: producto17.id,
    unidadId: unidadUN.id,
    variedadId: variedad31.id,
    presentacionId: presentacion22.id,
    activo: true,
    empresaId: empresaId
  });
  const variante76 = await Variante.create({
    codErp: "300000096",
    porcIva: 10,
    img: "04de7e4b-0fe3-4df7-85db-54e6aa11cc9a.jpg",
    codBarra: "",
    productoId: producto17.id,
    unidadId: unidadUN.id,
    variedadId: variedad31.id,
    presentacionId: presentacion16.id,
    activo: true,
    empresaId: empresaId
  });
  const variante173 = await Variante.create({
    codErp: "300000097",
    porcIva: 10,
    img: "2a518bb5-900b-40f6-b815-aa3a476943f1.jpg",
    codBarra: "",
    productoId: producto35.id,
    unidadId: unidadUN.id,
    variedadId: variedad29.id,
    presentacionId: presentacion24.id,
    activo: true,
    empresaId: empresaId
  });
  const variante172 = await Variante.create({
    codErp: "300000098",
    porcIva: 10,
    img: "72532c25-7913-44d4-8d8d-b33df9e9b81e.jpg",
    codBarra: "",
    productoId: producto34.id,
    unidadId: unidadUN.id,
    variedadId: variedad30.id,
    presentacionId: presentacion23.id,
    activo: true,
    empresaId: empresaId
  });
  const variante17 = await Variante.create({
    codErp: "300000100",
    porcIva: 10,
    img: "bf901f25-65ce-49f5-b8ee-3a2ee5b78cf2.jpg",
    codBarra: "",
    productoId: producto5.id,
    unidadId: unidadUN.id,
    variedadId: variedad37.id,
    presentacionId: presentacion62.id,
    activo: true,
    empresaId: empresaId
  });
  const variante21 = await Variante.create({
    codErp: "300000101",
    porcIva: 10,
    img: "6148bf55-18c3-4292-98d7-441f94a37add.jpg",
    codBarra: "",
    productoId: producto5.id,
    unidadId: unidadUN.id,
    variedadId: variedad9.id,
    presentacionId: presentacion62.id,
    activo: true,
    empresaId: empresaId
  });
  const variante19 = await Variante.create({
    codErp: "300000102",
    porcIva: 10,
    img: "d16c4566-2d59-429c-90ea-8ba9409b949e.jpg",
    codBarra: "",
    productoId: producto5.id,
    unidadId: unidadUN.id,
    variedadId: variedad38.id,
    presentacionId: presentacion62.id,
    activo: true,
    empresaId: empresaId
  });
  const variante16 = await Variante.create({
    codErp: "300000103",
    porcIva: 10,
    img: "6fb78dd6-f671-497d-a6b8-97843c3fb397.jpg",
    codBarra: "",
    productoId: producto5.id,
    unidadId: unidadUN.id,
    variedadId: variedad37.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante18 = await Variante.create({
    codErp: "300000104",
    porcIva: 10,
    img: "6ab9e180-5307-4428-90bd-ea1f4a0f0743.jpg",
    codBarra: "",
    productoId: producto5.id,
    unidadId: unidadUN.id,
    variedadId: variedad38.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante20 = await Variante.create({
    codErp: "300000105",
    porcIva: 10,
    img: "d80a929d-c617-427f-92b7-b16b09efd244.jpg",
    codBarra: "",
    productoId: producto5.id,
    unidadId: unidadUN.id,
    variedadId: variedad9.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante158 = await Variante.create({
    codErp: "300000110",
    porcIva: 10,
    img: "6dff5b8c-ddcb-4745-be73-2cda0ecb5fb1.jpg",
    codBarra: "",
    productoId: producto29.id,
    unidadId: unidadCJ.id,
    variedadId: variedad1.id,
    presentacionId: presentacion1.id,
    activo: true,
    empresaId: empresaId
  });
  const variante32 = await Variante.create({
    codErp: "300000113",
    porcIva: 10,
    img: "dcbf95c8-b0d8-4402-aec2-1ed79a07ba0b.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion40.id,
    activo: true,
    empresaId: empresaId
  });
  const variante38 = await Variante.create({
    codErp: "300000114",
    porcIva: 10,
    img: "dcf4cd93-1afd-4aa2-ae9a-c7e3b9a6bed0.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad59.id,
    presentacionId: presentacion40.id,
    activo: true,
    empresaId: empresaId
  });
  const variante42 = await Variante.create({
    codErp: "300000115",
    porcIva: 10,
    img: "a9531521-59be-4ad8-bad5-1a562b472ee8.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad23.id,
    presentacionId: presentacion40.id,
    activo: true,
    empresaId: empresaId
  });
  const variante35 = await Variante.create({
    codErp: "300000116",
    porcIva: 10,
    img: "d6755142-dc2e-4a09-bf50-16efd7949370.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad71.id,
    presentacionId: presentacion40.id,
    activo: true,
    empresaId: empresaId
  });
  const variante33 = await Variante.create({
    codErp: "300000125",
    porcIva: 10,
    img: "e0ca3387-e03d-41f9-9efd-6f5b39df33ec.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion41.id,
    activo: true,
    empresaId: empresaId
  });
  const variante43 = await Variante.create({
    codErp: "300000126",
    porcIva: 10,
    img: "a960b5aa-0747-4b3a-aa76-d4149c339403.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad23.id,
    presentacionId: presentacion41.id,
    activo: true,
    empresaId: empresaId
  });
  const variante39 = await Variante.create({
    codErp: "300000127",
    porcIva: 10,
    img: "31d172e3-9402-46bf-ab66-ec40c8402263.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad59.id,
    presentacionId: presentacion41.id,
    activo: true,
    empresaId: empresaId
  });
  const variante41 = await Variante.create({
    codErp: "300000128",
    porcIva: 10,
    img: "5ac9ec54-0c9d-439c-b597-74503747d89b.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad62.id,
    presentacionId: presentacion41.id,
    activo: true,
    empresaId: empresaId
  });
  const variante36 = await Variante.create({
    codErp: "300000134",
    porcIva: 10,
    img: "82a05377-f9fb-476c-bd4b-a5a14c9efd7c.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad71.id,
    presentacionId: presentacion41.id,
    activo: true,
    empresaId: empresaId
  });
  const variante31 = await Variante.create({
    codErp: "300000135",
    porcIva: 10,
    img: "6d0bd5bb-e637-40b4-a1e2-00e868846fb8.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad60.id,
    presentacionId: presentacion41.id,
    activo: true,
    empresaId: empresaId
  });
  const variante53 = await Variante.create({
    codErp: "300000136",
    porcIva: 10,
    img: "cd3d816d-59e5-43d6-bf3d-c3b63e7d65e8.jpg",
    codBarra: "",
    productoId: producto10.id,
    unidadId: unidadUN.id,
    variedadId: variedad67.id,
    presentacionId: presentacion47.id,
    activo: true,
    empresaId: empresaId
  });
  const variante54 = await Variante.create({
    codErp: "300000137",
    porcIva: 10,
    img: "1b26aa22-26f1-4d69-99de-2b1cbd5ab3f4.jpg",
    codBarra: "",
    productoId: producto10.id,
    unidadId: unidadUN.id,
    variedadId: variedad66.id,
    presentacionId: presentacion47.id,
    activo: true,
    empresaId: empresaId
  });
  const variante55 = await Variante.create({
    codErp: "300000138",
    porcIva: 10,
    img: "1af9f7a5-5887-4700-83c0-4aa1fd3bf4d6.jpg",
    codBarra: "",
    productoId: producto10.id,
    unidadId: unidadUN.id,
    variedadId: variedad68.id,
    presentacionId: presentacion47.id,
    activo: true,
    empresaId: empresaId
  });
  const variante56 = await Variante.create({
    codErp: "300000153",
    porcIva: 10,
    img: "6d074da7-bd44-4c7d-bd31-ef72e905b096.jpg",
    codBarra: "",
    productoId: producto11.id,
    unidadId: unidadCJ.id,
    variedadId: variedad72.id,
    presentacionId: presentacion46.id,
    activo: true,
    empresaId: empresaId
  });
  const variante70 = await Variante.create({
    codErp: "300000224",
    porcIva: 10,
    img: "ee36a940-6ccd-4903-a2d4-e8abd0862529.jpg",
    codBarra: "",
    productoId: producto16.id,
    unidadId: unidadCJ.id,
    variedadId: variedad33.id,
    presentacionId: presentacion60.id,
    activo: true,
    empresaId: empresaId
  });
  const variante72 = await Variante.create({
    codErp: "300000225",
    porcIva: 10,
    img: "eb133809-4d7d-49ea-9304-e6fe0128fa45.jpg",
    codBarra: "",
    productoId: producto16.id,
    unidadId: unidadCJ.id,
    variedadId: variedad32.id,
    presentacionId: presentacion60.id,
    activo: true,
    empresaId: empresaId
  });
  const variante119 = await Variante.create({
    codErp: "300000229",
    porcIva: 10,
    img: "3463a9a4-c9ed-49f6-9849-43abdde2b487.jpg",
    codBarra: "",
    productoId: producto25.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion10.id,
    activo: true,
    empresaId: empresaId
  });
  const variante113 = await Variante.create({
    codErp: "300000230",
    porcIva: 10,
    img: "bac09ddc-04ce-4f6e-95f2-0e70f111c7bd.jpg",
    codBarra: "",
    productoId: producto25.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion12.id,
    activo: true,
    empresaId: empresaId
  });
  const variante114 = await Variante.create({
    codErp: "300000231",
    porcIva: 10,
    img: "de465085-f106-48c0-abfa-4878e7c30c8a.jpg",
    codBarra: "",
    productoId: producto25.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion10.id,
    activo: true,
    empresaId: empresaId
  });
  const variante112 = await Variante.create({
    codErp: "300000232",
    porcIva: 10,
    img: "e414c018-7ec4-42a2-8295-4075b7bf64ca.jpg",
    codBarra: "",
    productoId: producto25.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion4.id,
    activo: true,
    empresaId: empresaId
  });
  const variante115 = await Variante.create({
    codErp: "300000233",
    porcIva: 10,
    img: "012fda5e-5e76-4e43-a2d9-793ed8f1aa4d.jpg",
    codBarra: "",
    productoId: producto25.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion11.id,
    activo: true,
    empresaId: empresaId
  });
  const variante117 = await Variante.create({
    codErp: "300000234",
    porcIva: 10,
    img: "2ad2bbb5-a714-41b8-ad3f-a1bed4c4fd5d.jpg",
    codBarra: "",
    productoId: producto25.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion4.id,
    activo: true,
    empresaId: empresaId
  });
  const variante116 = await Variante.create({
    codErp: "300000235",
    porcIva: 10,
    img: "890e2750-ac9a-411f-b31e-a6a0e0a23e24.jpg",
    codBarra: "",
    productoId: producto25.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion13.id,
    activo: true,
    empresaId: empresaId
  });
  const variante118 = await Variante.create({
    codErp: "300000236",
    porcIva: 10,
    img: "34d2f6b4-527c-49e5-abdf-345c945d90ea.jpg",
    codBarra: "",
    productoId: producto25.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion12.id,
    activo: true,
    empresaId: empresaId
  });
  const variante111 = await Variante.create({
    codErp: "300000237",
    porcIva: 10,
    img: "7c8e0cf5-813c-4905-aaf5-30f05b70d7e0.jpg",
    codBarra: "",
    productoId: producto25.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion13.id,
    activo: true,
    empresaId: empresaId
  });
  const variante120 = await Variante.create({
    codErp: "300000238",
    porcIva: 10,
    img: "841ea444-0ac3-4b6f-8eaf-d93a72144582.jpg",
    codBarra: "",
    productoId: producto25.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion11.id,
    activo: true,
    empresaId: empresaId
  });
  const variante104 = await Variante.create({
    codErp: "300000243",
    porcIva: 10,
    img: "22b3f640-a65c-41df-86ff-fdd564792da4.jpg",
    codBarra: "",
    productoId: producto23.id,
    unidadId: unidadUN.id,
    variedadId: variedad76.id,
    presentacionId: presentacion10.id,
    activo: true,
    empresaId: empresaId
  });
  const variante98 = await Variante.create({
    codErp: "300000250",
    porcIva: 10,
    img: "8a698107-ef61-4775-a21a-7bb8de9aac0f.jpg",
    codBarra: "",
    productoId: producto21.id,
    unidadId: unidadUN.id,
    variedadId: variedad44.id,
    presentacionId: presentacion2.id,
    activo: true,
    empresaId: empresaId
  });
  const variante96 = await Variante.create({
    codErp: "300000251",
    porcIva: 10,
    img: "60f9622a-45b8-4c6d-a882-7f5df8b37614.jpg",
    codBarra: "",
    productoId: producto21.id,
    unidadId: unidadUN.id,
    variedadId: variedad44.id,
    presentacionId: presentacion3.id,
    activo: true,
    empresaId: empresaId
  });
  const variante97 = await Variante.create({
    codErp: "300000252",
    porcIva: 10,
    img: "088bff56-ce65-43e4-b9f3-7e8b68d30206.jpg",
    codBarra: "",
    productoId: producto21.id,
    unidadId: unidadUN.id,
    variedadId: variedad44.id,
    presentacionId: presentacion4.id,
    activo: true,
    empresaId: empresaId
  });
  const variante99 = await Variante.create({
    codErp: "300000253",
    porcIva: 10,
    img: "b01ad233-4f23-4a19-b497-dbc84fc5f61a.jpg",
    codBarra: "",
    productoId: producto21.id,
    unidadId: unidadUN.id,
    variedadId: variedad44.id,
    presentacionId: presentacion6.id,
    activo: true,
    empresaId: empresaId
  });
  const variante183 = await Variante.create({
    codErp: "300000255",
    porcIva: 10,
    img: "6f65155c-eb1a-4fe8-b48a-a218278cbe72.jpg",
    codBarra: "",
    productoId: producto21.id,
    unidadId: unidadUN.id,
    variedadId: variedad45.id,
    presentacionId: presentacion3.id,
    activo: true,
    empresaId: empresaId
  });
  const variante184 = await Variante.create({
    codErp: "300000256",
    porcIva: 10,
    img: "bf9bbaf2-384c-41ff-90b4-6891adadeb54.jpg",
    codBarra: "",
    productoId: producto21.id,
    unidadId: unidadUN.id,
    variedadId: variedad45.id,
    presentacionId: presentacion4.id,
    activo: true,
    empresaId: empresaId
  });
  const variante185 = await Variante.create({
    codErp: "300000257",
    porcIva: 10,
    img: "2599a722-092a-4f84-abab-7980e220c460.jpg",
    codBarra: "",
    productoId: producto21.id,
    unidadId: unidadUN.id,
    variedadId: variedad45.id,
    presentacionId: presentacion6.id,
    activo: true,
    empresaId: empresaId
  });
  const variante125 = await Variante.create({
    codErp: "300000270",
    porcIva: 10,
    img: "1f84a68a-cd89-4b5e-ad92-8007e9061e39.jpg",
    codBarra: "",
    productoId: producto26.id,
    unidadId: unidadDSP.id,
    variedadId: variedad42.id,
    presentacionId: presentacion35.id,
    activo: true,
    empresaId: empresaId
  });
  const variante132 = await Variante.create({
    codErp: "300000271",
    porcIva: 10,
    img: "48ae4a58-abcc-489e-8a93-7f917bc5079a.jpg",
    codBarra: "",
    productoId: producto26.id,
    unidadId: unidadDSP.id,
    variedadId: variedad51.id,
    presentacionId: presentacion35.id,
    activo: true,
    empresaId: empresaId
  });
  const variante128 = await Variante.create({
    codErp: "300000272",
    porcIva: 10,
    img: "8acf04a1-ea9a-4bf2-8233-317284a5c795.jpg",
    codBarra: "",
    productoId: producto26.id,
    unidadId: unidadDSP.id,
    variedadId: variedad57.id,
    presentacionId: presentacion35.id,
    activo: true,
    empresaId: empresaId
  });
  const variante124 = await Variante.create({
    codErp: "300000273",
    porcIva: 10,
    img: "4155d293-8fb7-40b8-aa59-560144dce145.jpg",
    codBarra: "",
    productoId: producto26.id,
    unidadId: unidadUN.id,
    variedadId: variedad42.id,
    presentacionId: presentacion34.id,
    activo: true,
    empresaId: empresaId
  });
  const variante131 = await Variante.create({
    codErp: "300000274",
    porcIva: 10,
    img: "9fa9cdc2-de37-451c-9471-9dd11e4e2a3e.jpg",
    codBarra: "",
    productoId: producto26.id,
    unidadId: unidadUN.id,
    variedadId: variedad51.id,
    presentacionId: presentacion34.id,
    activo: true,
    empresaId: empresaId
  });
  const variante127 = await Variante.create({
    codErp: "300000275",
    porcIva: 10,
    img: "54035971-1a9f-4054-a868-12d2754f3d68.jpg",
    codBarra: "",
    productoId: producto26.id,
    unidadId: unidadUN.id,
    variedadId: variedad57.id,
    presentacionId: presentacion34.id,
    activo: true,
    empresaId: empresaId
  });
  const variante108 = await Variante.create({
    codErp: "300000276",
    porcIva: 10,
    img: "96f56ff7-0a5d-4dab-aab0-4f9bca18c19a.jpg",
    codBarra: "",
    productoId: producto24.id,
    unidadId: unidadUN.id,
    variedadId: variedad77.id,
    presentacionId: presentacion7.id,
    activo: true,
    empresaId: empresaId
  });
  const variante109 = await Variante.create({
    codErp: "300000277",
    porcIva: 10,
    img: "951a453d-9a5a-4da3-8eb3-76c2c11be125.jpg",
    codBarra: "",
    productoId: producto24.id,
    unidadId: unidadUN.id,
    variedadId: variedad77.id,
    presentacionId: presentacion9.id,
    activo: true,
    empresaId: empresaId
  });
  const variante37 = await Variante.create({
    codErp: "300000332",
    porcIva: 10,
    img: "9f1e623e-aab4-4d71-95ce-416d853a3fd3.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad71.id,
    presentacionId: presentacion38.id,
    activo: true,
    empresaId: empresaId
  });
  const variante34 = await Variante.create({
    codErp: "300000333",
    porcIva: 10,
    img: "db0c0530-45ea-4269-bc76-600a392b72fd.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion38.id,
    activo: true,
    empresaId: empresaId
  });
  const variante40 = await Variante.create({
    codErp: "300000334",
    porcIva: 10,
    img: "df35c31e-7b25-4811-b180-d54c5ebe7371.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad59.id,
    presentacionId: presentacion38.id,
    activo: true,
    empresaId: empresaId
  });
  const variante44 = await Variante.create({
    codErp: "300000335",
    porcIva: 10,
    img: "227949b0-7677-49fc-90d7-776862251385.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad23.id,
    presentacionId: presentacion38.id,
    activo: true,
    empresaId: empresaId
  });
  const variante85 = await Variante.create({
    codErp: "300000362",
    porcIva: 10,
    img: "fe5e643e-9173-4a2c-9017-b0d9da48749c.jpg",
    codBarra: "",
    productoId: producto19.id,
    unidadId: unidadUN.id,
    variedadId: variedad70.id,
    presentacionId: presentacion20.id,
    activo: true,
    empresaId: empresaId
  });
  const variante87 = await Variante.create({
    codErp: "300000363",
    porcIva: 10,
    img: "5844c8af-fdc3-46c7-a06e-1506e9e9222e.jpg",
    codBarra: "",
    productoId: producto19.id,
    unidadId: unidadUN.id,
    variedadId: variedad69.id,
    presentacionId: presentacion20.id,
    activo: true,
    empresaId: empresaId
  });
  const variante88 = await Variante.create({
    codErp: "300000364",
    porcIva: 10,
    img: "ec33e47e-18e1-4287-a47c-06e8820903a8.jpg",
    codBarra: "",
    productoId: producto19.id,
    unidadId: unidadUN.id,
    variedadId: variedad54.id,
    presentacionId: presentacion20.id,
    activo: true,
    empresaId: empresaId
  });
  const variante86 = await Variante.create({
    codErp: "300000365",
    porcIva: 10,
    img: "c3e0505c-a218-4c10-9768-1b14efc21684.jpg",
    codBarra: "",
    productoId: producto19.id,
    unidadId: unidadUN.id,
    variedadId: variedad53.id,
    presentacionId: presentacion20.id,
    activo: true,
    empresaId: empresaId
  });
  const variante95 = await Variante.create({
    codErp: "300000444",
    porcIva: 10,
    img: "159af30b-2fa3-4540-b2b7-518ae9441958.jpg",
    codBarra: "",
    productoId: producto21.id,
    unidadId: unidadUN.id,
    variedadId: variedad44.id,
    presentacionId: presentacion7.id,
    activo: true,
    empresaId: empresaId
  });
  const variante147 = await Variante.create({
    codErp: "300000448",
    porcIva: 10,
    img: "4b95de2d-e48a-48b8-93a5-720f33d30bdc.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad6.id,
    presentacionId: presentacion56.id,
    activo: true,
    empresaId: empresaId
  });
  const variante122 = await Variante.create({
    codErp: "300000492",
    porcIva: 10,
    img: "a930a188-1e58-47cf-9cc5-2b74c1d2aa8a.jpg",
    codBarra: "",
    productoId: producto26.id,
    unidadId: unidadUN.id,
    variedadId: variedad42.id,
    presentacionId: presentacion33.id,
    activo: true,
    empresaId: empresaId
  });
  const variante129 = await Variante.create({
    codErp: "300000493",
    porcIva: 10,
    img: "4b3f3f26-ab4e-48db-ad91-5fc11a53963c.jpg",
    codBarra: "",
    productoId: producto26.id,
    unidadId: unidadUN.id,
    variedadId: variedad51.id,
    presentacionId: presentacion33.id,
    activo: true,
    empresaId: empresaId
  });
  const variante121 = await Variante.create({
    codErp: "300000494",
    porcIva: 10,
    img: "78204a59-096d-4074-aa97-fa7942492817.jpg",
    codBarra: "",
    productoId: producto26.id,
    unidadId: unidadUN.id,
    variedadId: variedad57.id,
    presentacionId: presentacion33.id,
    activo: true,
    empresaId: empresaId
  });
  const variante123 = await Variante.create({
    codErp: "300000495",
    porcIva: 10,
    img: "3a21c6b6-1893-495a-81b9-aff3a70ebb71.jpg",
    codBarra: "",
    productoId: producto26.id,
    unidadId: unidadUN.id,
    variedadId: variedad42.id,
    presentacionId: presentacion1.id,
    activo: true,
    empresaId: empresaId
  });
  const variante130 = await Variante.create({
    codErp: "300000496",
    porcIva: 10,
    img: "eadd0abe-fe38-4808-b042-96bce0140c0e.jpg",
    codBarra: "",
    productoId: producto26.id,
    unidadId: unidadUN.id,
    variedadId: variedad51.id,
    presentacionId: presentacion1.id,
    activo: true,
    empresaId: empresaId
  });
  const variante126 = await Variante.create({
    codErp: "300000497",
    porcIva: 10,
    img: "e826e395-7425-4095-9102-05fdb69fa324.jpg",
    codBarra: "",
    productoId: producto26.id,
    unidadId: unidadUN.id,
    variedadId: variedad57.id,
    presentacionId: presentacion1.id,
    activo: true,
    empresaId: empresaId
  });
  const variante190 = await Variante.create({
    codErp: "300000594",
    porcIva: 10,
    img: "e30dbebb-b2af-4a26-9553-8fe4aab933a6.jpg",
    codBarra: "",
    productoId: producto16.id,
    unidadId: unidadCJ.id,
    variedadId: variedad33.id,
    presentacionId: presentacion59.id,
    activo: true,
    empresaId: empresaId
  });
  const variante191 = await Variante.create({
    codErp: "300000595",
    porcIva: 10,
    img: "c3479a31-5aae-4b87-9d4e-01b9bd5d21e0.jpg",
    codBarra: "",
    productoId: producto16.id,
    unidadId: unidadCJ.id,
    variedadId: variedad32.id,
    presentacionId: presentacion59.id,
    activo: true,
    empresaId: empresaId
  });
  const variante30 = await Variante.create({
    codErp: "300000603",
    porcIva: 10,
    img: "e3900820-219a-4cf9-9bca-a23d8cc4f2ed.jpg",
    codBarra: "",
    productoId: producto7.id,
    unidadId: unidadUN.id,
    variedadId: variedad9.id,
    presentacionId: presentacion45.id,
    activo: true,
    empresaId: empresaId
  });
  const variante29 = await Variante.create({
    codErp: "300000604",
    porcIva: 10,
    img: "c73fff77-2883-42fd-92c0-b6e33a159200.jpg",
    codBarra: "",
    productoId: producto7.id,
    unidadId: unidadUN.id,
    variedadId: variedad42.id,
    presentacionId: presentacion45.id,
    activo: true,
    empresaId: empresaId
  });
  const variante28 = await Variante.create({
    codErp: "300000605",
    porcIva: 10,
    img: "58dde8e1-765d-40b8-9bcd-fd7c52b5e475.jpg",
    codBarra: "",
    productoId: producto7.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion45.id,
    activo: true,
    empresaId: empresaId
  });
  const variante110 = await Variante.create({
    codErp: "300000610",
    porcIva: 10,
    img: "e05bc7d4-e538-44a0-b1ac-728418c679ff.jpg",
    codBarra: "",
    productoId: producto24.id,
    unidadId: unidadUN.id,
    variedadId: variedad77.id,
    presentacionId: presentacion5.id,
    activo: true,
    empresaId: empresaId
  });
  const variante186 = await Variante.create({
    codErp: "300000615",
    porcIva: 10,
    img: "76da72b3-d87b-46f5-a017-9d2c1a66acf3.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadDSP.id,
    variedadId: variedad6.id,
    presentacionId: presentacion35.id,
    activo: true,
    empresaId: empresaId
  });
  const variante143 = await Variante.create({
    codErp: "300000616",
    porcIva: 10,
    img: "041918d5-44a0-488e-a174-3f91f81ef7e9.jpg",
    codBarra: "",
    productoId: producto27.id,
    unidadId: unidadUN.id,
    variedadId: variedad6.id,
    presentacionId: presentacion37.id,
    activo: true,
    empresaId: empresaId
  });
  const variante68 = await Variante.create({
    codErp: "300000623",
    porcIva: 10,
    img: "f314fd22-845c-4afc-a98f-7df7001f28a6.jpg",
    codBarra: "",
    productoId: producto15.id,
    unidadId: unidadUN.id,
    variedadId: variedad74.id,
    presentacionId: presentacion1.id,
    activo: true,
    empresaId: empresaId
  });
  const variante69 = await Variante.create({
    codErp: "300000624",
    porcIva: 10,
    img: "52c9fc88-c368-4bcb-9523-2c6f73e71142.jpg",
    codBarra: "",
    productoId: producto15.id,
    unidadId: unidadUN.id,
    variedadId: variedad94.id,
    presentacionId: presentacion1.id,
    activo: true,
    empresaId: empresaId
  });
  const variante187 = await Variante.create({
    codErp: "300000625",
    porcIva: 10,
    img: "3c82ff61-3ca5-4654-8ffa-fec7bdc9afd4.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadPCK.id,
    variedadId: variedad73.id,
    presentacionId: presentacion32.id,
    activo: true,
    empresaId: empresaId
  });
  const variante67 = await Variante.create({
    codErp: "300000628",
    porcIva: 10,
    img: "6d4374f7-b0fb-4824-9c48-219ecfed0c66.jpg",
    codBarra: "",
    productoId: producto14.id,
    unidadId: unidadUN.id,
    variedadId: variedad55.id,
    presentacionId: presentacion1.id,
    activo: true,
    empresaId: empresaId
  });
  const variante26 = await Variante.create({
    codErp: "300000629",
    porcIva: 10,
    img: "73b7c34c-4ca7-4c35-9952-d624daf2e74b.jpg",
    codBarra: "",
    productoId: producto6.id,
    unidadId: unidadCJ.id,
    variedadId: variedad34.id,
    presentacionId: presentacion54.id,
    activo: true,
    empresaId: empresaId
  });
  const variante224 = await Variante.create({
    codErp: "300000641",
    porcIva: 10,
    img: "88271eab-30da-4216-81f6-daac7088d3e2.jpg",
    codBarra: "",
    productoId: producto44.id,
    unidadId: unidadUN.id,
    variedadId: variedad90.id,
    presentacionId: presentacion64.id,
    activo: true,
    empresaId: empresaId
  });
  const variante223 = await Variante.create({
    codErp: "300000642",
    porcIva: 10,
    img: "449a9160-ecb1-4c78-8541-d05cb0483a35.jpg",
    codBarra: "",
    productoId: producto44.id,
    unidadId: unidadUN.id,
    variedadId: variedad91.id,
    presentacionId: presentacion64.id,
    activo: true,
    empresaId: empresaId
  });
  const variante222 = await Variante.create({
    codErp: "300000643",
    porcIva: 10,
    img: "cadf0bdc-432f-4f14-9e58-e3b4a583c21e.jpg",
    codBarra: "",
    productoId: producto44.id,
    unidadId: unidadUN.id,
    variedadId: variedad92.id,
    presentacionId: presentacion64.id,
    activo: true,
    empresaId: empresaId
  });
  const variante291 = await Variante.create({
    codErp: "300000644",
    porcIva: 10,
    img: "9f650b31-ac36-4470-988b-47638ef24425.jpg",
    codBarra: "",
    productoId: producto44.id,
    unidadId: unidadUN.id,
    variedadId: variedad90.id,
    presentacionId: presentacion73.id,
    activo: true,
    empresaId: empresaId
  });
  const variante290 = await Variante.create({
    codErp: "300000645",
    porcIva: 10,
    img: "144e764f-f668-4754-ad3d-f60b631c53f8.jpg",
    codBarra: "",
    productoId: producto44.id,
    unidadId: unidadUN.id,
    variedadId: variedad91.id,
    presentacionId: presentacion73.id,
    activo: true,
    empresaId: empresaId
  });
  const variante289 = await Variante.create({
    codErp: "300000646",
    porcIva: 10,
    img: "0fa476db-2cc5-4369-97e7-935faf908b9d.jpg",
    codBarra: "",
    productoId: producto44.id,
    unidadId: unidadUN.id,
    variedadId: variedad92.id,
    presentacionId: presentacion73.id,
    activo: true,
    empresaId: empresaId
  });
  const variante225 = await Variante.create({
    codErp: "300000652",
    porcIva: 10,
    img: "6d22f192-4a7b-4984-b06f-ddbb612f6775.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadUN.id,
    variedadId: variedad71.id,
    presentacionId: presentacion65.id,
    activo: true,
    empresaId: empresaId
  });
  const variante226 = await Variante.create({
    codErp: "300000653",
    porcIva: 10,
    img: "9edd4bc9-30ee-4b89-ae53-66c1aab81ed1.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadUN.id,
    variedadId: variedad43.id,
    presentacionId: presentacion65.id,
    activo: true,
    empresaId: empresaId
  });
  const variante227 = await Variante.create({
    codErp: "300000654",
    porcIva: 10,
    img: "7c30b6d9-822c-47cc-a4a1-aadfa34f0db2.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadUN.id,
    variedadId: variedad42.id,
    presentacionId: presentacion65.id,
    activo: true,
    empresaId: empresaId
  });
  const variante228 = await Variante.create({
    codErp: "300000655",
    porcIva: 10,
    img: "880fbf79-272e-43c6-9cbe-e593cb1359c7.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadUN.id,
    variedadId: variedad61.id,
    presentacionId: presentacion65.id,
    activo: true,
    empresaId: empresaId
  });
  const variante281 = await Variante.create({
    codErp: "300000656",
    porcIva: 10,
    img: "cd57da25-7d52-4e82-92e3-f0dffbb62fc8.jpg",
    codBarra: "",
    productoId: producto22.id,
    unidadId: unidadUN.id,
    variedadId: variedad75.id,
    presentacionId: presentacion8.id,
    activo: true,
    empresaId: empresaId
  });
  const variante209 = await Variante.create({
    codErp: "300000664",
    porcIva: 10,
    img: "ccec74b0-e81b-4f16-bbed-354b5b20653e.jpg",
    codBarra: "",
    productoId: producto36.id,
    unidadId: unidadUN.id,
    variedadId: variedad37.id,
    presentacionId: presentacion62.id,
    activo: true,
    empresaId: empresaId
  });
  const variante205 = await Variante.create({
    codErp: "300000665",
    porcIva: 10,
    img: "2f14cd9f-0723-40b8-840c-5c7b65283ff4.jpg",
    codBarra: "",
    productoId: producto36.id,
    unidadId: unidadUN.id,
    variedadId: variedad38.id,
    presentacionId: presentacion62.id,
    activo: true,
    empresaId: empresaId
  });
  const variante206 = await Variante.create({
    codErp: "300000666",
    porcIva: 10,
    img: "2460c510-1f13-47a6-bfb0-e88dcf4cdda0.jpg",
    codBarra: "",
    productoId: producto36.id,
    unidadId: unidadUN.id,
    variedadId: variedad9.id,
    presentacionId: presentacion62.id,
    activo: true,
    empresaId: empresaId
  });
  const variante208 = await Variante.create({
    codErp: "300000667",
    porcIva: 10,
    img: "a9c7ef78-9d7f-4de4-a9e6-3999834fbb3f.jpg",
    codBarra: "",
    productoId: producto36.id,
    unidadId: unidadUN.id,
    variedadId: variedad37.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante204 = await Variante.create({
    codErp: "300000668",
    porcIva: 10,
    img: "fa97833a-cb24-4fca-b266-8d2313a9c23c.jpg",
    codBarra: "",
    productoId: producto36.id,
    unidadId: unidadUN.id,
    variedadId: variedad38.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante207 = await Variante.create({
    codErp: "300000669",
    porcIva: 10,
    img: "92ab822c-f5a5-4d7c-81d6-5f410aacab7f.jpg",
    codBarra: "",
    productoId: producto36.id,
    unidadId: unidadUN.id,
    variedadId: variedad9.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante215 = await Variante.create({
    codErp: "300000688",
    porcIva: 10,
    img: "d451918a-5a85-4b68-8574-f82ad1c97c2d.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad88.id,
    presentacionId: presentacion41.id,
    activo: true,
    empresaId: empresaId
  });
  const variante211 = await Variante.create({
    codErp: "300000689",
    porcIva: 10,
    img: "ef721bf0-5dd9-409f-917f-5cc884424a69.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad85.id,
    presentacionId: presentacion41.id,
    activo: true,
    empresaId: empresaId
  });
  const variante275 = await Variante.create({
    codErp: "300000690",
    porcIva: 10,
    img: "8c412aa1-c7e2-4bf2-b4ba-3a44e83cc482.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad88.id,
    presentacionId: presentacion40.id,
    activo: true,
    empresaId: empresaId
  });
  const variante217 = await Variante.create({
    codErp: "300000691",
    porcIva: 10,
    img: "e3b20fe9-59ff-46d7-9853-a60dc6a7658f.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad85.id,
    presentacionId: presentacion40.id,
    activo: true,
    empresaId: empresaId
  });
  const variante265 = await Variante.create({
    codErp: "300000692",
    porcIva: 10,
    img: "5be5deb8-3665-43bf-af94-e8d612a4b509.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad82.id,
    presentacionId: presentacion27.id,
    activo: true,
    empresaId: empresaId
  });
  const variante264 = await Variante.create({
    codErp: "300000693",
    porcIva: 10,
    img: "4c5cc9a0-3226-4812-bd35-0152fad140cf.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad82.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante214 = await Variante.create({
    codErp: "300000701",
    porcIva: 10,
    img: "cc3c0474-6db3-430a-95e1-2160be2f6e07.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad87.id,
    presentacionId: presentacion41.id,
    activo: true,
    empresaId: empresaId
  });
  const variante213 = await Variante.create({
    codErp: "300000702",
    porcIva: 10,
    img: "6ba3ceeb-984d-4563-827f-acaca93ce77e.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad86.id,
    presentacionId: presentacion41.id,
    activo: true,
    empresaId: empresaId
  });
  const variante276 = await Variante.create({
    codErp: "300000703",
    porcIva: 10,
    img: "716e8076-f7d1-4ee2-965c-d4ff7118734a.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad87.id,
    presentacionId: presentacion40.id,
    activo: true,
    empresaId: empresaId
  });
  const variante218 = await Variante.create({
    codErp: "300000704",
    porcIva: 10,
    img: "240de82a-a34f-4c31-b639-cece193943a7.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad86.id,
    presentacionId: presentacion40.id,
    activo: true,
    empresaId: empresaId
  });
  const variante6 = await Variante.create({
    codErp: "300000705",
    porcIva: 10,
    img: "520d6549-e6a2-4df0-9415-1b71da32d8cc.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad83.id,
    presentacionId: presentacion27.id,
    activo: true,
    empresaId: empresaId
  });
  const variante12 = await Variante.create({
    codErp: "300000706",
    porcIva: 10,
    img: "0e3c9b6c-e147-45e7-a776-6f02140df9cd.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad81.id,
    presentacionId: presentacion27.id,
    activo: true,
    empresaId: empresaId
  });
  const variante10 = await Variante.create({
    codErp: "300000707",
    porcIva: 10,
    img: "ecf3daf1-c9a4-4048-8e8f-a62c04385666.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad79.id,
    presentacionId: presentacion27.id,
    activo: true,
    empresaId: empresaId
  });
  const variante8 = await Variante.create({
    codErp: "300000708",
    porcIva: 10,
    img: "91318b97-e5b2-49bd-8a83-2066ec3dd005.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad80.id,
    presentacionId: presentacion27.id,
    activo: true,
    empresaId: empresaId
  });
  const variante13 = await Variante.create({
    codErp: "300000709",
    porcIva: 10,
    img: "f8f1796d-ca24-48b5-8639-145a93f872fe.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad83.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante11 = await Variante.create({
    codErp: "300000710",
    porcIva: 10,
    img: "a0484854-84d3-4181-bda6-2548ceec89d7.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad81.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante9 = await Variante.create({
    codErp: "300000711",
    porcIva: 10,
    img: "97dcf8df-12f0-4be1-aa8d-38feec63100c.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad79.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante7 = await Variante.create({
    codErp: "300000712",
    porcIva: 10,
    img: "cec5968f-dfc5-492b-90c9-afb907509d48.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad80.id,
    presentacionId: presentacion26.id,
    activo: true,
    empresaId: empresaId
  });
  const variante101 = await Variante.create({
    codErp: "300000713",
    porcIva: 10,
    img: "00d38e1d-99ec-45de-a0dc-30af618982fa.jpg",
    codBarra: "",
    productoId: producto22.id,
    unidadId: unidadUN.id,
    variedadId: variedad75.id,
    presentacionId: presentacion3.id,
    activo: true,
    empresaId: empresaId
  });
  const variante102 = await Variante.create({
    codErp: "300000715",
    porcIva: 10,
    img: "4cdf5925-97fb-4b57-9d67-74279302c378.jpg",
    codBarra: "",
    productoId: producto22.id,
    unidadId: unidadUN.id,
    variedadId: variedad75.id,
    presentacionId: presentacion4.id,
    activo: true,
    empresaId: empresaId
  });
  const variante103 = await Variante.create({
    codErp: "300000716",
    porcIva: 10,
    img: "686d63ff-557b-49cc-b99d-3520d1eaf617.jpg",
    codBarra: "",
    productoId: producto22.id,
    unidadId: unidadUN.id,
    variedadId: variedad75.id,
    presentacionId: presentacion6.id,
    activo: true,
    empresaId: empresaId
  });
  const variante106 = await Variante.create({
    codErp: "300000719",
    porcIva: 10,
    img: "22f2c2a9-24c7-42e7-8fe3-1bd3742bbd9f.jpg",
    codBarra: "",
    productoId: producto23.id,
    unidadId: unidadUN.id,
    variedadId: variedad76.id,
    presentacionId: presentacion4.id,
    activo: true,
    empresaId: empresaId
  });
  const variante107 = await Variante.create({
    codErp: "300000720",
    porcIva: 10,
    img: "54ebcec7-41a8-4ee1-b04c-271ec7addaf0.jpg",
    codBarra: "",
    productoId: producto23.id,
    unidadId: unidadUN.id,
    variedadId: variedad76.id,
    presentacionId: presentacion6.id,
    activo: true,
    empresaId: empresaId
  });
  const variante105 = await Variante.create({
    codErp: "300000721",
    porcIva: 10,
    img: "3c48cd15-277b-4037-8c48-5155de2e036c.jpg",
    codBarra: "",
    productoId: producto23.id,
    unidadId: unidadUN.id,
    variedadId: variedad76.id,
    presentacionId: presentacion7.id,
    activo: true,
    empresaId: empresaId
  });
  const variante100 = await Variante.create({
    codErp: "300000723",
    porcIva: 10,
    img: "4176339b-514b-4ff6-bbd2-b24d65225700.jpg",
    codBarra: "",
    productoId: producto22.id,
    unidadId: unidadUN.id,
    variedadId: variedad75.id,
    presentacionId: presentacion7.id,
    activo: true,
    empresaId: empresaId
  });
  const variante221 = await Variante.create({
    codErp: "300000734",
    porcIva: 10,
    img: "1ac35713-1301-4dce-ab84-528b446e788e.jpg",
    codBarra: "",
    productoId: producto44.id,
    unidadId: unidadUN.id,
    variedadId: variedad90.id,
    presentacionId: presentacion45.id,
    activo: true,
    empresaId: empresaId
  });
  const variante220 = await Variante.create({
    codErp: "300000735",
    porcIva: 10,
    img: "08a1d341-fd56-455d-aae0-bf5ac116a8c9.jpg",
    codBarra: "",
    productoId: producto44.id,
    unidadId: unidadUN.id,
    variedadId: variedad91.id,
    presentacionId: presentacion45.id,
    activo: true,
    empresaId: empresaId
  });
  const variante219 = await Variante.create({
    codErp: "300000736",
    porcIva: 10,
    img: "11422df9-e132-4a25-8ee0-5e6bf2452f27.jpg",
    codBarra: "",
    productoId: producto44.id,
    unidadId: unidadUN.id,
    variedadId: variedad92.id,
    presentacionId: presentacion45.id,
    activo: true,
    empresaId: empresaId
  });
  const variante58 = await Variante.create({
    codErp: "300000741",
    porcIva: 10,
    img: "87264e2e-f0d1-4c52-9782-f65474c3e7b4.jpg",
    codBarra: "",
    productoId: producto12.id,
    unidadId: unidadCJ.id,
    variedadId: variedad73.id,
    presentacionId: presentacion39.id,
    activo: true,
    empresaId: empresaId
  });
  const variante233 = await Variante.create({
    codErp: "300000743",
    porcIva: 10,
    img: "107a3f8f-51c0-494d-a65e-864e3e80f70d.jpg",
    codBarra: "",
    productoId: producto15.id,
    unidadId: unidadUN.id,
    variedadId: variedad74.id,
    presentacionId: presentacion56.id,
    activo: true,
    empresaId: empresaId
  });
  const variante234 = await Variante.create({
    codErp: "300000744",
    porcIva: 10,
    img: "ed5f353b-06bf-403f-9376-3eda3df4985a.jpg",
    codBarra: "",
    productoId: producto15.id,
    unidadId: unidadUN.id,
    variedadId: variedad94.id,
    presentacionId: presentacion56.id,
    activo: true,
    empresaId: empresaId
  });
  const variante232 = await Variante.create({
    codErp: "300000745",
    porcIva: 10,
    img: "ff8e9940-e6bb-456f-a5d2-4630fa681fb6.jpg",
    codBarra: "",
    productoId: producto15.id,
    unidadId: unidadUN.id,
    variedadId: variedad74.id,
    presentacionId: presentacion33.id,
    activo: true,
    empresaId: empresaId
  });
  const variante229 = await Variante.create({
    codErp: "300000746",
    porcIva: 10,
    img: "524aeb07-0dd1-448b-bcd5-7821f0d0c857.jpg",
    codBarra: "",
    productoId: producto15.id,
    unidadId: unidadUN.id,
    variedadId: variedad94.id,
    presentacionId: presentacion66.id,
    activo: true,
    empresaId: empresaId
  });
  const variante212 = await Variante.create({
    codErp: "300000751",
    porcIva: 10,
    img: "8bd3cd51-d3eb-416b-922d-f92e5b21be7d.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad89.id,
    presentacionId: presentacion41.id,
    activo: true,
    empresaId: empresaId
  });
  const variante210 = await Variante.create({
    codErp: "300000752",
    porcIva: 10,
    img: "296c094f-fa3f-481d-ae96-5bcf9c066ab4.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad84.id,
    presentacionId: presentacion41.id,
    activo: true,
    empresaId: empresaId
  });
  const variante277 = await Variante.create({
    codErp: "300000754",
    porcIva: 10,
    img: "8938caf3-eb90-4820-b2da-fb836c882e52.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad89.id,
    presentacionId: presentacion40.id,
    activo: true,
    empresaId: empresaId
  });
  const variante216 = await Variante.create({
    codErp: "300000755",
    porcIva: 10,
    img: "beb13d53-765c-403c-abcb-834cd677256b.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad84.id,
    presentacionId: presentacion40.id,
    activo: true,
    empresaId: empresaId
  });
  const variante179 = await Variante.create({
    codErp: "300000756",
    porcIva: 10,
    img: "2e4bf7ae-ee3d-4724-99fd-b072ae0604d5.jpg",
    codBarra: "",
    productoId: producto12.id,
    unidadId: unidadCJ.id,
    variedadId: variedad34.id,
    presentacionId: presentacion39.id,
    activo: true,
    empresaId: empresaId
  });
  const variante263 = await Variante.create({
    codErp: "300000761",
    porcIva: 10,
    img: "2b5ca18d-021d-4b59-8d34-97d42a67589c.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad83.id,
    presentacionId: presentacion70.id,
    activo: true,
    empresaId: empresaId
  });
  const variante261 = await Variante.create({
    codErp: "300000763",
    porcIva: 10,
    img: "7c1683ad-e72a-4a2a-9a76-e141ad46758a.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad79.id,
    presentacionId: presentacion70.id,
    activo: true,
    empresaId: empresaId
  });
  const variante238 = await Variante.create({
    codErp: "300000765",
    porcIva: 10,
    img: "ad957e1f-74f5-4fe3-b180-01f3fb7232b9.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad85.id,
    presentacionId: presentacion38.id,
    activo: true,
    empresaId: empresaId
  });
  const variante239 = await Variante.create({
    codErp: "300000766",
    porcIva: 10,
    img: "751178e6-b6fe-449d-a290-a61cab138f20.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad87.id,
    presentacionId: presentacion38.id,
    activo: true,
    empresaId: empresaId
  });
  const variante240 = await Variante.create({
    codErp: "300000767",
    porcIva: 10,
    img: "f34cb947-13ef-4852-898b-2cfbfaf50d86.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad89.id,
    presentacionId: presentacion38.id,
    activo: true,
    empresaId: empresaId
  });
  const variante241 = await Variante.create({
    codErp: "300000768",
    porcIva: 10,
    img: "454ace67-c092-40fa-9f53-95e7a850b14c.jpg",
    codBarra: "",
    productoId: producto8.id,
    unidadId: unidadUN.id,
    variedadId: variedad84.id,
    presentacionId: presentacion38.id,
    activo: true,
    empresaId: empresaId
  });
  const variante262 = await Variante.create({
    codErp: "300000783",
    porcIva: 10,
    img: "59d10894-a8ef-4c00-9512-9a3de97409e9.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad82.id,
    presentacionId: presentacion70.id,
    activo: true,
    empresaId: empresaId
  });
  const variante230 = await Variante.create({
    codErp: "300000784",
    porcIva: 10,
    img: "2d1778c7-30f2-4dc2-a208-26baac10a784.jpg",
    codBarra: "",
    productoId: producto15.id,
    unidadId: unidadUN.id,
    variedadId: variedad74.id,
    presentacionId: presentacion67.id,
    activo: true,
    empresaId: empresaId
  });
  const variante231 = await Variante.create({
    codErp: "300000785",
    porcIva: 10,
    img: "524aeb07-0dd1-448b-bcd5-7821f0d0c857.jpg",
    codBarra: "",
    productoId: producto15.id,
    unidadId: unidadUN.id,
    variedadId: variedad94.id,
    presentacionId: presentacion67.id,
    activo: true,
    empresaId: empresaId
  });
  const variante258 = await Variante.create({
    codErp: "300000789",
    porcIva: 10,
    img: "d0ca8006-6e0e-4cad-b95f-717e8aee3ee0.jpg",
    codBarra: "",
    productoId: producto38.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion1.id,
    activo: true,
    empresaId: empresaId
  });
  const variante257 = await Variante.create({
    codErp: "300000791",
    porcIva: 10,
    img: "4dc9c637-4f97-4c91-8715-aa3be98e8eb6.jpg",
    codBarra: "",
    productoId: producto38.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion1.id,
    activo: true,
    empresaId: empresaId
  });
  const variante242 = await Variante.create({
    codErp: "300000796",
    porcIva: 10,
    img: "d633960b-6430-4ad0-ac83-cf1c37bfde72.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadUN.id,
    variedadId: variedad95.id,
    presentacionId: presentacion65.id,
    activo: true,
    empresaId: empresaId
  });
  const variante47 = await Variante.create({
    codErp: "300000797",
    porcIva: 10,
    img: "c877008a-7bcb-4c57-a636-bca31bbe2403.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadUN.id,
    variedadId: variedad71.id,
    presentacionId: presentacion43.id,
    activo: true,
    empresaId: empresaId
  });
  const variante45 = await Variante.create({
    codErp: "300000798",
    porcIva: 10,
    img: "c3753a0e-db3f-4de0-96b4-395b122b0cf2.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadUN.id,
    variedadId: variedad43.id,
    presentacionId: presentacion43.id,
    activo: true,
    empresaId: empresaId
  });
  const variante269 = await Variante.create({
    codErp: "300000799",
    porcIva: 10,
    img: "abdc6722-d17d-427e-8a2e-e2e3aa55780c.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadUN.id,
    variedadId: variedad42.id,
    presentacionId: presentacion43.id,
    activo: true,
    empresaId: empresaId
  });
  const variante51 = await Variante.create({
    codErp: "300000800",
    porcIva: 10,
    img: "41852d22-0cb2-4e81-a874-f94291ff925f.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadUN.id,
    variedadId: variedad61.id,
    presentacionId: presentacion43.id,
    activo: true,
    empresaId: empresaId
  });
  const variante243 = await Variante.create({
    codErp: "300000802",
    porcIva: 10,
    img: "be5018fc-5a63-4755-a027-8d5e2a39068e.jpg",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadUN.id,
    variedadId: variedad95.id,
    presentacionId: presentacion43.id,
    activo: true,
    empresaId: empresaId
  });
  const variante255 = await Variante.create({
    codErp: "300000803",
    porcIva: 10,
    img: "98a6c780-f350-4172-a14c-ae6ef243d042.jpg",
    codBarra: "",
    productoId: producto38.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion68.id,
    activo: true,
    empresaId: empresaId
  });
  const variante253 = await Variante.create({
    codErp: "300000804",
    porcIva: 10,
    img: "4f07f794-a6ad-4d02-8aca-f8961d772a12.jpg",
    codBarra: "",
    productoId: producto38.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion68.id,
    activo: true,
    empresaId: empresaId
  });
  const variante256 = await Variante.create({
    codErp: "300000806",
    porcIva: 10,
    img: "e6dfd1da-9524-4148-948b-abc38696def0.jpg",
    codBarra: "",
    productoId: producto38.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion69.id,
    activo: true,
    empresaId: empresaId
  });
  const variante268 = await Variante.create({
    codErp: "300000807",
    porcIva: 10,
    img: "5d6c96d6-5c92-4aaf-b3a0-92f638cb85e7.jpg",
    codBarra: "",
    productoId: producto38.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion69.id,
    activo: true,
    empresaId: empresaId
  });
  const variante267 = await Variante.create({
    codErp: "300000808",
    porcIva: 10,
    img: "0bf877d8-7868-4321-b8dd-9688c8f9756b.jpg",
    codBarra: "",
    productoId: producto38.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion37.id,
    activo: true,
    empresaId: empresaId
  });
  const variante266 = await Variante.create({
    codErp: "300000809",
    porcIva: 10,
    img: "226a41b0-4c3e-4749-b811-a3ad385a5622.jpg",
    codBarra: "",
    productoId: producto38.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion37.id,
    activo: true,
    empresaId: empresaId
  });
  const variante274 = await Variante.create({
    codErp: "300000824",
    porcIva: 10,
    img: "26e45b2d-edfa-4f89-9ae8-8cb48a793902.jpg",
    codBarra: "",
    productoId: producto45.id,
    unidadId: unidadUN.id,
    variedadId: variedad96.id,
    presentacionId: presentacion65.id,
    activo: true,
    empresaId: empresaId
  });
  const variante254 = await Variante.create({
    codErp: "300000909",
    porcIva: 10,
    img: "aa8af5bd-cd58-4fb4-8ae6-000d7fb04e18.jpg",
    codBarra: "",
    productoId: producto38.id,
    unidadId: unidadUN.id,
    variedadId: variedad5.id,
    presentacionId: presentacion67.id,
    activo: true,
    empresaId: empresaId
  });
  const variante252 = await Variante.create({
    codErp: "300000910",
    porcIva: 10,
    img: "f7d95e79-9021-43ac-a379-bcc92aa01263.jpg",
    codBarra: "",
    productoId: producto38.id,
    unidadId: unidadUN.id,
    variedadId: variedad56.id,
    presentacionId: presentacion67.id,
    activo: true,
    empresaId: empresaId
  });
  const variante292 = await Variante.create({
    codErp: "300000915",
    porcIva: 10,
    img: "c5688d20-ec27-43e7-9aab-f79e77a9c28d.jpg",
    codBarra: "",
    productoId: producto5.id,
    unidadId: unidadUN.id,
    variedadId: variedad37.id,
    presentacionId: presentacion61.id,
    activo: true,
    empresaId: empresaId
  });
  const variante283 = await Variante.create({
    codErp: "300001168",
    porcIva: 10,
    img: "",
    codBarra: "",
    productoId: producto9.id,
    unidadId: unidadUN.id,
    variedadId: variedad100.id,
    presentacionId: presentacion65.id,
    activo: true,
    empresaId: empresaId
  });
  const variante285 = await Variante.create({
    codErp: "300001195",
    porcIva: 10,
    img: "5405b2ad-8cdc-4361-9151-676ac30152c5.jpg",
    codBarra: "",
    productoId: producto49.id,
    unidadId: unidadUN.id,
    variedadId: variedad2.id,
    presentacionId: presentacion27.id,
    activo: true,
    empresaId: empresaId
  });
  const variante286 = await Variante.create({
    codErp: "300001197",
    porcIva: 10,
    img: "f068add9-94ad-44a7-ab9e-f1c0b293ba40.jpg",
    codBarra: "",
    productoId: producto49.id,
    unidadId: unidadUN.id,
    variedadId: variedad101.id,
    presentacionId: presentacion27.id,
    activo: true,
    empresaId: empresaId
  });
  const variante287 = await Variante.create({
    codErp: "300001199",
    porcIva: 10,
    img: "660bea70-7977-4019-a13b-323b292f53b8.jpg",
    codBarra: "",
    productoId: producto49.id,
    unidadId: unidadUN.id,
    variedadId: variedad102.id,
    presentacionId: presentacion27.id,
    activo: true,
    empresaId: empresaId
  });
  const variante288 = await Variante.create({
    codErp: "300001200",
    porcIva: 10,
    img: "30ed95b3-503c-4aa3-8829-8ddacea9333f.jpg",
    codBarra: "",
    productoId: producto49.id,
    unidadId: unidadUN.id,
    variedadId: variedad103.id,
    presentacionId: presentacion27.id,
    activo: true,
    empresaId: empresaId
  });
  const variante282 = await Variante.create({
    codErp: "300001225",
    porcIva: 10,
    img: "",
    codBarra: "",
    productoId: producto16.id,
    unidadId: unidadCJ.id,
    variedadId: variedad33.id,
    presentacionId: presentacion72.id,
    activo: true,
    empresaId: empresaId
  });
  const variante3 = await Variante.create({
    codErp: "500000001",
    porcIva: 10,
    img: "55e4fb9f-cd8e-4064-b2e6-caaf925a1aeb.jpg",
    codBarra: "",
    productoId: producto2.id,
    unidadId: unidadROL.id,
    variedadId: variedad52.id,
    presentacionId: presentacion51.id,
    activo: true,
    empresaId: empresaId
  });
  const variante4 = await Variante.create({
    codErp: "500000002",
    porcIva: 10,
    img: "6bf1251a-c5f4-44cd-a501-2f205a123570.jpg",
    codBarra: "",
    productoId: producto2.id,
    unidadId: unidadROL.id,
    variedadId: variedad52.id,
    presentacionId: presentacion52.id,
    activo: true,
    empresaId: empresaId
  });
  const variante5 = await Variante.create({
    codErp: "500000003",
    porcIva: 10,
    img: "fab85cb9-31f6-4e06-a625-c5bdff62e2d3.jpg",
    codBarra: "",
    productoId: producto2.id,
    unidadId: unidadROL.id,
    variedadId: variedad52.id,
    presentacionId: presentacion53.id,
    activo: true,
    empresaId: empresaId
  });
  const variante177 = await Variante.create({
    codErp: "500000004",
    porcIva: 10,
    img: "60c6b01e-ddbb-4713-a289-40ec10261d99.jpg",
    codBarra: "",
    productoId: producto2.id,
    unidadId: unidadROL.id,
    variedadId: variedad65.id,
    presentacionId: presentacion49.id,
    activo: true,
    empresaId: empresaId
  });
  const variante178 = await Variante.create({
    codErp: "500000005",
    porcIva: 10,
    img: "ffd83af7-c8be-4b65-b854-82f6df1d1aeb.jpg",
    codBarra: "",
    productoId: producto2.id,
    unidadId: unidadROL.id,
    variedadId: variedad65.id,
    presentacionId: presentacion50.id,
    activo: true,
    empresaId: empresaId
  });
  const variante157 = await Variante.create({
    codErp: "500000006",
    porcIva: 10,
    img: "fd3ff599-fe3d-4247-aa8e-a30bceb23d74.jpg",
    codBarra: "",
    productoId: producto28.id,
    unidadId: unidadUN.id,
    variedadId: variedad64.id,
    presentacionId: presentacion48.id,
    activo: true,
    empresaId: empresaId
  });
  const variante156 = await Variante.create({
    codErp: "500000007",
    porcIva: 10,
    img: "9b53cd27-d772-46d0-8637-2934e22ef025.jpg",
    codBarra: "",
    productoId: producto28.id,
    unidadId: unidadUN.id,
    variedadId: variedad63.id,
    presentacionId: presentacion48.id,
    activo: true,
    empresaId: empresaId
  });
  const variante270 = await Variante.create({
    codErp: "830000264",
    porcIva: 10,
    img: "",
    codBarra: "",
    productoId: producto39.id,
    unidadId: unidadUN.id,
    variedadId: variedad34.id,
    presentacionId: presentacion48.id,
    activo: true,
    empresaId: empresaId
  });
  const variante271 = await Variante.create({
    codErp: "830000266",
    porcIva: 10,
    img: "",
    codBarra: "",
    productoId: producto40.id,
    unidadId: unidadUN.id,
    variedadId: variedad34.id,
    presentacionId: presentacion48.id,
    activo: true,
    empresaId: empresaId
  });
  const variante272 = await Variante.create({
    codErp: "830000267",
    porcIva: 10,
    img: "",
    codBarra: "",
    productoId: producto41.id,
    unidadId: unidadUN.id,
    variedadId: variedad34.id,
    presentacionId: presentacion48.id,
    activo: true,
    empresaId: empresaId
  });
  const variante273 = await Variante.create({
    codErp: "830000268",
    porcIva: 10,
    img: "",
    codBarra: "",
    productoId: producto42.id,
    unidadId: unidadUN.id,
    variedadId: variedad34.id,
    presentacionId: presentacion48.id,
    activo: true,
    empresaId: empresaId
  });
  const variante278 = await Variante.create({
    codErp: "830000314",
    porcIva: 10,
    img: "51ca2cfb-ad1e-4e2e-b175-752ae17d84dc.jpg",
    codBarra: "",
    productoId: producto46.id,
    unidadId: unidadUN.id,
    variedadId: variedad99.id,
    presentacionId: presentacion71.id,
    activo: true,
    empresaId: empresaId
  });
  const variante279 = await Variante.create({
    codErp: "830000315",
    porcIva: 10,
    img: "8bc279ec-422f-4174-9bc5-58d0d7827926.jpg",
    codBarra: "",
    productoId: producto47.id,
    unidadId: unidadUN.id,
    variedadId: variedad97.id,
    presentacionId: presentacion71.id,
    activo: true,
    empresaId: empresaId
  });
  const variante280 = await Variante.create({
    codErp: "830000316",
    porcIva: 10,
    img: "0af655f8-707f-4d27-afc2-bf8c0aec1168.jpg",
    codBarra: "",
    productoId: producto48.id,
    unidadId: unidadUN.id,
    variedadId: variedad98.id,
    presentacionId: presentacion71.id,
    activo: true,
    empresaId: empresaId
  });
  const variante293 = await Variante.create({
    codErp: "830000351",
    porcIva: 10,
    img: "d2ecaa1c-346d-4962-92c0-00a3dca27b02.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad79.id,
    presentacionId: presentacion74.id,
    activo: true,
    empresaId: empresaId
  });
  const variante294 = await Variante.create({
    codErp: "830000352",
    porcIva: 10,
    img: "7ac1c7ab-16e5-48a2-aa83-ffe45d14854f.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad83.id,
    presentacionId: presentacion74.id,
    activo: true,
    empresaId: empresaId
  });
  const variante295 = await Variante.create({
    codErp: "830000355",
    porcIva: 10,
    img: "bc9122c9-2a2f-447f-a2a0-44e54fa23d95.jpg",
    codBarra: "",
    productoId: producto3.id,
    unidadId: unidadUN.id,
    variedadId: variedad82.id,
    presentacionId: presentacion74.id,
    activo: true,
    empresaId: empresaId
  });
  const variante297 = await Variante.create({
    codErp: "830000437",
    porcIva: 10,
    img: "d2eabdde-24d7-46dd-ba07-8d15a7d765ef.jpg",
    codBarra: "",
    productoId: producto56.id,
    unidadId: unidadUN.id,
    variedadId: variedad104.id,
    presentacionId: presentacion71.id,
    activo: true,
    empresaId: empresaId
  });
  const condicionPago = await CondicionPago.create({
    descripcion: "contado",
    dias: 0,
    activo: true,
    empresaId: empresaId,
    color: "#45A137",
    predeterminado: true
  });

  const condicionPago2 = await CondicionPago.create({
    descripcion: "credito 15",
    dias: 15,
    activo: true,
    empresaId: empresaId,
    color: "#45A137",
    predeterminado: false
  });
  const condicionPago3 = await CondicionPago.create({
    descripcion: "credito 20",
    dias: 20,
    activo: true,
    empresaId: empresaId,
    color: "#45A137",
    predeterminado: false
  });
  const condicionPago4 = await CondicionPago.create({
    descripcion: "credito 25",
    dias: 25,
    activo: true,
    empresaId: empresaId,
    color: "#45A137",
    predeterminado: false
  });
  const condicionPago5 = await CondicionPago.create({
    descripcion: "credito 30",
    dias: 30,
    activo: true,
    empresaId: empresaId,
    color: "#45A137",
    predeterminado: false
  });

  const condicionPago6 = await CondicionPago.create({
    descripcion: "credito 45",
    dias: 45,
    activo: true,
    empresaId: empresaId,
    color: "#45A137",
    predeterminado: false
  });

  const condicionPago7 = await CondicionPago.create({
    descripcion: "credito 60",
    dias: 60,
    activo: true,
    empresaId: empresaId,
    color: "#45A137",
    predeterminado: false
  });

  const condicionPago8 = await CondicionPago.create({
    descripcion: "credito 75",
    dias: 75,
    activo: true,
    empresaId: empresaId,
    color: "#45A137",
    predeterminado: false
  });

  const condicionPago9 = await CondicionPago.create({
    descripcion: "credito 90",
    dias: 90,
    activo: true,
    empresaId: empresaId,
    color: "#45A137",
    predeterminado: false
  });

  const listaPrecio = await ListaPrecio.create({
    descripcion: "showroom",
    activo: true,
    empresaId: empresaId,
    color: "#45A137",
    predeterminado: true
  });

  const listaPrecio2 = await ListaPrecio.create({
    descripcion: "empleados",
    activo: true,
    empresaId: empresaId,
    color: "#45A137",
    predeterminado: false
  });

 

  console.log({
    listaPrecioId: listaPrecio.id,
    varianteId: variante3.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7900,
    activo: true,
    empresaId: empresaId
  });
  const precio1 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante3.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7900,
    activo: true,
    empresaId: empresaId
  });
  const precio2 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante4.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 10600,
    activo: true,
    empresaId: empresaId
  });
  const precio3 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante5.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 17000,
    activo: true,
    empresaId: empresaId
  });
  const precio4 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante6.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12300,
    activo: true,
    empresaId: empresaId
  });
  const precio5 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante7.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 55800,
    activo: true,
    empresaId: empresaId
  });
  const precio6 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante8.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12300,
    activo: true,
    empresaId: empresaId
  });
  const precio7 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante9.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 55800,
    activo: true,
    empresaId: empresaId
  });
  const precio8 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante10.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12300,
    activo: true,
    empresaId: empresaId
  });
  const precio9 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante11.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 55800,
    activo: true,
    empresaId: empresaId
  });
  const precio10 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante12.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12300,
    activo: true,
    empresaId: empresaId
  });
  const precio11 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante13.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 55800,
    activo: true,
    empresaId: empresaId
  });
  const precio12 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante14.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 57500,
    activo: true,
    empresaId: empresaId
  });
  const precio13 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante15.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7700,
    activo: true,
    empresaId: empresaId
  });
  const precio14 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante16.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 33500,
    activo: true,
    empresaId: empresaId
  });
  const precio15 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante17.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3500,
    activo: true,
    empresaId: empresaId
  });
  const precio16 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante18.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 33500,
    activo: true,
    empresaId: empresaId
  });
  const precio17 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante19.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3500,
    activo: true,
    empresaId: empresaId
  });
  const precio18 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante20.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 35950,
    activo: true,
    empresaId: empresaId
  });
  const precio19 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante21.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3500,
    activo: true,
    empresaId: empresaId
  });
  const precio20 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante22.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 17600,
    activo: true,
    empresaId: empresaId
  });
  const precio21 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante23.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4550,
    activo: true,
    empresaId: empresaId
  });
  const precio22 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante24.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 40500,
    activo: true,
    empresaId: empresaId
  });
  const precio23 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante25.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 8000,
    activo: true,
    empresaId: empresaId
  });
  const precio24 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante26.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 73500,
    activo: true,
    empresaId: empresaId
  });
  const precio25 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante27.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 20550,
    activo: true,
    empresaId: empresaId
  });
  const precio26 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante28.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5200,
    activo: true,
    empresaId: empresaId
  });
  const precio27 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante29.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5200,
    activo: true,
    empresaId: empresaId
  });
  const precio28 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante30.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5200,
    activo: true,
    empresaId: empresaId
  });
  const precio29 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante31.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2800,
    activo: true,
    empresaId: empresaId
  });
  const precio30 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante32.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3800,
    activo: true,
    empresaId: empresaId
  });
  const precio31 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante33.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2800,
    activo: true,
    empresaId: empresaId
  });
  const precio32 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante34.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12900,
    activo: true,
    empresaId: empresaId
  });
  const precio33 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante35.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3800,
    activo: true,
    empresaId: empresaId
  });
  const precio34 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante36.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2800,
    activo: true,
    empresaId: empresaId
  });
  const precio35 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante37.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12900,
    activo: true,
    empresaId: empresaId
  });
  const precio36 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante38.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3800,
    activo: true,
    empresaId: empresaId
  });
  const precio37 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante39.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2800,
    activo: true,
    empresaId: empresaId
  });
  const precio38 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante40.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 10200,
    activo: true,
    empresaId: empresaId
  });
  const precio39 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante41.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2800,
    activo: true,
    empresaId: empresaId
  });
  const precio40 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante42.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3800,
    activo: true,
    empresaId: empresaId
  });
  const precio41 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante43.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2800,
    activo: true,
    empresaId: empresaId
  });
  const precio42 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante44.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 14000,
    activo: true,
    empresaId: empresaId
  });
  const precio43 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante45.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4750,
    activo: true,
    empresaId: empresaId
  });
  const precio44 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante46.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 324500,
    activo: true,
    empresaId: empresaId
  });
  const precio45 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante47.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4750,
    activo: true,
    empresaId: empresaId
  });
  const precio46 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante48.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 324500,
    activo: true,
    empresaId: empresaId
  });
  const precio47 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante49.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4400,
    activo: true,
    empresaId: empresaId
  });
  const precio48 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante50.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 324500,
    activo: true,
    empresaId: empresaId
  });
  const precio49 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante51.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4750,
    activo: true,
    empresaId: empresaId
  });
  const precio50 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante53.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7650,
    activo: true,
    empresaId: empresaId
  });
  const precio51 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante54.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7650,
    activo: true,
    empresaId: empresaId
  });
  const precio52 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante55.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7650,
    activo: true,
    empresaId: empresaId
  });
  const precio53 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante56.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 300000,
    activo: true,
    empresaId: empresaId
  });
  const precio54 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante57.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 8650,
    activo: true,
    empresaId: empresaId
  });
  const precio55 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante58.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 215000,
    activo: true,
    empresaId: empresaId
  });
  const precio56 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante59.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6900,
    activo: true,
    empresaId: empresaId
  });
  const precio57 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante60.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 11650,
    activo: true,
    empresaId: empresaId
  });
  const precio58 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante61.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1600,
    activo: true,
    empresaId: empresaId
  });
  const precio59 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante62.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 24050,
    activo: true,
    empresaId: empresaId
  });
  const precio60 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante63.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6700,
    activo: true,
    empresaId: empresaId
  });
  const precio61 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante64.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 13500,
    activo: true,
    empresaId: empresaId
  });
  const precio62 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante65.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2900,
    activo: true,
    empresaId: empresaId
  });
  const precio63 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante66.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 27100,
    activo: true,
    empresaId: empresaId
  });
  const precio64 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante67.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 78000,
    activo: true,
    empresaId: empresaId
  });
  const precio65 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante68.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 83500,
    activo: true,
    empresaId: empresaId
  });
  const precio66 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante69.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 83500,
    activo: true,
    empresaId: empresaId
  });
  const precio67 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante70.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 71000,
    activo: true,
    empresaId: empresaId
  });
  const precio68 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante72.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 71000,
    activo: true,
    empresaId: empresaId
  });
  const precio69 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante75.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3400,
    activo: true,
    empresaId: empresaId
  });
  const precio70 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante76.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4900,
    activo: true,
    empresaId: empresaId
  });
  const precio71 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante77.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 21000,
    activo: true,
    empresaId: empresaId
  });
  const precio72 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante79.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1800,
    activo: true,
    empresaId: empresaId
  });
  const precio73 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante82.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1800,
    activo: true,
    empresaId: empresaId
  });
  const precio74 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante85.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5000,
    activo: true,
    empresaId: empresaId
  });
  const precio75 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante86.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5000,
    activo: true,
    empresaId: empresaId
  });
  const precio76 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante87.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5000,
    activo: true,
    empresaId: empresaId
  });
  const precio77 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante88.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5000,
    activo: true,
    empresaId: empresaId
  });
  const precio78 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante89.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 96000,
    activo: true,
    empresaId: empresaId
  });
  const precio79 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante90.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 55200,
    activo: true,
    empresaId: empresaId
  });
  const precio80 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante95.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 45000,
    activo: true,
    empresaId: empresaId
  });
  const precio81 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante96.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6200,
    activo: true,
    empresaId: empresaId
  });
  const precio82 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante97.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 10400,
    activo: true,
    empresaId: empresaId
  });
  const precio83 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante98.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2500,
    activo: true,
    empresaId: empresaId
  });
  const precio84 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante99.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 19100,
    activo: true,
    empresaId: empresaId
  });
  const precio85 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante100.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 44800,
    activo: true,
    empresaId: empresaId
  });
  const precio86 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante101.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5850,
    activo: true,
    empresaId: empresaId
  });
  const precio87 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante102.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 10100,
    activo: true,
    empresaId: empresaId
  });
  const precio88 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante103.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 18950,
    activo: true,
    empresaId: empresaId
  });
  const precio89 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante104.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 141900,
    activo: true,
    empresaId: empresaId
  });
  const precio90 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante105.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 32500,
    activo: true,
    empresaId: empresaId
  });
  const precio91 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante106.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7700,
    activo: true,
    empresaId: empresaId
  });
  const precio92 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante107.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 14000,
    activo: true,
    empresaId: empresaId
  });
  const precio93 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante108.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 49600,
    activo: true,
    empresaId: empresaId
  });
  const precio94 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante109.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 123000,
    activo: true,
    empresaId: empresaId
  });
  const precio95 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante110.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 15700,
    activo: true,
    empresaId: empresaId
  });
  const precio96 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante111.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 37700,
    activo: true,
    empresaId: empresaId
  });
  const precio97 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante112.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5950,
    activo: true,
    empresaId: empresaId
  });
  const precio98 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante113.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12850,
    activo: true,
    empresaId: empresaId
  });
  const precio99 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante114.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 109500,
    activo: true,
    empresaId: empresaId
  });
  const precio100 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante115.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2800,
    activo: true,
    empresaId: empresaId
  });
  const precio101 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante116.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 37700,
    activo: true,
    empresaId: empresaId
  });
  const precio102 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante117.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5950,
    activo: true,
    empresaId: empresaId
  });
  const precio103 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante118.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12850,
    activo: true,
    empresaId: empresaId
  });
  const precio104 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante119.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 109500,
    activo: true,
    empresaId: empresaId
  });
  const precio105 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante120.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2800,
    activo: true,
    empresaId: empresaId
  });
  const precio106 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante121.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 40500,
    activo: true,
    empresaId: empresaId
  });
  const precio107 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante122.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 40500,
    activo: true,
    empresaId: empresaId
  });
  const precio108 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante123.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 82600,
    activo: true,
    empresaId: empresaId
  });
  const precio109 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante124.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12200,
    activo: true,
    empresaId: empresaId
  });
  const precio110 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante125.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 49000,
    activo: true,
    empresaId: empresaId
  });
  const precio111 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante126.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 82600,
    activo: true,
    empresaId: empresaId
  });
  const precio112 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante127.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12200,
    activo: true,
    empresaId: empresaId
  });
  const precio113 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante128.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 49000,
    activo: true,
    empresaId: empresaId
  });
  const precio114 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante129.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 40500,
    activo: true,
    empresaId: empresaId
  });
  const precio115 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante130.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 82600,
    activo: true,
    empresaId: empresaId
  });
  const precio116 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante131.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12200,
    activo: true,
    empresaId: empresaId
  });
  const precio117 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante132.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 49000,
    activo: true,
    empresaId: empresaId
  });
  const precio118 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante134.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 26100,
    activo: true,
    empresaId: empresaId
  });
  const precio119 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante135.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 33050,
    activo: true,
    empresaId: empresaId
  });
  const precio120 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante136.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 53950,
    activo: true,
    empresaId: empresaId
  });
  const precio121 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante137.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6885,
    activo: true,
    empresaId: empresaId
  });
  const precio122 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante138.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 9550,
    activo: true,
    empresaId: empresaId
  });
  const precio123 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante139.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 49000,
    activo: true,
    empresaId: empresaId
  });
  const precio124 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante140.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 17400,
    activo: true,
    empresaId: empresaId
  });
  const precio125 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante142.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 26100,
    activo: true,
    empresaId: empresaId
  });
  const precio126 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante143.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 33050,
    activo: true,
    empresaId: empresaId
  });
  const precio127 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante144.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 53950,
    activo: true,
    empresaId: empresaId
  });
  const precio128 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante145.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 9000,
    activo: true,
    empresaId: empresaId
  });
  const precio129 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante146.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 9550,
    activo: true,
    empresaId: empresaId
  });
  const precio130 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante147.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 17400,
    activo: true,
    empresaId: empresaId
  });
  const precio131 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante149.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 26100,
    activo: true,
    empresaId: empresaId
  });
  const precio132 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante150.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 33050,
    activo: true,
    empresaId: empresaId
  });
  const precio133 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante151.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 53950,
    activo: true,
    empresaId: empresaId
  });
  const precio134 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante152.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 9000,
    activo: true,
    empresaId: empresaId
  });
  const precio135 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante153.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 9550,
    activo: true,
    empresaId: empresaId
  });
  const precio136 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante154.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 49000,
    activo: true,
    empresaId: empresaId
  });
  const precio137 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante155.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 17400,
    activo: true,
    empresaId: empresaId
  });
  const precio138 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante156.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 10300,
    activo: true,
    empresaId: empresaId
  });
  const precio139 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante157.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 8100,
    activo: true,
    empresaId: empresaId
  });
  const precio140 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante158.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 168421,
    activo: true,
    empresaId: empresaId
  });
  const precio141 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante172.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7050,
    activo: true,
    empresaId: empresaId
  });
  const precio142 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante173.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6900,
    activo: true,
    empresaId: empresaId
  });
  const precio143 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante177.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 25900,
    activo: true,
    empresaId: empresaId
  });
  const precio144 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante178.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 10000,
    activo: true,
    empresaId: empresaId
  });
  const precio145 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante179.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 215000,
    activo: true,
    empresaId: empresaId
  });
  const precio146 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante183.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6200,
    activo: true,
    empresaId: empresaId
  });
  const precio147 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante184.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 10400,
    activo: true,
    empresaId: empresaId
  });
  const precio148 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante185.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 19100,
    activo: true,
    empresaId: empresaId
  });
  const precio149 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante186.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 49000,
    activo: true,
    empresaId: empresaId
  });
  const precio150 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante187.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 20000,
    activo: true,
    empresaId: empresaId
  });
  const precio151 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante190.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 89000,
    activo: true,
    empresaId: empresaId
  });
  const precio152 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante191.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 89000,
    activo: true,
    empresaId: empresaId
  });
  const precio153 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante204.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 40600,
    activo: true,
    empresaId: empresaId
  });
  const precio154 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante205.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4600,
    activo: true,
    empresaId: empresaId
  });
  const precio155 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante206.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4600,
    activo: true,
    empresaId: empresaId
  });
  const precio156 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante207.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 40600,
    activo: true,
    empresaId: empresaId
  });
  const precio157 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante208.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 40600,
    activo: true,
    empresaId: empresaId
  });
  const precio158 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante209.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4600,
    activo: true,
    empresaId: empresaId
  });
  const precio159 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante210.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3750,
    activo: true,
    empresaId: empresaId
  });
  const precio160 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante211.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3750,
    activo: true,
    empresaId: empresaId
  });
  const precio161 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante212.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3750,
    activo: true,
    empresaId: empresaId
  });
  const precio162 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante213.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3750,
    activo: true,
    empresaId: empresaId
  });
  const precio163 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante214.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3750,
    activo: true,
    empresaId: empresaId
  });
  const precio164 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante215.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3750,
    activo: true,
    empresaId: empresaId
  });
  const precio165 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante216.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5100,
    activo: true,
    empresaId: empresaId
  });
  const precio166 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante217.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5100,
    activo: true,
    empresaId: empresaId
  });
  const precio167 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante218.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5100,
    activo: true,
    empresaId: empresaId
  });
  const precio168 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante219.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5850,
    activo: true,
    empresaId: empresaId
  });
  const precio169 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante220.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5850,
    activo: true,
    empresaId: empresaId
  });
  const precio170 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante221.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5850,
    activo: true,
    empresaId: empresaId
  });
  const precio171 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante222.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7000,
    activo: true,
    empresaId: empresaId
  });
  const precio172 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante223.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7000,
    activo: true,
    empresaId: empresaId
  });
  const precio173 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante224.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7000,
    activo: true,
    empresaId: empresaId
  });
  const precio174 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante225.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5550,
    activo: true,
    empresaId: empresaId
  });
  const precio175 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante226.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5550,
    activo: true,
    empresaId: empresaId
  });
  const precio176 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante227.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5550,
    activo: true,
    empresaId: empresaId
  });
  const precio177 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante228.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5550,
    activo: true,
    empresaId: empresaId
  });
  const precio178 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante229.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 38950,
    activo: true,
    empresaId: empresaId
  });
  const precio179 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante230.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 625,
    activo: true,
    empresaId: empresaId
  });
  const precio180 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante231.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 625,
    activo: true,
    empresaId: empresaId
  });
  const precio181 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante232.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 38950,
    activo: true,
    empresaId: empresaId
  });
  const precio182 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante233.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 24100,
    activo: true,
    empresaId: empresaId
  });
  const precio183 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante234.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 24100,
    activo: true,
    empresaId: empresaId
  });
  const precio184 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante238.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 14000,
    activo: true,
    empresaId: empresaId
  });
  const precio185 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante239.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 14000,
    activo: true,
    empresaId: empresaId
  });
  const precio186 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante240.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 14000,
    activo: true,
    empresaId: empresaId
  });
  const precio187 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante241.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 14000,
    activo: true,
    empresaId: empresaId
  });
  const precio188 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante242.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5550,
    activo: true,
    empresaId: empresaId
  });
  const precio189 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante243.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4750,
    activo: true,
    empresaId: empresaId
  });
  const precio190 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante252.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4050,
    activo: true,
    empresaId: empresaId
  });
  const precio191 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante253.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 8750,
    activo: true,
    empresaId: empresaId
  });
  const precio192 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante254.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4050,
    activo: true,
    empresaId: empresaId
  });
  const precio193 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante255.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 8750,
    activo: true,
    empresaId: empresaId
  });
  const precio194 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante256.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 16600,
    activo: true,
    empresaId: empresaId
  });
  const precio195 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante257.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 60800,
    activo: true,
    empresaId: empresaId
  });
  const precio196 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante258.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 60800,
    activo: true,
    empresaId: empresaId
  });
  const precio197 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante261.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7300,
    activo: true,
    empresaId: empresaId
  });
  const precio198 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante262.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7300,
    activo: true,
    empresaId: empresaId
  });
  const precio199 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante263.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7300,
    activo: true,
    empresaId: empresaId
  });
  const precio200 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante264.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 55800,
    activo: true,
    empresaId: empresaId
  });
  const precio201 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante265.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12300,
    activo: true,
    empresaId: empresaId
  });
  const precio202 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante266.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 34900,
    activo: true,
    empresaId: empresaId
  });
  const precio203 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante267.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 34900,
    activo: true,
    empresaId: empresaId
  });
  const precio204 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante268.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 16600,
    activo: true,
    empresaId: empresaId
  });
  const precio205 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante269.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4750,
    activo: true,
    empresaId: empresaId
  });
  const precio206 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante270.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 66200,
    activo: true,
    empresaId: empresaId
  });
  const precio207 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante271.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 150000,
    activo: true,
    empresaId: empresaId
  });
  const precio208 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante272.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 49700,
    activo: true,
    empresaId: empresaId
  });
  const precio209 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante273.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 40000,
    activo: true,
    empresaId: empresaId
  });
  const precio210 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante274.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5550,
    activo: true,
    empresaId: empresaId
  });
  const precio211 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante275.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5100,
    activo: true,
    empresaId: empresaId
  });
  const precio212 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante276.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5100,
    activo: true,
    empresaId: empresaId
  });
  const precio213 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante277.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5100,
    activo: true,
    empresaId: empresaId
  });
  const precio214 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante278.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 90300,
    activo: true,
    empresaId: empresaId
  });
  const precio215 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante279.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 158450,
    activo: true,
    empresaId: empresaId
  });
  const precio216 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante280.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 57200,
    activo: true,
    empresaId: empresaId
  });
  const precio217 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante281.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 69300,
    activo: true,
    empresaId: empresaId
  });
  const precio218 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante282.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 58750,
    activo: true,
    empresaId: empresaId
  });
  const precio219 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante283.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5550,
    activo: true,
    empresaId: empresaId
  });
  const precio220 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante285.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12000,
    activo: true,
    empresaId: empresaId
  });
  const precio221 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante286.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12000,
    activo: true,
    empresaId: empresaId
  });
  const precio222 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante287.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12000,
    activo: true,
    empresaId: empresaId
  });
  const precio223 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante288.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 12000,
    activo: true,
    empresaId: empresaId
  });
  const precio224 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante289.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3800,
    activo: true,
    empresaId: empresaId
  });
  const precio225 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante290.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3800,
    activo: true,
    empresaId: empresaId
  });
  const precio226 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante291.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3800,
    activo: true,
    empresaId: empresaId
  });
  const precio227 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante292.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7500,
    activo: true,
    empresaId: empresaId
  });
  const precio228 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante293.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 14700,
    activo: true,
    empresaId: empresaId
  });
  const precio229 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante294.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 14700,
    activo: true,
    empresaId: empresaId
  });
  const precio230 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante295.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 14700,
    activo: true,
    empresaId: empresaId
  });
  const precio231 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante297.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 94150,
    activo: true,
    empresaId: empresaId
  });

  //lista funcionario
  const precio232 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 1,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4470,
    activo: true,
    empresaId: empresaId
  });
  const precio233 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 2,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 9831,
    activo: true,
    empresaId: empresaId
  });
  const precio234 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 3,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2550,
    activo: true,
    empresaId: empresaId
  });
  const precio235 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 4,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 32033,
    activo: true,
    empresaId: empresaId
  });
  const precio236 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 5,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 57143,
    activo: true,
    empresaId: empresaId
  });
  const precio237 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 6,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5245,
    activo: true,
    empresaId: empresaId
  });
  const precio238 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 7,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4578,
    activo: true,
    empresaId: empresaId
  });
  const precio239 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 8,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 32000,
    activo: true,
    empresaId: empresaId
  });
  const precio240 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 9,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 15152,
    activo: true,
    empresaId: empresaId
  });
  const precio241 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 10,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 30345,
    activo: true,
    empresaId: empresaId
  });
  const precio242 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 11,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5342,
    activo: true,
    empresaId: empresaId
  });
  const precio243 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 12,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5342,
    activo: true,
    empresaId: empresaId
  });
  const precio244 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 13,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5342,
    activo: true,
    empresaId: empresaId
  });
  const precio245 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 14,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 9724,
    activo: true,
    empresaId: empresaId
  });
  const precio246 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 15,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 9724,
    activo: true,
    empresaId: empresaId
  });
  const precio247 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 16,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 15152,
    activo: true,
    empresaId: empresaId
  });
  const precio248 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 17,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 15152,
    activo: true,
    empresaId: empresaId
  });
  const precio249 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 18,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 18510,
    activo: true,
    empresaId: empresaId
  });
  const precio250 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 19,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 18510,
    activo: true,
    empresaId: empresaId
  });
  const precio251 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 20,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5034,
    activo: true,
    empresaId: empresaId
  });
  const precio252 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 21,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5034,
    activo: true,
    empresaId: empresaId
  });
  const precio253 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 22,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 30345,
    activo: true,
    empresaId: empresaId
  });
  const precio254 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 23,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 30345,
    activo: true,
    empresaId: empresaId
  });
  const precio255 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 24,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 27580,
    activo: true,
    empresaId: empresaId
  });
  const precio256 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 25,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 27580,
    activo: true,
    empresaId: empresaId
  });
  const precio257 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 26,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5034,
    activo: true,
    empresaId: empresaId
  });
  const precio258 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 27,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 11494,
    activo: true,
    empresaId: empresaId
  });
  const precio259 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 28,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 22701,
    activo: true,
    empresaId: empresaId
  });
  const precio260 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 29,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 225250,
    activo: true,
    empresaId: empresaId
  });
  const precio261 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 30,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 225250,
    activo: true,
    empresaId: empresaId
  });
  const precio262 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 31,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 225250,
    activo: true,
    empresaId: empresaId
  });
  const precio263 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 32,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2472,
    activo: true,
    empresaId: empresaId
  });
  const precio264 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 33,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1600,
    activo: true,
    empresaId: empresaId
  });
  const precio265 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 34,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3752,
    activo: true,
    empresaId: empresaId
  });
  const precio266 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 35,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1600,
    activo: true,
    empresaId: empresaId
  });
  const precio267 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 36,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3930,
    activo: true,
    empresaId: empresaId
  });
  const precio268 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 37,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6400,
    activo: true,
    empresaId: empresaId
  });
  const precio269 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 38,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 13241,
    activo: true,
    empresaId: empresaId
  });
  const precio270 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 39,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7700,
    activo: true,
    empresaId: empresaId
  });
  const precio271 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 40,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 15200,
    activo: true,
    empresaId: empresaId
  });
  const precio272 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 41,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 993,
    activo: true,
    empresaId: empresaId
  });
  const precio273 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 42,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 993,
    activo: true,
    empresaId: empresaId
  });
  const precio274 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 43,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1896,
    activo: true,
    empresaId: empresaId
  });
  const precio275 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 44,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 11756,
    activo: true,
    empresaId: empresaId
  });
  const precio276 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 45,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2745,
    activo: true,
    empresaId: empresaId
  });
  const precio277 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 46,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3840,
    activo: true,
    empresaId: empresaId
  });
  const precio278 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 47,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3962,
    activo: true,
    empresaId: empresaId
  });
  const precio279 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 48,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2167,
    activo: true,
    empresaId: empresaId
  });
  const precio280 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 49,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2167,
    activo: true,
    empresaId: empresaId
  });
  const precio281 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 50,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2167,
    activo: true,
    empresaId: empresaId
  });
  const precio282 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 51,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 20679,
    activo: true,
    empresaId: empresaId
  });
  const precio283 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 52,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 20679,
    activo: true,
    empresaId: empresaId
  });
  const precio284 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 53,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 22177,
    activo: true,
    empresaId: empresaId
  });
  const precio285 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 54,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 192000,
    activo: true,
    empresaId: empresaId
  });
  const precio286 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 55,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2097,
    activo: true,
    empresaId: empresaId
  });
  const precio287 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 56,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2097,
    activo: true,
    empresaId: empresaId
  });
  const precio288 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 57,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2097,
    activo: true,
    empresaId: empresaId
  });
  const precio289 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 58,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2097,
    activo: true,
    empresaId: empresaId
  });
  const precio290 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 59,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1545,
    activo: true,
    empresaId: empresaId
  });
  const precio291 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 60,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1545,
    activo: true,
    empresaId: empresaId
  });
  const precio292 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 61,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1545,
    activo: true,
    empresaId: empresaId
  });
  const precio293 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 62,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1545,
    activo: true,
    empresaId: empresaId
  });
  const precio294 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 63,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1545,
    activo: true,
    empresaId: empresaId
  });
  const precio295 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 64,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1545,
    activo: true,
    empresaId: empresaId
  });
  const precio296 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 65,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4450,
    activo: true,
    empresaId: empresaId
  });
  const precio297 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 66,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4450,
    activo: true,
    empresaId: empresaId
  });
  const precio298 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 67,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4450,
    activo: true,
    empresaId: empresaId
  });
  const precio299 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 68,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 207000,
    activo: true,
    empresaId: empresaId
  });
  const precio300 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 69,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 41000,
    activo: true,
    empresaId: empresaId
  });
  const precio301 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 70,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 41000,
    activo: true,
    empresaId: empresaId
  });
  const precio302 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 71,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 67000,
    activo: true,
    empresaId: empresaId
  });
  const precio303 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 72,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7200,
    activo: true,
    empresaId: empresaId
  });
  const precio304 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 73,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 67000,
    activo: true,
    empresaId: empresaId
  });
  const precio305 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 74,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3320,
    activo: true,
    empresaId: empresaId
  });
  const precio306 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 75,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1570,
    activo: true,
    empresaId: empresaId
  });
  const precio307 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 76,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3320,
    activo: true,
    empresaId: empresaId
  });
  const precio308 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 77,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 21875,
    activo: true,
    empresaId: empresaId
  });
  const precio309 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 78,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7200,
    activo: true,
    empresaId: empresaId
  });
  const precio310 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 79,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 21875,
    activo: true,
    empresaId: empresaId
  });
  const precio311 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 80,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1570,
    activo: true,
    empresaId: empresaId
  });
  const precio312 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 81,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 83000,
    activo: true,
    empresaId: empresaId
  });
  const precio313 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 82,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 1329,
    activo: true,
    empresaId: empresaId
  });
  const precio314 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 83,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3408,
    activo: true,
    empresaId: empresaId
  });
  const precio315 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 84,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5707,
    activo: true,
    empresaId: empresaId
  });
  const precio316 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 85,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 10881,
    activo: true,
    empresaId: empresaId
  });
  const precio317 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 86,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3408,
    activo: true,
    empresaId: empresaId
  });
  const precio318 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 87,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5707,
    activo: true,
    empresaId: empresaId
  });
  const precio319 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 88,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 10881,
    activo: true,
    empresaId: empresaId
  });
  const precio320 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 89,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 27580,
    activo: true,
    empresaId: empresaId
  });
  const precio321 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 90,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 27580,
    activo: true,
    empresaId: empresaId
  });
  const precio322 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 91,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 27580,
    activo: true,
    empresaId: empresaId
  });
  const precio323 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 92,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6826,
    activo: true,
    empresaId: empresaId
  });
  const precio324 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 93,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6826,
    activo: true,
    empresaId: empresaId
  });
  const precio325 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 94,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6826,
    activo: true,
    empresaId: empresaId
  });
  const precio326 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 95,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 27800,
    activo: true,
    empresaId: empresaId
  });
  const precio327 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 96,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 69400,
    activo: true,
    empresaId: empresaId
  });
  const precio328 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 97,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7110,
    activo: true,
    empresaId: empresaId
  });
  const precio329 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 98,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7810,
    activo: true,
    empresaId: empresaId
  });
  const precio330 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 99,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3145,
    activo: true,
    empresaId: empresaId
  });
  const precio331 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 100,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7810,
    activo: true,
    empresaId: empresaId
  });
  const precio332 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 101,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2794,
    activo: true,
    empresaId: empresaId
  });
  const precio333 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 102,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2794,
    activo: true,
    empresaId: empresaId
  });
  const precio334 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 103,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2794,
    activo: true,
    empresaId: empresaId
  });
  const precio335 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 104,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2794,
    activo: true,
    empresaId: empresaId
  });
  const precio336 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 105,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 25750,
    activo: true,
    empresaId: empresaId
  });
  const precio337 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 106,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 9724,
    activo: true,
    empresaId: empresaId
  });
  const precio338 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 107,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 22989,
    activo: true,
    empresaId: empresaId
  });
  const precio339 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 108,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 22989,
    activo: true,
    empresaId: empresaId
  });
  const precio340 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 109,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 22989,
    activo: true,
    empresaId: empresaId
  });
  const precio341 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 110,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 46297,
    activo: true,
    empresaId: empresaId
  });
  const precio342 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 111,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 46297,
    activo: true,
    empresaId: empresaId
  });
  const precio343 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 112,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 46297,
    activo: true,
    empresaId: empresaId
  });
  const precio344 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 113,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 52900,
    activo: true,
    empresaId: empresaId
  });
  const precio345 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 114,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 52900,
    activo: true,
    empresaId: empresaId
  });
  const precio346 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 115,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2900,
    activo: true,
    empresaId: empresaId
  });
  const precio347 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 116,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2900,
    activo: true,
    empresaId: empresaId
  });
  const precio348 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 117,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2900,
    activo: true,
    empresaId: empresaId
  });
  const precio349 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 118,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 8780,
    activo: true,
    empresaId: empresaId
  });
  const precio350 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 119,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 27580,
    activo: true,
    empresaId: empresaId
  });
  const precio351 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 120,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 18510,
    activo: true,
    empresaId: empresaId
  });
  const precio352 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 121,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 49720,
    activo: true,
    empresaId: empresaId
  });
  const precio353 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 122,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 49720,
    activo: true,
    empresaId: empresaId
  });
  const precio354 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 123,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 11036,
    activo: true,
    empresaId: empresaId
  });
  const precio355 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 124,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 46430,
    activo: true,
    empresaId: empresaId
  });
  const precio356 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 125,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 41021,
    activo: true,
    empresaId: empresaId
  });
  const precio357 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 126,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3940,
    activo: true,
    empresaId: empresaId
  });
  const precio358 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 127,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3940,
    activo: true,
    empresaId: empresaId
  });
  const precio359 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 128,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3940,
    activo: true,
    empresaId: empresaId
  });
  const precio360 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 129,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2184,
    activo: true,
    empresaId: empresaId
  });
  const precio361 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 130,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2184,
    activo: true,
    empresaId: empresaId
  });
  const precio362 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 131,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2184,
    activo: true,
    empresaId: empresaId
  });
  const precio363 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 132,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3100,
    activo: true,
    empresaId: empresaId
  });
  const precio364 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 133,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3100,
    activo: true,
    empresaId: empresaId
  });
  const precio365 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 134,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3100,
    activo: true,
    empresaId: empresaId
  });
  const precio366 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 135,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3100,
    activo: true,
    empresaId: empresaId
  });
  const precio367 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 136,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 38840,
    activo: true,
    empresaId: empresaId
  });
  const precio368 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 137,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2813,
    activo: true,
    empresaId: empresaId
  });
  const precio369 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 138,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2813,
    activo: true,
    empresaId: empresaId
  });
  const precio370 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 139,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2813,
    activo: true,
    empresaId: empresaId
  });
  const precio371 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 140,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 25200,
    activo: true,
    empresaId: empresaId
  });
  const precio372 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 141,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 25200,
    activo: true,
    empresaId: empresaId
  });
  const precio373 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 142,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 25200,
    activo: true,
    empresaId: empresaId
  });
  const precio374 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 143,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2100,
    activo: true,
    empresaId: empresaId
  });
  const precio375 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 144,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2100,
    activo: true,
    empresaId: empresaId
  });
  const precio376 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 145,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2840,
    activo: true,
    empresaId: empresaId
  });
  const precio377 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 146,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2840,
    activo: true,
    empresaId: empresaId
  });
  const precio378 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 147,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6900,
    activo: true,
    empresaId: empresaId
  });
  const precio379 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 148,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 32060,
    activo: true,
    empresaId: empresaId
  });
  const precio380 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 149,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2100,
    activo: true,
    empresaId: empresaId
  });
  const precio381 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 150,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2100,
    activo: true,
    empresaId: empresaId
  });
  const precio382 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 151,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2840,
    activo: true,
    empresaId: empresaId
  });
  const precio383 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 152,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2840,
    activo: true,
    empresaId: empresaId
  });
  const precio384 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 153,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6900,
    activo: true,
    empresaId: empresaId
  });
  const precio385 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 154,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6900,
    activo: true,
    empresaId: empresaId
  });
  const precio386 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 155,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6900,
    activo: true,
    empresaId: empresaId
  });
  const precio387 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 156,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 6900,
    activo: true,
    empresaId: empresaId
  });
  const precio388 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 157,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 32060,
    activo: true,
    empresaId: empresaId
  });
  const precio389 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 158,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 32060,
    activo: true,
    empresaId: empresaId
  });
  const precio390 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 159,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 32060,
    activo: true,
    empresaId: empresaId
  });
  const precio391 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 160,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 32060,
    activo: true,
    empresaId: empresaId
  });
  const precio392 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 161,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3260,
    activo: true,
    empresaId: empresaId
  });
  const precio393 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 162,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 5640,
    activo: true,
    empresaId: empresaId
  });
  const precio394 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 163,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 10630,
    activo: true,
    empresaId: empresaId
  });
  const precio395 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 164,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4310,
    activo: true,
    empresaId: empresaId
  });
  const precio396 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 165,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7850,
    activo: true,
    empresaId: empresaId
  });
  const precio397 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 166,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 18200,
    activo: true,
    empresaId: empresaId
  });
  const precio398 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 167,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 25100,
    activo: true,
    empresaId: empresaId
  });
  const precio399 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 168,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3400,
    activo: true,
    empresaId: empresaId
  });
  const precio400 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 169,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3400,
    activo: true,
    empresaId: empresaId
  });
  const precio401 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 170,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3400,
    activo: true,
    empresaId: empresaId
  });
  const precio402 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 171,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 133424,
    activo: true,
    empresaId: empresaId
  });
  const precio403 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 172,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 13506,
    activo: true,
    empresaId: empresaId
  });
  const precio404 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 173,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 13506,
    activo: true,
    empresaId: empresaId
  });
  const precio405 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 174,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 21900,
    activo: true,
    empresaId: empresaId
  });
  const precio406 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 175,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 21900,
    activo: true,
    empresaId: empresaId
  });
  const precio407 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 176,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2100,
    activo: true,
    empresaId: empresaId
  });
  const precio408 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 177,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2100,
    activo: true,
    empresaId: empresaId
  });
  const precio409 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 178,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2840,
    activo: true,
    empresaId: empresaId
  });
  const precio410 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 179,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2840,
    activo: true,
    empresaId: empresaId
  });
  const precio411 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 180,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 133424,
    activo: true,
    empresaId: empresaId
  });
  const precio412 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 181,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4055,
    activo: true,
    empresaId: empresaId
  });
  const precio413 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 182,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4055,
    activo: true,
    empresaId: empresaId
  });
  const precio414 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 183,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7810,
    activo: true,
    empresaId: empresaId
  });
  const precio415 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 184,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7810,
    activo: true,
    empresaId: empresaId
  });
  const precio416 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 185,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7810,
    activo: true,
    empresaId: empresaId
  });
  const precio417 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 186,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 7810,
    activo: true,
    empresaId: empresaId
  });
  const precio418 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 187,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4055,
    activo: true,
    empresaId: empresaId
  });
  const precio419 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 188,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3470,
    activo: true,
    empresaId: empresaId
  });
  const precio420 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 189,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3470,
    activo: true,
    empresaId: empresaId
  });
  const precio421 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 190,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 34500,
    activo: true,
    empresaId: empresaId
  });
  const precio422 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 191,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 34500,
    activo: true,
    empresaId: empresaId
  });
  const precio423 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 192,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 3100,
    activo: true,
    empresaId: empresaId
  });
  const precio424 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 193,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2700,
    activo: true,
    empresaId: empresaId
  });
  const precio425 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 194,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2700,
    activo: true,
    empresaId: empresaId
  });
  const precio426 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 195,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2700,
    activo: true,
    empresaId: empresaId
  });
  const precio427 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 196,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2700,
    activo: true,
    empresaId: empresaId
  });
  const precio428 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 197,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 2700,
    activo: true,
    empresaId: empresaId
  });
  const precio429 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 198,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4885,
    activo: true,
    empresaId: empresaId
  });
  const precio430 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 199,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 4885,
    activo: true,
    empresaId: empresaId
  });
  const precio431 = await Valoracion.create({
    listaPrecioId: listaPrecio2.id,
    varianteId: 200,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "PRECIO",
    tipo: "IMPORTE",
    valor: 9300,
    activo: true,
    empresaId: empresaId
  });

  const descImporte1 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,

    cantDesde: 20000,
    cantHasta: 50000,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "DESCUENTO",
    tipo: "IMPORTE",
    valor: 10,
    activo: true,
    empresaId: empresaId
  });
  const descImporte2 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    cantDesde: 50001,
    cantHasta: 300000,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "DESCUENTO",
    tipo: "IMPORTE",
    valor: 15,
    activo: true,
    empresaId: empresaId
  });
  const descImporte3 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    cantDesde: 300001,
    cantHasta: 500000,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "DESCUENTO",
    tipo: "IMPORTE",
    valor: 20,
    activo: true,
    empresaId: empresaId
  });
  const descImporte4 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    cantDesde: 500001,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "9999-12-31",
    registro: "DESCUENTO",
    tipo: "IMPORTE",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });

  const descuento02 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante4.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento03 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante5.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento01 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante3.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento04 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante6.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento05 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante7.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento06 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante8.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento07 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante9.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento08 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante10.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento09 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante11.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento10 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante12.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento11 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante13.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento12 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante14.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento13 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante15.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento14 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante16.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento15 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante17.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento16 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante18.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento17 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante19.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento18 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante20.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento19 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante21.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento20 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante22.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento21 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante23.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento22 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante24.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento23 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante25.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento24 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante26.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento25 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante27.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento26 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante28.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento27 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante29.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento28 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante30.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento29 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante31.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento30 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante32.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento31 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante33.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento32 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante34.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento33 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante35.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento34 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante36.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento35 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante37.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento36 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante38.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento37 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante39.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento38 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante40.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento39 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante41.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento40 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante42.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento41 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante43.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento42 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante44.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento43 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante45.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento44 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante46.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento45 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante47.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento46 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante48.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento47 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante49.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento48 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante50.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento49 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante51.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento50 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante53.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento51 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante54.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento52 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante55.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento53 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante56.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento54 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante57.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento55 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante58.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento56 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante59.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento57 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante60.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento58 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante61.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento59 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante62.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento60 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante63.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento61 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante64.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento62 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante65.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento63 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante66.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento64 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante67.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento65 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante68.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento66 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante69.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento67 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante70.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento68 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante72.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento69 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante75.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento70 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante76.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento71 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante77.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento72 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante79.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento73 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante82.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento74 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante85.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento75 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante86.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento76 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante87.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento77 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante88.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento78 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante89.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento79 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante90.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento80 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante95.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento81 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante96.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento82 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante97.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento83 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante98.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento84 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante99.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento85 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante100.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento86 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante101.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento87 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante102.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento88 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante103.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento89 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante104.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento90 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante105.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento91 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante106.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento92 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante107.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento93 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante108.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento94 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante109.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento95 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante110.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento96 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante111.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento97 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante112.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento98 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante113.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento99 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante114.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento100 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante115.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento101 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante116.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento102 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante117.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento103 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante118.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento104 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante119.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento105 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante120.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento106 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante121.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento107 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante122.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento108 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante123.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento109 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante124.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento110 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante125.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento111 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante126.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento112 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante127.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento113 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante128.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento114 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante129.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento115 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante130.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento116 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante131.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento117 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante132.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento118 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante134.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento119 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante135.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento120 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante136.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento121 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante137.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento122 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante138.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento123 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante139.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento124 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante140.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento125 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante142.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento126 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante143.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento127 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante144.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento128 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante145.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento129 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante146.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento130 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante147.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento131 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante149.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento132 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante150.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento133 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante151.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento134 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante152.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento135 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante153.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento136 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante154.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento137 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante155.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento138 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante156.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento139 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante157.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento140 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante158.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento141 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante172.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento142 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante173.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento143 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante177.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento144 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante178.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento145 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante179.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento146 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante183.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento147 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante184.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento148 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante185.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento149 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante186.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento150 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante187.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento151 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante190.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento152 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante191.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento153 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante204.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento154 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante205.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento155 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante206.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento156 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante207.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento157 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante208.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento158 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante209.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento159 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante210.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento160 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante211.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento161 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante212.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento162 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante213.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento163 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante214.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento164 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante215.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento165 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante216.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento166 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante217.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento167 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante218.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento168 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante219.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento169 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante220.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento170 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante221.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento171 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante222.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento172 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante223.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento173 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante224.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento174 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante225.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento175 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante226.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento176 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante227.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento177 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante228.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento178 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante229.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento179 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante230.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento180 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante231.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento181 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante232.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento182 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante233.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento183 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante234.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento184 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante238.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento185 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante239.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento186 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante240.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento187 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante241.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento188 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante242.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento189 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante243.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento190 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante252.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento191 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante253.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento192 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante254.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento193 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante255.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento194 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante256.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento195 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante257.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento196 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante258.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento197 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante261.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento198 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante262.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento199 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante263.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento200 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante264.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento201 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante265.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento202 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante266.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento203 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante267.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento204 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante268.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento205 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante269.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento206 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante270.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento207 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante271.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento208 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante272.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento209 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante273.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento210 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante274.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento211 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante275.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento212 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante276.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento213 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante277.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento214 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante278.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento215 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante279.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento216 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante280.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento217 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante281.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento218 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante282.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento219 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante283.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento220 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante285.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento221 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante286.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento222 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante287.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento223 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante288.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento224 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante289.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento225 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante290.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento226 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante291.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento227 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante292.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento228 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante293.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento229 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante294.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento230 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante295.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  const descuento231 = await Valoracion.create({
    listaPrecioId: listaPrecio.id,
    varianteId: variante297.id,
    cantDesde: 1,
    cantHasta: 999999999,
    fechaDesde: "2023-12-31",
    fechaHasta: "2024-06-01",
    registro: "DESCUENTO",
    tipo: "PRODUCTO",
    valor: 25,
    activo: true,
    empresaId: empresaId
  });
  let sucursalClientes ={}
   for (const c of clienteCavallaroJson) {
const clienteNuevo = await Cliente.create({
        empresaId:  empresaId, 
        tipoOperacionId: 1,
        nroDocumento: c.doc_nro, 
        razonSocial: c.razon_social.toUpperCase(),
        email: c.email || '', // asegurate de manejar nulls
        excentoIva: false,
        puntos: 0,
        naturalezaReceptor: 1,
        codigoPais: "PRY",
        tipoContribuyente: 2,
        activo: true,
        predeterminado:c.predeterminado,
        propietario:c.propietario
        // puedes incluir usuarioCreacionId, etc. si lo tenés
      });

      sucursalClientes[c.cod_cliente]=  await ClienteSucursal.create({
        clienteId: clienteNuevo.id,
        empresaId:  empresaId, 
        nombre: c.razon_social.toUpperCase(),
        direccion: c.direccion?.toUpperCase(),
        telefono: c.telefono,
        email: c.email || '',
        latitud: c.latitud,
        longitud: c.longitud,
        principal: true,
        activo: true,
        listaPrecioId: listaPrecio.id,
        condicionPagoId: condicionPago.id,
        codigoPais: "PRY",
        // puedes incluir usuarioCreacionId, etc. si lo tenés
      });
   
    }
};
module.exports = { migrateCavallaroDB };
