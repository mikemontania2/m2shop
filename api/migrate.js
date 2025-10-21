const Bcryptjs = require("bcryptjs");
const Usuario = require("./src/models/usuario.model"); 
const Empresa = require("./src/models/empresa.model");
const Sucursal = require("./src/models/sucursal.model"); 
const Marca = require("./src/models/marca.model");
const Categoria = require("./src/models/categoria.model");
const SubCategoria = require("./src/models/subCategoria.model");
const Variedad = require("./src/models/variedad.model");
const Presentacion = require("./src/models/presentacion.model");
const Producto = require("./src/models/producto.model");
const ListaPrecio = require("./src/models/listaPrecio.model");
const Valoracion = require("./src/models/valoracion.model");
const CondicionPago = require("./src/models/condicionPago.model");
const Numeracion = require("./src/models/numeracion.model");
const {empresaJson  } = require("./src/json/01empresa.json");
const {bancosJson  } = require("./src/json/02bancos.json");
const { mediosPagoJson  } = require("./src/json/03mediosPago.json");
const { unidadesJson  } = require("./src/json/04unidades.json");
const fs = require("fs");
 
const { sucursaleBiggieJSON  } = require("./src/json/SucursalesBiggie.json");
const Certificado = require("./src/models/certificado.model");

const {
  encryptPassphrase,
  decryptPassphrase
} = require("./src/helpers/encript-helper");



const { variantesStore } = require("./src/json/hugostore.json");
const { preciosStore } = require("./src/json/precioHugoStore.json");
const { clienteJson } = require("./src/json/clientesMigracion.json");
const Actividad = require("./src/models/actividad.model");
const EmpresaActividad = require("./src/models/empresaActividad.model"); 
const Cobranza = require("./src/models/cobranza.model");
const CobranzaDetalle = require("./src/models/cobranzaDetalle.model");
const {
  generarCodigoSeguridad,
  generarCDC
} = require("./src/helpers/cdc-helper");
const {
  tipoContribuyente,
  tiposEmisiones
} = require("./src/constantes/Constante.constant");
const Cliente = require("./src/models/cliente.model");
const DocumentoDetalle = require("./src/models/documentoDetalle.model");
const Variante = require("./src/models/variante.model");
const Documento = require("./src/models/documento.model");
const { crearCreditoDesdeDocumento } = require("./src/controllers/credito-controller");
const Banco = require("./src/models/banco.model");
const MedioPago = require("./src/models/medioPago.model");
const Unidad = require("./src/models/unidad.model"); 
const ClienteSucursal = require("./src/models/ClienteSucursal.model");
const { migrateCavallaroDB } = require("./migrateCavallaro");

const migrateDB = async ( facturaId ,notaCreditoId) => { 
  
    // Crear empresa ******************************//////////
    let empresas ={}
    for (const emp of empresaJson) {
      const { actividades, ...datosEmpresa } = emp;

     empresas[emp.codEmpresa] = await Empresa.create(datosEmpresa);

      for (const actividadData of actividades) {
        const actividad = await Actividad.create(actividadData);

        await EmpresaActividad.create({
          empresaId:  empresas[emp.codEmpresa].id,
          actividadId: actividad.id
        });
      }
      
    }


      const encriptado = encryptPassphrase("De0FOa3?");
       const certificado = await Certificado.create({
         empresaId: empresas[9].id,
         path: "F1T_44102.p12",
         passphrase: encriptado,
         validoDesde: "2025-04-29",
         validoHasta: "2026-04-29",
         activo: true
       }); 

        
   /***********************************************************************/
 //*********BANCOS***************/
 for (const descripcion of bancosJson) {
  await Banco.create({
    descripcion,
    activo: true,
    empresaId: empresas[6].id,
  });

  await Banco.create({
    descripcion,
    activo: true,
    empresaId: empresas[8].id,
  });

   await Banco.create({
    descripcion,
    activo: true,
    empresaId: empresas[9].id,
  });
}

/***************SUCURSAL******************************* */
    const sucursal9 = await Sucursal.create({
      descripcion: "Luque",
      direccion: "RUTA 1",
      cel: "+595976753428",
      empresaId: empresas[6].id,
      email: "vj.healthyfoods@gmail.com"
    });
 
    const sucursal12 = await Sucursal.create({
      descripcion: "Capiata",
      direccion: "SAN ANTONIO",
      cel: "+595984044028",
      empresaId: empresas[8].id,
      email: "compraya.pystore@gmail.com"
    });
  
 
     
    for (const medio of mediosPagoJson) {
      await MedioPago.create({
        ...medio,
        empresaId:empresas[6].id
      });
      await MedioPago.create({
        ...medio,
        empresaId:empresas[8].id
      });
      await MedioPago.create({
        ...medio,
        empresaId:empresas[9].id
      });

    }

/******************Numeraciones********************* */

 const numeracion1 = await Numeracion.create({
      empresaId: empresas[6].id,
      sucursalId: sucursal9.id,
      inicioTimbrado: "2025-03-31",
      finTimbrado: "2026-03-31",
      itide: facturaId,
      numeroInicio: 1,
      numeroFin: 15000,
      serie: "001-003",
      timbrado: "17934068",
      ultimoNumero: 145,
      tipoComprobante: "FACTURA",
      tipoImpresion: "FACTURA",
      activo: true
    });

    const numeracion2 = await Numeracion.create({
      empresaId: empresas[6].id,
      sucursalId: sucursal9.id,
      inicioTimbrado: "2023-01-01",
      finTimbrado: "2025-03-28",
      itide: facturaId,
      numeroInicio: 1,
      numeroFin: 9999,
      serie: "001-002",
      timbrado: "0000001",
      ultimoNumero: 195,
      tipoComprobante: "FACTURA",
      tipoImpresion: "FACTURA",
      activo: true
    });
    const numeracion3 = await Numeracion.create({
      empresaId: empresas[6].id,
      sucursalId: sucursal9.id,
      inicioTimbrado: "2025-03-31",
      finTimbrado: "2026-03-31",
      itide: notaCreditoId,
      numeroInicio: 1,
      numeroFin: 15000,
      serie: "001-003",
      timbrado: "17934068",
      ultimoNumero: 0,
      tipoComprobante: "NOTACREDITO",
      tipoImpresion: "FACTURA",
      activo: true
    });

    const numeracion4 = await Numeracion.create({
      empresaId: empresas[8].id,
      sucursalId: sucursal12.id,
      inicioTimbrado: "2025-01-29",
      finTimbrado: "2026-01-31",
      itide: facturaId,
      numeroInicio: 1,
      numeroFin: 6000,
      serie: "001-002",
      timbrado: "17788861",
      ultimoNumero: 0,
      tipoComprobante: "FACTURA",
      tipoImpresion: "FACTURA",
      activo: true
    });
    const numeracion5 = await Numeracion.create({
      empresaId: empresas[8].id,
      sucursalId: sucursal12.id,
      inicioTimbrado: "2025-01-29",
      finTimbrado: "2026-01-31",
      itide: notaCreditoId,
      numeroInicio: 1,
      numeroFin: 6000,
      serie: "001-002",
      timbrado: "17788861",
      ultimoNumero: 0,
      tipoComprobante: "FACTURA",
      tipoImpresion: "FACTURA",
      activo: true
    });

  
    // Crear usuario asociado a la empresa y sucursal
    const salt = Bcryptjs.genSaltSync();
    const userEmpresa2 = await Usuario.create({
      empresaId: empresas[8].id,
      sucursalId: sucursal12.id,
      numPrefId: numeracion4.id,
      numNcPrefId: numeracion5.id,
      username: "hugo.godoy@compraya.com.py",
      usuario: "Hugo Godoy",
      password: Bcryptjs.hashSync("123456", salt),
      img: "491c8bd8-7343-4cac-99ff-d0bb0e70d1e8.jpg",
      rol: "admin", // Puedes ajustar el rol según tus necesidades
      intentos: 0,
      activo: true,
      bloqueado: false
    });

    const vendeCapiata =await Usuario.create({
      empresaId: empresas[8].id,
      sucursalId: sucursal12.id,
      numPrefId: numeracion4.id,
      numNcPrefId: numeracion5.id,
      username: "supervisor@mobile.com.py",
      usuario: "Supervisor",
      password: Bcryptjs.hashSync("123456", salt),
      img: "491c8bd8-7343-4cac-99ff-d0bb0e70d1e8.jpg",
      rol: "admin", // Puedes ajustar el rol según tus necesidades
      intentos: 0,
      activo: true,
      bloqueado: false
    });

    const userAdmin = await Usuario.create({
      empresaId: empresas[6].id,
      sucursalId: sucursal9.id,
      numPrefId: numeracion1.id,
      numNcPrefId: numeracion3.id,
      username: "javiercavallaro@hf.com",
      usuario: "javier cavallaro",
      password: Bcryptjs.hashSync("123456", salt),
      img: "98fe0d49-1d51-455e-be2b-b06abb001332.jpg",
      rol: "admin", // Puedes ajustar el rol según tus necesidades
      intentos: 0,
      activo: true,
      bloqueado: false
    });

    const vendedorCapiata = await Usuario.create({
      empresaId: empresas[6].id,
      sucursalId: sucursal9.id,
      numPrefId: numeracion1.id,
      username: "capiata@vj.com",
      usuario: "Capiata",
      password: Bcryptjs.hashSync("123456", salt),
      img: "9634534584325567563.png",
      rol: "vendedor", // Puedes ajustar el rol según tus necesidades
      intentos: 0,
      activo: true,
      bloqueado: false
    });
 
 //****************Unidades**************** */

let unidad6 ={}
let unidad8 ={}
    for (const unidad of unidadesJson) {
    const u6 =  await Unidad.create({
        code: unidad.code,
        descripcion: unidad.descripcion,
        empresaId:  empresas[6].id,
        activo: true
      });
      const u8 = await Unidad.create({
        code: unidad.code,
        descripcion: unidad.descripcion,
        empresaId: empresas[8].id,
        activo: true
      });
       
      if (unidad.code == 'code') {
        unidad6 = u6;
        unidad8 = u8;
         
      }
    }



const categoria1 = await Categoria.create({
      descripcion: "Alimentos Saludables",
      activo: true,
      empresaId:  empresas[6].id,
    });

    const subCategoria25 = await SubCategoria.create({
      descripcion: "POSTRES",
      categoriaId: categoria1.id,
      activo: true,
      empresaId: empresas[6].id,
    });

    const subCategoria26 = await SubCategoria.create({
      descripcion: "SALADOS",
      categoriaId: categoria1.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const subCategoria27 = await SubCategoria.create({
      descripcion: "LACTEOS",
      categoriaId: categoria1.id,
      activo: true,
      empresaId:  empresas[6].id,
    });
    const subCategoria28 = await SubCategoria.create({
      descripcion: "OTROS",
      categoriaId: categoria1.id,
      activo: true,
      empresaId:  empresas[6].id,
    });
 
    
    const marca0 = await Marca.create({
      descripcion: "HF",
      activo: true,
      empresaId:  empresas[6].id,
    });
    const marca1 = await Marca.create({
      descripcion: "Don Ignacio",
      activo: true,
      empresaId:  empresas[6].id,
    });

    const marca2 = await Marca.create({
      descripcion: "Royal Bee",
      activo: true,
      empresaId:  empresas[6].id,
    });


    const categoria99 = await Categoria.create({
      descripcion: "categoria",
      activo: true,
      empresaId:  empresas[8].id,
    });

    const subCategoria99 = await SubCategoria.create({
      descripcion: "subcategoria",
      categoriaId: categoria99.id,
      activo: true,
      empresaId:  empresas[8].id,
    });
 

    const marca0000 = await Marca.create({
      descripcion: "HG",
      activo: true,
      empresaId:  empresas[8].id,
    });

  /****************** */

    const producto1 = await Producto.create({
      nombre: "YOGURTH GRIEGO SD",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria25.id,
      marcaId: marca1.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto2 = await Producto.create({
      nombre: "SERVICIO",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria28.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto3 = await Producto.create({
      nombre: "PROMO",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria26.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto4 = await Producto.create({
      nombre: "PANETTONE KETO",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria25.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto5 = await Producto.create({
      nombre: "PAN KETO",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria28.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto6 = await Producto.create({
      nombre: "MIX FRUTOS SECOS",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria25.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto7 = await Producto.create({
      nombre: "MINI BUDIN KETO",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria25.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto8 = await Producto.create({
      nombre: "MIEL DE ABEJA MULTIFLORAL",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria28.id,
      marcaId: marca2.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto9 = await Producto.create({
      nombre: "MERMELADA",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria25.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto10 = await Producto.create({
      nombre: "HEESECAKE DE FRUTOS",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria25.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto11 = await Producto.create({
      nombre: "Frutos secos ",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria28.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto12 = await Producto.create({
      nombre: "DEVOLUCION ",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria28.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto13 = await Producto.create({
      nombre: "CONSERVADORA",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria28.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto14 = await Producto.create({
      nombre: "CHIPITA KETO ",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria26.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto15 = await Producto.create({
      nombre: "BROWNIE",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria25.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    const producto16 = await Producto.create({
      nombre: "BOX SAN VALENTIN",
      descripcion: "",
      categoriaId: categoria1.id,
      subCategoriaId: subCategoria26.id,
      marcaId: marca0.id,
      activo: true,
      empresaId: empresas[6].id,
    });

    const variedad1 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "VAINILLA"
    });
    const variedad2 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "SOBR"
    });
    const variedad3 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "SERVICIO PRESTADOS"
    });
    const variedad4 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "SERVICIO DE DELIVERY 2"
    });
    const variedad5 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "SERVICIO DE DELIVERY"
    });
    const variedad6 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "ROJOS  SIN GLUTEN"
    });
    const variedad7 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "PREMIUM"
    });
    const variedad8 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "PAQ."
    });
    const variedad9 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "NATURAL"
    });
    const variedad10 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "NARANJA"
    });
    const variedad11 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "MINI BUDIN KETO ARANDANOS "
    });
    const variedad12 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "MEDIANA"
    });
    const variedad13 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "MANI"
    });
    const variedad14 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "LIMON"
    });
    const variedad15 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "JUGO-YOGURTH-MUFFINS-PANQUEQUES-TOSTADAS"
    });
    const variedad16 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "GASTOS ENVIOS AL INTERIOR(CONSERVADORA/OTROS)"
    });
    const variedad17 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "FRUTOS SECOS Y CHOCOLATE   SIN GLUTEN "
    });
    const variedad18 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "FRASCO 240"
    });
    const variedad19 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "EXTRA "
    });
    const variedad20 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "ENTERO SIN GLUTEN"
    });
    const variedad21 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "DELIVERY 3"
    });
    const variedad22 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "CRUDA"
    });
    const variedad23 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "COCO"
    });
    const variedad24 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "CHICA "
    });
    const variedad25 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "CACAO"
    });
    const variedad26 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "BROWNIE LOWCARB SIN AZUCAR"
    });
    const variedad27 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "ALMENDRAS"
    });
    const variedad28 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "6 YOGURES GRIEGOS DE 240GR "
    });
    const variedad29 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "3 YOGURES GRIEGOS SEMIDESCREMADOS DE 240G"
    });
    const variedad30 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "3 NATURALES DE 380GR"
    });
    const variedad31 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "3 MINI BUDINES"
    });
    const variedad32 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "3 CHEESECAKE LOWCARB  DE FRUTOS ROJOS"
    });
    const variedad33 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "2 YOGURES 240GR + 2 MINI BUDINES 130GR "
    });
    const variedad34 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "2 YOGURES + 1 MIX PREMIUN "
    });
    const variedad35 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "2 PAQ. CHIPITAS KETO 78GRS"
    });
    const variedad36 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "2 PANETTONES DE 320G C/FRUTOS SECOS SIN GLUTEN"
    });
    const variedad37 = await Variedad.create({
      activo: true,
      empresaId: empresas[6].id,
      color: "#258f00",
      descripcion: "1 CK - 2 YOGUR GRIEGO 240G - 1 MINI BUDIN 130G LOW CARB"
    });

    const presentacion1 = await Presentacion.create({
      descripcion: ".",
      activo: true,
      size: 0,
      empresaId: empresas[6].id,
    });
    const presentacion2 = await Presentacion.create({
      descripcion: "",
      activo: true,
      size: 0,
      empresaId: empresas[6].id,
    });
    const presentacion3 = await Presentacion.create({
      descripcion: "40G",
      activo: true,
      size: 0.4,
      empresaId: empresas[6].id,
    });
    const presentacion4 = await Presentacion.create({
      descripcion: "70G",
      activo: true,
      size: 0.7,
      empresaId: empresas[6].id,
    });
    const presentacion5 = await Presentacion.create({
      descripcion: "100G",
      activo: true,
      size: 1,
      empresaId: empresas[6].id,
    });
    const presentacion6 = await Presentacion.create({
      descripcion: "130G",
      activo: true,
      size: 1.3,
      empresaId: empresas[6].id,
    });
    const presentacion7 = await Presentacion.create({
      descripcion: "150G  ",
      activo: true,
      size: 1.5,
      empresaId: empresas[6].id,
    });
    const presentacion8 = await Presentacion.create({
      descripcion: ".",
      activo: true,
      size: 1.56,
      empresaId: empresas[6].id,
    });
    const presentacion9 = await Presentacion.create({
      descripcion: "240G",
      activo: true,
      size: 2.4,
      empresaId: empresas[6].id,
    });
    const presentacion10 = await Presentacion.create({
      descripcion: "285G",
      activo: true,
      size: 2.85,
      empresaId: empresas[6].id,
    });
    const presentacion11 = await Presentacion.create({
      descripcion: "320G",
      activo: true,
      size: 3.2,
      empresaId: empresas[6].id,
    });
    const presentacion12 = await Presentacion.create({
      descripcion: "380G ",
      activo: true,
      size: 3.8,
      empresaId: empresas[6].id,
    });
    const presentacion13 = await Presentacion.create({
      descripcion: ".",
      activo: true,
      size: 3.9,
      empresaId: empresas[6].id,
    });
    const presentacion14 = await Presentacion.create({
      descripcion: ".",
      activo: true,
      size: 4.4,
      empresaId: empresas[6].id,
    });
    const presentacion15 = await Presentacion.create({
      descripcion: "500G",
      activo: true,
      size: 5,
      empresaId: empresas[6].id,
    });
    const presentacion16 = await Presentacion.create({
      descripcion: "570G",
      activo: true,
      size: 5.7,
      empresaId: empresas[6].id,
    });
    const presentacion17 = await Presentacion.create({
      descripcion: ".",
      activo: true,
      size: 6.4,
      empresaId: empresas[6].id,
    });
    const presentacion18 = await Presentacion.create({
      descripcion: ".",
      activo: true,
      size: 7.2,
      empresaId: empresas[6].id,
    });
    const presentacion19 = await Presentacion.create({
      descripcion: ".",
      activo: true,
      size: 7.4,
      empresaId: empresas[6].id,
    });
    const presentacion20 = await Presentacion.create({
      descripcion: ".",
      activo: true,
      size: 7.6,
      empresaId: empresas[6].id,
    });
    const presentacion21 = await Presentacion.create({
      descripcion: "780G",
      activo: true,
      size: 7.8,
      empresaId: empresas[6].id,
    });
    const presentacion22 = await Presentacion.create({
      descripcion: "850G ",
      activo: true,
      size: 8.5,
      empresaId: empresas[6].id,
    });
    const presentacion23 = await Presentacion.create({
      descripcion: "1 LT",
      activo: true,
      size: 10,
      empresaId: empresas[6].id,
    });
    const presentacion24 = await Presentacion.create({
      descripcion: "1000G",
      activo: true,
      size: 10,
      empresaId: empresas[6].id,
    });
    const presentacion25 = await Presentacion.create({
      descripcion: ".",
      activo: true,
      size: 11.4,
      empresaId: empresas[6].id,
    });
    const presentacion26 = await Presentacion.create({
      descripcion: ".",
      activo: true,
      size: 11.7,
      empresaId: empresas[6].id,
    });
    const presentacion27 = await Presentacion.create({
      descripcion: ".",
      activo: true,
      size: 14.4,
      empresaId: empresas[6].id,
    });
    const presentacion28 = await Presentacion.create({
      descripcion: "8 LTS",
      activo: true,
      size: 80,
      empresaId: empresas[6].id,
    });
    const presentacion29 = await Presentacion.create({
      descripcion: "13 LTS",
      activo: true,
      size: 130,
      empresaId: empresas[6].id,
    });
 

    let variantes = {};
    variantes[758] = await Variante.create({
      codErp: "758",
      porcIva: 10,
      img: "8d393dd8-ae0b-473e-81da-50844ce8a69c.jpg",
      codBarra: null,
      productoId: producto10.id,
      unidadId: unidad6.id,
      variedadId: variedad20.id,
      presentacionId: presentacion22.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[762] = await Variante.create({
      codErp: "762",
      porcIva: 10,
      img: "e3fb1d83-a305-48ca-bbdd-58bf3aa59897.jpg",
      codBarra: null,
      productoId: producto1.id,
      unidadId: unidad6.id,
      variedadId: variedad9.id,
      presentacionId: presentacion5.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[763] = await Variante.create({
      codErp: "763",
      porcIva: 10,
      img: "de357666-4947-4f30-b047-ba1a398e91c4.jpg",
      codBarra: null,
      productoId: producto16.id,
      unidadId: unidad6.id,
      variedadId: variedad15.id,
      presentacionId: presentacion2.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[766] = await Variante.create({
      codErp: "766",
      porcIva: 10,
      img: "1fc3ac0f-03ed-495f-b1c5-992ab6f9f232.jpg",
      codBarra: null,
      productoId: producto6.id,
      unidadId: unidad6.id,
      variedadId: variedad7.id,
      presentacionId: presentacion4.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[767] = await Variante.create({
      codErp: "767",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto6.id,
      unidadId: unidad6.id,
      variedadId: variedad7.id,
      presentacionId: presentacion15.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[768] = await Variante.create({
      codErp: "768",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto6.id,
      unidadId: unidad6.id,
      variedadId: variedad13.id,
      presentacionId: presentacion15.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[769] = await Variante.create({
      codErp: "769",
      porcIva: 10,
      img: "28d24aa2-ad60-4438-bc22-068163cbd6e7.jpg",
      codBarra: null,
      productoId: producto1.id,
      unidadId: unidad6.id,
      variedadId: variedad9.id,
      presentacionId: presentacion9.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[770] = await Variante.create({
      codErp: "770",
      porcIva: 10,
      img: "14f5917c-1ee7-472f-90df-26423d819a33.jpg",
      codBarra: null,
      productoId: producto1.id,
      unidadId: unidad6.id,
      variedadId: variedad1.id,
      presentacionId: presentacion9.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[771] = await Variante.create({
      codErp: "771",
      porcIva: 10,
      img: "0fb2df9e-a14b-48ec-91a3-b1176d6f65e6.jpg",
      codBarra: null,
      productoId: producto1.id,
      unidadId: unidad6.id,
      variedadId: variedad23.id,
      presentacionId: presentacion9.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[772] = await Variante.create({
      codErp: "772",
      porcIva: 10,
      img: "4110dc62-52ee-4da0-8813-82bcbc7d8f46.jpg",
      codBarra: null,
      productoId: producto6.id,
      unidadId: unidad6.id,
      variedadId: variedad2.id,
      presentacionId: presentacion4.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[773] = await Variante.create({
      codErp: "773",
      porcIva: 10,
      img: "ac9f6e76-258e-48b8-97e7-2be275751c49.jpg",
      codBarra: null,
      productoId: producto15.id,
      unidadId: unidad6.id,
      variedadId: variedad26.id,
      presentacionId: presentacion1.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[776] = await Variante.create({
      codErp: "776",
      porcIva: 10,
      img: "aa2c9f11-a09a-4a65-bc64-ba937fef837e.jpg",
      codBarra: null,
      productoId: producto10.id,
      unidadId: unidad6.id,
      variedadId: variedad6.id,
      presentacionId: presentacion7.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[777] = await Variante.create({
      codErp: "777",
      porcIva: 10,
      img: "00090d16-5ba1-41bd-8c20-aa3a1c4b579e.jpg",
      codBarra: null,
      productoId: producto2.id,
      unidadId: unidad6.id,
      variedadId: variedad5.id,
      presentacionId: presentacion2.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[778] = await Variante.create({
      codErp: "778",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto2.id,
      unidadId: unidad6.id,
      variedadId: variedad3.id,
      presentacionId: presentacion2.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[779] = await Variante.create({
      codErp: "779",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto2.id,
      unidadId: unidad6.id,
      variedadId: variedad4.id,
      presentacionId: presentacion2.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[780] = await Variante.create({
      codErp: "780",
      porcIva: 10,
      img: "3b609093-9761-4245-aa4c-83b321e16e22.jpg",
      codBarra: null,
      productoId: producto1.id,
      unidadId: unidad6.id,
      variedadId: variedad9.id,
      presentacionId: presentacion12.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[781] = await Variante.create({
      codErp: "781",
      porcIva: 10,
      img: "8c7ac91f-7ce1-4d44-9bd7-a8d403fc7a34.jpg",
      codBarra: null,
      productoId: producto12.id,
      unidadId: unidad6.id,
      variedadId: variedad18.id,
      presentacionId: presentacion2.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[782] = await Variante.create({
      codErp: "782",
      porcIva: 10,
      img: "e96d46b1-f544-4068-ae0f-9ba78d89e2d9.jpg",
      codBarra: null,
      productoId: producto11.id,
      unidadId: unidad6.id,
      variedadId: variedad27.id,
      presentacionId: presentacion5.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[783] = await Variante.create({
      codErp: "783",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto1.id,
      unidadId: unidad6.id,
      variedadId: variedad9.id,
      presentacionId: presentacion23.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[784] = await Variante.create({
      codErp: "784",
      porcIva: 10,
      img: "21e7da67-685a-48e8-a62f-650bb5e98c87.jpg",
      codBarra: null,
      productoId: producto5.id,
      unidadId: unidad6.id,
      variedadId: variedad27.id,
      presentacionId: presentacion16.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[786] = await Variante.create({
      codErp: "786",
      porcIva: 10,
      img: "a1c9d10c-1908-4432-a995-eeffccdb6440.jpg",
      codBarra: null,
      productoId: producto7.id,
      unidadId: unidad6.id,
      variedadId: variedad14.id,
      presentacionId: presentacion6.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[787] = await Variante.create({
      codErp: "787",
      porcIva: 10,
      img: "1fb734a2-1709-423c-9a3f-e75e43f7630a.jpg",
      codBarra: null,
      productoId: producto7.id,
      unidadId: unidad6.id,
      variedadId: variedad11.id,
      presentacionId: presentacion6.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[788] = await Variante.create({
      codErp: "788",
      porcIva: 10,
      img: "dc0be634-49e5-4fcf-a77c-229d14a1311c.jpg",
      codBarra: null,
      productoId: producto3.id,
      unidadId: unidad6.id,
      variedadId: variedad33.id,
      presentacionId: presentacion19.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[789] = await Variante.create({
      codErp: "789",
      porcIva: 10,
      img: "6b813599-0538-4d73-8c5c-4221096280df.jpg",
      codBarra: null,
      productoId: producto3.id,
      unidadId: unidad6.id,
      variedadId: variedad34.id,
      presentacionId: presentacion26.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[790] = await Variante.create({
      codErp: "790",
      porcIva: 10,
      img: "42024a96-35e2-40a3-9281-5c4ee2dd2714.jpg",
      codBarra: null,
      productoId: producto3.id,
      unidadId: unidad6.id,
      variedadId: variedad28.id,
      presentacionId: presentacion27.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[791] = await Variante.create({
      codErp: "791",
      porcIva: 10,
      img: "fab04068-1ceb-4f04-b594-77e5edd9435b.jpg",
      codBarra: null,
      productoId: producto7.id,
      unidadId: unidad6.id,
      variedadId: variedad25.id,
      presentacionId: presentacion6.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[792] = await Variante.create({
      codErp: "792",
      porcIva: 10,
      img: "f9d5376c-7462-4975-8078-3710357cb8cd.jpg",
      codBarra: null,
      productoId: producto3.id,
      unidadId: unidad6.id,
      variedadId: variedad31.id,
      presentacionId: presentacion13.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[793] = await Variante.create({
      codErp: "793",
      porcIva: 10,
      img: "c88fb6b1-bb7b-4e0f-8e12-9a1580508221.jpg",
      codBarra: null,
      productoId: producto3.id,
      unidadId: unidad6.id,
      variedadId: variedad30.id,
      presentacionId: presentacion25.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[794] = await Variante.create({
      codErp: "794",
      porcIva: 10,
      img: "a5a51b22-2713-4b77-90b3-45b407603fc8.jpg",
      codBarra: null,
      productoId: producto3.id,
      unidadId: unidad6.id,
      variedadId: variedad37.id,
      presentacionId: presentacion20.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[795] = await Variante.create({
      codErp: "795",
      porcIva: 10,
      img: "a103c051-ae77-4fb4-8828-406aa014459d.jpg",
      codBarra: null,
      productoId: producto3.id,
      unidadId: unidad6.id,
      variedadId: variedad32.id,
      presentacionId: presentacion14.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[796] = await Variante.create({
      codErp: "796",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto2.id,
      unidadId: unidad6.id,
      variedadId: variedad16.id,
      presentacionId: presentacion2.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[797] = await Variante.create({
      codErp: "797",
      porcIva: 10,
      img: "a2e734b9-4f64-41da-b96c-5aed4e4dbd16.jpg",
      codBarra: null,
      productoId: producto8.id,
      unidadId: unidad6.id,
      variedadId: variedad22.id,
      presentacionId: presentacion10.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[798] = await Variante.create({
      codErp: "798",
      porcIva: 10,
      img: "1e5a3cd5-e50e-4daf-b609-a4ed554d1502.jpg",
      codBarra: null,
      productoId: producto8.id,
      unidadId: unidad6.id,
      variedadId: variedad22.id,
      presentacionId: presentacion3.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[799] = await Variante.create({
      codErp: "799",
      porcIva: 10,
      img: "ed8470dc-2b5e-4a5d-8126-cc08602db8b5.jpg",
      codBarra: null,
      productoId: producto3.id,
      unidadId: unidad6.id,
      variedadId: variedad29.id,
      presentacionId: presentacion18.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[800] = await Variante.create({
      codErp: "800",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto8.id,
      unidadId: unidad6.id,
      variedadId: variedad22.id,
      presentacionId: presentacion24.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[801] = await Variante.create({
      codErp: "801",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto8.id,
      unidadId: unidad6.id,
      variedadId: variedad22.id,
      presentacionId: presentacion15.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[802] = await Variante.create({
      codErp: "802",
      porcIva: 10,
      img: "f3b2ae76-ab03-4e12-a87b-a2625efb2307.jpg",
      codBarra: null,
      productoId: producto7.id,
      unidadId: unidad6.id,
      variedadId: variedad10.id,
      presentacionId: presentacion6.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[803] = await Variante.create({
      codErp: "803",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto1.id,
      unidadId: unidad6.id,
      variedadId: variedad1.id,
      presentacionId: presentacion12.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[804] = await Variante.create({
      codErp: "804",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto2.id,
      unidadId: unidad6.id,
      variedadId: variedad21.id,
      presentacionId: presentacion2.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[805] = await Variante.create({
      codErp: "805",
      porcIva: 10,
      img: "95d1ab05-a5c2-4519-8dc3-c09547195447.jpg",
      codBarra: null,
      productoId: producto4.id,
      unidadId: unidad6.id,
      variedadId: variedad17.id,
      presentacionId: presentacion11.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[806] = await Variante.create({
      codErp: "806",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto3.id,
      unidadId: unidad6.id,
      variedadId: variedad36.id,
      presentacionId: presentacion17.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[814] = await Variante.create({
      codErp: "814",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto9.id,
      unidadId: unidad6.id,
      variedadId: variedad19.id,
      presentacionId: presentacion3.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[819] = await Variante.create({
      codErp: "819",
      porcIva: 10,
      img: "7736532a-7165-4bb0-8eab-e540087d6d2b.jpg",
      codBarra: null,
      productoId: producto13.id,
      unidadId: unidad6.id,
      variedadId: variedad24.id,
      presentacionId: presentacion28.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[820] = await Variante.create({
      codErp: "820",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto13.id,
      unidadId: unidad6.id,
      variedadId: variedad12.id,
      presentacionId: presentacion29.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[834] = await Variante.create({
      codErp: "834",
      porcIva: 10,
      img: "7d9b421a-0dfe-47c0-9a0b-6cd4cec4804f.jpg",
      codBarra: null,
      productoId: producto14.id,
      unidadId: unidad6.id,
      variedadId: variedad8.id,
      presentacionId: presentacion21.id,
      activo: true,
      empresaId: empresas[6].id,
    });
    variantes[835] = await Variante.create({
      codErp: "835",
      porcIva: 10,
      img: "",
      codBarra: null,
      productoId: producto3.id,
      unidadId: unidad6.id,
      variedadId: variedad35.id,
      presentacionId: presentacion8.id,
      activo: true,
      empresaId: empresas[6].id,
    });

     
     // Filtrar productos, presentaciones y variedades en paralelo
    const [productosJson, presentacionesJson, variedadesJson] = await Promise.all([
      Promise.resolve(variantesStore.filter((item, index, self) =>
        index === self.findIndex(t => t.productoId === item.productoId && t.producto === item.producto)
      )),

      Promise.resolve(variantesStore.filter((item, index, self) =>
        index === self.findIndex(t => t.presentacionId === item.presentacionId && t.presentacion === item.presentacion)
      )),

      Promise.resolve(variantesStore.filter((item, index, self) =>
        index === self.findIndex(t => t.variedadId === item.variedadId && t.variedad === item.variedad)
      ))
    ]);

    // Crear productos en paralelo y almacenar en un objeto con id como clave
    let productos = {}; 
    for (const producto of productosJson) { 
        productos[producto.productoId] = await Producto.create({
        nombre: producto.producto,
        descripcion: producto.producto,
        categoriaId: categoria99.id,
        subCategoriaId: subCategoria99.id,
        marcaId: marca0000.id,
        activo: true,
        empresaId: empresas[8].id,
      });  
    }
// Crear presentaciones en paralelo y almacenar en un objeto con id como clave
let presentaciones = {}; 
for (const presentacion of presentacionesJson) { 
  presentaciones[presentacion.presentacionId] = await Presentacion.create({ 
  descripcion: presentacion.presentacion,
  activo: true,
  size: 0,
  empresaId: empresas[8].id,
});  
}


// Crear variedades en paralelo y almacenar en un objeto con id como clave
let variedades = {}; 
for (const variedad of variedadesJson) { 
  variedades[variedad.variedadId] = await Variedad.create({
    activo: true,
    empresaId: empresas[8].id,
    color: "#258f00",
    descripcion: variedad.variedad
  });
}

let variantesX = {};
  for (const variante of variantesStore) { 
    variantesX[variante.id] = await Variante.create({
      codErp: variante.erp,
      porcIva: +variante.iva,
      img:variante.imagen,
      codBarra: '00000000',
      productoId: productos[variante.productoId].id,
      unidadId: unidad6.id,
      variedadId:  variedades[variante.variedadId].id,
      presentacionId: presentaciones[variante.presentacionId].id,
      activo: true,
      empresaId: empresas[8].id,
    });
   
}





    const condicionPago20 = await CondicionPago.create({
      descripcion: "contado",
      dias: 0,
      activo: true,
      empresaId: empresas[6].id,
      color: "#45A137",
      predeterminado: true
    });

    const condicionPago21 = await CondicionPago.create({
      descripcion: "credito 8",
      dias: 8,
      activo: true,
      empresaId: empresas[6].id,
      color: "#45A137",
      predeterminado: false
    });
    const condicionPago24 = await CondicionPago.create({
      descripcion: "credito 30",
      dias: 30,
      activo: true,
      empresaId: empresas[6].id,
      color: "#45A137",
      predeterminado: false
    });

    const listaPrecio14 = await ListaPrecio.create({
      descripcion: "LISTA DE PRECIO 1",
      activo: true,
      empresaId: empresas[6].id,
      color: "#45A137",
      predeterminado: true
    });
    const listaPrecio15 = await ListaPrecio.create({
      descripcion: "MAYORISTA MAYORISTA",
      activo: true,
      empresaId: empresas[6].id,
      color: "#45A137",
      predeterminado: false
    });

    const listaPrecio16 = await ListaPrecio.create({
      descripcion: "FAMILIARES",
      activo: true,
      empresaId: empresas[6].id,
      color: "#45A137",
      predeterminado: false
    });

    const listaPrecio17 = await ListaPrecio.create({
      descripcion: "MAYORISTA CLIENTE FINAL",
      activo: true,
      empresaId: empresas[6].id,
      color: "#45A137",
      predeterminado: false
    });

    const listaPrecio18 = await ListaPrecio.create({
      descripcion: "MAYORISTA INTERIOR",
      activo: true,
      empresaId: empresas[6].id,
      color: "#45A137",
      predeterminado: false
    });

       const listaPrecio21 = await ListaPrecio.create({
      descripcion: "FORTIS MAYORISTA",
      activo: true,
      empresaId: empresas[6].id,
      color: "#45A137",
      predeterminado: true
    });

    const listaPrecio20 = await ListaPrecio.create({
      descripcion: "LISTA DE PRECIO 1",
      activo: true,
      empresaId: empresas[8].id,
      color: "#45A137",
      predeterminado: true
    });
     
    


    const condicionPago25 = await CondicionPago.create({
      descripcion: "contado",
      dias: 0,
      activo: true,
      empresaId: empresas[8].id,
      color: "#45A137",
      predeterminado: true
    });

    const condicionPago101 = await CondicionPago.create({
      descripcion: "credito 8",
      dias: 8,
      activo: true,
      empresaId: empresas[8].id,
      color: "#45A137",
      predeterminado: false
    });
    const condicionPago102 = await CondicionPago.create({
      descripcion: "credito 30",
      dias: 30,
      activo: true,
      empresaId: empresas[8].id,
      color: "#45A137",
      predeterminado: false
    });
 
        const precio1693 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[762].id,
          cantDesde: 1,
          cantHasta: 100,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 10000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1690 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[758].id,
          cantDesde: 1,
          cantHasta: 100,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 190000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1695 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[763].id,
          cantDesde: 0,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 116000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1710 = await Valoracion.create({
          listaPrecioId: listaPrecio16.id,
          varianteId: variantes[769].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 20500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1711 = await Valoracion.create({
          listaPrecioId: listaPrecio16.id,
          varianteId: variantes[770].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 20500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1702 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[772].id,
          cantDesde: 1,
          cantHasta: 99,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 9850,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1700 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[770].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 25000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1699 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[769].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 25000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1701 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[771].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 25000,
          activo: true,
          empresaId: empresas[6].id,
        });
    
        const precio1703 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[773].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 28000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1713 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[770].id,
          cantDesde: 4,
          cantHasta: 99.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 22000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1715 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[771].id,
          cantDesde: 4,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 22000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1698 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[768].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 60000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1712 = await Valoracion.create({
          listaPrecioId: listaPrecio16.id,
          varianteId: variantes[771].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 20500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1716 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[776].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 26000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1708 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[770].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 20500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1709 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[771].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 20500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1719 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[778].id,
          cantDesde: 1,
          cantHasta: 1,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 216000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1720 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[777].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 10000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1722 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[779].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 15000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1723 = await Valoracion.create({
          listaPrecioId: listaPrecio16.id,
          varianteId: variantes[777].id,
          cantDesde: 1,
          cantHasta: 1,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 10000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1725 = await Valoracion.create({
          listaPrecioId: listaPrecio16.id,
          varianteId: variantes[773].id,
          cantDesde: 1,
          cantHasta: 1,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 26000,
          activo: true,
          empresaId: empresas[6].id,
        });
    
        const precio1730 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[780].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 36000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1732 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[769].id,
          cantDesde: 1,
          cantHasta: 11,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 22000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1733 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[771].id,
          cantDesde: 1,
          cantHasta: 11,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 22000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1735 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[781].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: -2000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1721 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[777].id,
          cantDesde: 1,
          cantHasta: 9999999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 5000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1734 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[781].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: -2000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1736 = await Valoracion.create({
          listaPrecioId: listaPrecio16.id,
          varianteId: variantes[781].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: -2000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1707 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[769].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 20500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1750 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[784].id,
          cantDesde: 1,
          cantHasta: 12,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 77000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1737 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[766].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 11000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1740 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[768].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 59730,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1741 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[777].id,
          cantDesde: 1,
          cantHasta: 3,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 20000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1758 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[792].id,
          cantDesde: 1,
          cantHasta: 1000000,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 64000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1742 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[780].id,
          cantDesde: 1,
          cantHasta: 9999999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 32000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1752 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[786].id,
          cantDesde: 1,
          cantHasta: 6,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 21000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1743 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[782].id,
          cantDesde: 1,
          cantHasta: 12,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 11000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1747 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[783].id,
          cantDesde: 1,
          cantHasta: 11,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 29500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1748 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[784].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 77000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1753 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[787].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 22500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1739 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[767].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 72423,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1751 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[777].id,
          cantDesde: 1,
          cantHasta: 1,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 10000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1754 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[788].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 86000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1755 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[789].id,
          cantDesde: 1,
          cantHasta: 63,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 65000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1756 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[790].id,
          cantDesde: 1,
          cantHasta: 369,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 142000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1714 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[769].id,
          cantDesde: 4,
          cantHasta: 999999999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 22000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1757 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[791].id,
          cantDesde: 1,
          cantHasta: 6,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 21000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1759 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[793].id,
          cantDesde: 1,
          cantHasta: 666.666,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 100000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1738 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[772].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 8000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1744 = await Valoracion.create({
          listaPrecioId: listaPrecio18.id,
          varianteId: variantes[769].id,
          cantDesde: 1,
          cantHasta: 50,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 21500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1745 = await Valoracion.create({
          listaPrecioId: listaPrecio18.id,
          varianteId: variantes[770].id,
          cantDesde: 1,
          cantHasta: 20,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 21500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1746 = await Valoracion.create({
          listaPrecioId: listaPrecio18.id,
          varianteId: variantes[771].id,
          cantDesde: 1,
          cantHasta: 20,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 21500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1697 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[766].id,
          cantDesde: 1,
          cantHasta: 99.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 15000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1727 = await Valoracion.create({
          listaPrecioId: listaPrecio16.id,
          varianteId: variantes[776].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 26500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1761 = await Valoracion.create({
          listaPrecioId: listaPrecio18.id,
          varianteId: variantes[791].id,
          cantDesde: 1,
          cantHasta: 99999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 19000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1760 = await Valoracion.create({
          listaPrecioId: listaPrecio18.id,
          varianteId: variantes[787].id,
          cantDesde: 1,
          cantHasta: 99999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 19500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1795 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[806].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 100000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1762 = await Valoracion.create({
          listaPrecioId: listaPrecio18.id,
          varianteId: variantes[786].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 19000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1729 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[776].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 29500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1764 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[773].id,
          cantDesde: 1,
          cantHasta: 4,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 28000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1765 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[786].id,
          cantDesde: 1,
          cantHasta: 4,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 21000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1785 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[802].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 19000,
          activo: true,
          empresaId: empresas[6].id,
        });
    
        const precio1706 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[776].id,
          cantDesde: 1,
          cantHasta: 100,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 29500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1766 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[794].id,
          cantDesde: 1,
          cantHasta: 9999999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 94000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1767 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[795].id,
          cantDesde: 1,
          cantHasta: 5,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 83500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1763 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[781].id,
          cantDesde: 1,
          cantHasta: 9999999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: -2000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1787 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[803].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 29950,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1768 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[766].id,
          cantDesde: 1,
          cantHasta: 99.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 15000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1769 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[792].id,
          cantDesde: 1,
          cantHasta: 999.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 64000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1770 = await Valoracion.create({
          listaPrecioId: listaPrecio18.id,
          varianteId: variantes[781].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: -2000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1771 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[796].id,
          cantDesde: 1,
          cantHasta: 5,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 25000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1772 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[797].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 32000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1773 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[798].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 9500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1774 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[799].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 73000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1788 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[804].id,
          cantDesde: 1,
          cantHasta: 99.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 20000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1775 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[798].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 8200,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1776 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[797].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 26600,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1777 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[787].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 19500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1778 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[786].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 19000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1779 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[791].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 19000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1780 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[794].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 94000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1781 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[800].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 110000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1782 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[780].id,
          cantDesde: 1,
          cantHasta: 20,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 29950,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1783 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[801].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 56700,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1784 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[802].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 21000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1789 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[805].id,
          cantDesde: 1,
          cantHasta: 10,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 56000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1797 = await Valoracion.create({
          listaPrecioId: listaPrecio18.id,
          varianteId: variantes[773].id,
          cantDesde: 1,
          cantHasta: 999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 24500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1790 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[805].id,
          cantDesde: 1,
          cantHasta: 12,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 44000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1791 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[773].id,
          cantDesde: 1,
          cantHasta: 12,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 24500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1807 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[801].id,
          cantDesde: 1,
          cantHasta: 5,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 56700,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1809 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[814].id,
          cantDesde: 1,
          cantHasta: 9.999,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 2500,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1798 = await Valoracion.create({
          listaPrecioId: listaPrecio18.id,
          varianteId: variantes[776].id,
          cantDesde: 1,
          cantHasta: 20,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 26000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1823 = await Valoracion.create({
          listaPrecioId: listaPrecio15.id,
          varianteId: variantes[819].id,
          cantDesde: 1,
          cantHasta: 1,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 22000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1824 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[820].id,
          cantDesde: 1,
          cantHasta: 1,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 27000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1827 = await Valoracion.create({
          listaPrecioId: listaPrecio17.id,
          varianteId: variantes[758].id,
          cantDesde: 1,
          cantHasta: 5,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 190000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1846 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[834].id,
          cantDesde: 1,
          cantHasta: 1,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 20000,
          activo: true,
          empresaId: empresas[6].id,
        });
        const precio1847 = await Valoracion.create({
          listaPrecioId: listaPrecio14.id,
          varianteId: variantes[835].id,
          cantDesde: 1,
          cantHasta: 100,
          fechaDesde: "2023-12-31",
          fechaHasta: "9999-12-31",
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: 43000,
          activo: true,
          empresaId: empresas[6].id,
        });
   
    const precios = await Promise.all(preciosStore.map(async (precio) => {  
        return Valoracion.create({
          listaPrecioId: listaPrecio20.id,
          varianteId: variantesX[precio.cod_producto].id,
          cantDesde: precio.cant_desde,
          cantHasta: precio.cant_hasta,
          fechaDesde: precio.fecha_desde,
          fechaHasta: precio.fecha_hasta,
          registro: "PRECIO",
          tipo: "IMPORTE",
          valor: precio.precio,
          activo: true,
          empresaId: empresas[8].id,
        });
      
    }));
           let sucursalClientes ={}
        for (const c of clienteJson){  
          let lpId = 0;
          console.log(c)
          switch (c.cod_lista_precio) {
            case 14:
              lpId = listaPrecio14.id;
              break;
            case 15:
              lpId = listaPrecio15.id;
              break;
            case 16:
              lpId = listaPrecio16.id;
              break;
            case 17:
              lpId = listaPrecio17.id;
              break;
            case 18:
              lpId = listaPrecio18.id;
              break; 
              case 20:
                lpId = listaPrecio20.id;
                break;     
                  case 21:
                lpId = listaPrecio21.id;
                break;      
              default:
              break;
          }
    
          let cpId = 0;
          switch (c.cod_forma_venta_pref) {
            case 20:
              cpId = condicionPago20.id;
              break;
            case 21:
              cpId = condicionPago21.id;
              break;
            case 24:
              cpId = condicionPago24.id;
              break;
              case 25:
                cpId = condicionPago25.id;
                break;
              case 101:
                cpId = condicionPago101.id;
                break;
              case 102:
                cpId = condicionPago102.id;
                break;
            default:
              break;
          }
       
          const clienteNuevo = await Cliente.create({
            empresaId: c.empresaid,
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
          console.log(c.cod_cliente)
          sucursalClientes[c.cod_cliente]=  await ClienteSucursal.create({
            clienteId: clienteNuevo.id,
            empresaId: c.empresaid,
            nombre: c.razon_social.toUpperCase(),
            direccion: c.direccion?.toUpperCase(),
            telefono: c.telefono,
            email: c.email || '',
            latitud: c.latitud,
            longitud: c.longitud,
            principal: true,
            activo: true,
            listaPrecioId: lpId,
            condicionPagoId: cpId,
            codigoPais: "PRY",
            // puedes incluir usuarioCreacionId, etc. si lo tenés
          });
                   

          if(c.cod_cliente ==  23061         ){
            for (const x of sucursaleBiggieJSON){  
              await ClienteSucursal.create({
                clienteId: clienteNuevo.id,
                empresaId: c.empresaid,
                nombre: x.nombre,
                direccion: x.direccion,
                telefono: x.telefono, 
                latitud: +x.latitud ||0,
                longitud: +x.longitud|| 0,
                principal: false,
                activo: true,
                listaPrecioId: lpId,
                condicionPagoId: cpId,
                codigoPais: "PRY",
                // puedes incluir usuarioCreacionId, etc. si lo tenés
              });
            }

          }
        }


// Cargar manualmente cada archivo JSON
const ventasRaw = fs.readFileSync("./src/json/docs_cab.json", "utf8");
const detallesRaw = fs.readFileSync("./src/json/docs_det.json", "utf8");
const cobranzasRaw = fs.readFileSync("./src/json/cobranzas_cab.json", "utf8");
const cobranzasDetalleRaw = fs.readFileSync("./src/json/cobranzas_det.json", "utf8");

// Parsear los contenidos
const { ventasJson } = JSON.parse(ventasRaw);
const { detallesJson } = JSON.parse(detallesRaw);
const { cobranzasJson } = JSON.parse(cobranzasRaw);
const { cobranzasDetalleJson } = JSON.parse(cobranzasDetalleRaw);
const erroresDetalle = []; // ⬅️ Aquí se guardarán todos los errores

 // Confirmar que se cargaron completamente
console.log("🧾 Total ventas cargadas:", ventasJson.length);               // Esperado: 2030
console.log("🧾 Total detalles cargados:", detallesJson.length);
console.log("🧾 Total cobranzas cargadas:", cobranzasJson.length);
console.log("🧾 Total cobranzas detalle cargados:", cobranzasDetalleJson.length);

// Ordenar los datos por seguridad
ventasJson.sort((a, b) => a.cod_venta - b.cod_venta);
detallesJson.sort((a, b) => a.cod_venta - b.cod_venta);
cobranzasJson.sort((a, b) => a.cod_cobranza - b.cod_cobranza);
cobranzasDetalleJson.sort((a, b) => a.cod_cobranza - b.cod_cobranza);
 const total_registros =ventasJson.length;
const chunkSize = 200;
let procesadas = 0;
let errores = 0;
let saltadas = 0;

while (ventasJson.length > 0) {
  const chunk = ventasJson.splice(0, chunkSize); // saca el primer chunk directamente

  for (const venta of chunk) {
    try {
      const {
        cod_venta,
        fecha_venta,
        cod_cobranza,
        cod_cliente,
        cod_lista_precio,
        cod_forma_venta,
        nro_comprobante,
        inicio_timbrado,
        fin_timbrado,
        timbrado,
        porc_descuento,
        importe_descuento,
        importe_neto,
        importe_total,
        importe_iva5,
        importe_iva10,
        importe_iva_exenta,
        importe_sub_total,
        total_kg
      } = venta;

     /*  if (fecha_venta < '2025-03-01') {
        console.warn(`⏩ Venta saltada por fecha: ${cod_venta}`);
        saltadas++;
        continue;
      } */

      const detalles = detallesJson.filter(d => d.cod_venta === cod_venta);
      if (!detalles || detalles.length === 0) {
        console.warn(`⚠️ No se encontraron detalles para la venta ${cod_venta}`);
        saltadas++;
        continue;
      }

      // COBRANZA
      let cobranzaId = null;
      if (cod_cobranza) {
        const cobranza = cobranzasJson.find(c => c.cod_cobranza === cod_cobranza);
        const cDetalle = cobranzasDetalleJson.filter(d => d.cod_cobranza === cod_cobranza);

        const cobranzaNew = await Cobranza.create({
          id: null,
          empresaId: empresas[6].id,
          sucursalId: sucursal9.id,
          usuarioCreacionId: userAdmin.id,
          fechaCobranza: cobranza.fecha_cobranza,
          importeAbonado: cobranza.importe_abonado,
          importeCobrado: cobranza.importe_cobrado,
          saldo: cobranza.saldo,
          tipo: "FT"
        });

        await CobranzaDetalle.bulkCreate(
          cDetalle.map(d => ({
            cobranzaId: cobranzaNew.id,
            id: null,
            importeAbonado: d.importe_abonado,
            importeCobrado: d.importe_cobrado,
            saldo: d.saldo,
            medioPagoId: 1
          }))
        );

        cobranzaId = cobranzaNew.id;
      }

      const codigoSeguridad = generarCodigoSeguridad();
      const tipoEmision = tiposEmisiones.find(t => t.codigo == 1);
      const tipoComprobante = tipoContribuyente.find(t => t.id == 2);

      const cdc = generarCDC(
        numeracion1.itide,
        empresas[6].ruc,
        nro_comprobante,
        tipoComprobante.id,
        fecha_venta,
        tipoEmision.codigo,
        codigoSeguridad
      );

      let listaPrecioId = 0;
      switch (cod_lista_precio) {
        case 14: listaPrecioId = listaPrecio14.id; break;
        case 15: listaPrecioId = listaPrecio15.id; break;
        case 16: listaPrecioId = listaPrecio16.id; break;
        case 17: listaPrecioId = listaPrecio17.id; break;
        case 18: listaPrecioId = listaPrecio18.id; break;
        case 20: listaPrecioId = listaPrecio20.id; break;
        case 21: listaPrecioId = listaPrecio21.id; break;
        default: break;
      }

      let condicionPagoId = 0;
      switch (cod_forma_venta) {
        case 20: condicionPagoId = condicionPago20.id; break;
        case 21: condicionPagoId = condicionPago21.id; break;
        case 24: condicionPagoId = condicionPago24.id; break;
        case 25: condicionPagoId = condicionPago25.id; break;
        case 101: condicionPagoId = condicionPago101.id; break;
        case 102: condicionPagoId = condicionPago102.id; break;
        default: break;
      }

      if (!sucursalClientes[cod_cliente]) {
        throw new Error(`Sucursal cliente no encontrada para cod_cliente ${cod_cliente}`);
      }

      const documento = await Documento.create({
        codigoSeguridad,
        cdc,
        empresaId: empresas[6].id,
        sucursalId: sucursal9.id,
        listaPrecioId,
        condicionPagoId,
        clienteId: sucursalClientes[cod_cliente].clienteId,
        clienteSucursalId: sucursalClientes[cod_cliente].id,
        anulado: false,
        enviado: false,
        usuarioCreacionId: userAdmin.id,
        fecha: fecha_venta,
        fechaInicio: inicio_timbrado,
        fechaFin: fin_timbrado,
        timbrado,
        modoEntrega: "CONTRAENTREGA",
        nroComprobante: nro_comprobante,
        cobranzaId,
        itide: numeracion1.itide,
        porcDescuento: porc_descuento,
        importeIva5: importe_iva5,
        importeIva10: importe_iva10,
        importeIvaExenta: importe_iva_exenta,
        importeDescuento: importe_descuento,
        importeNeto: importe_neto,
        importeSubtotal: importe_sub_total,
        importeTotal: importe_total,
        valorNeto: importe_total,
        tipoDoc: "FT",
        calculable: true,
        importeDevuelto: 0,
        estado: "Pendiente",
        totalKg: total_kg
      });

      await DocumentoDetalle.bulkCreate(
        detalles.map(x => ({
          documentoId: documento.id,
          cantidad: x.cantidad,
          importeDescuento: x.importe_descuento,
          importeNeto: x.importe_neto,
          importeSubtotal: x.sub_total,
          importeTotal: x.importe_total,
          importePrecio: x.importe_precio,
          importeIva5: x.importe_iva5,
          importeIva10: x.importe_iva10,
          importeIvaExenta: x.importe_iva_exenta,
          porcIva: x.porc_iva,
          porcDescuento: 0,
          totalKg: x.total_kg,
          anticipo: 0,
          ivaTipo: 1,
          ivaBase: 100,
          tipoDescuento: "porcentaje",
          varianteId: variantes[x.cod_producto]?.id
        }))
      );

      procesadas++;
      console.log(`✅ Venta procesada: ${cod_venta} (${procesadas} procesadas)`);

      if (documento.condicionPagoId !== condicionPago20.id) {
        await crearCreditoDesdeDocumento(documento);
      }

    } catch (error) {
  errores++;
  console.error(`❌ Error en venta ${venta.cod_venta} (${procesadas + errores + saltadas} procesadas hasta ahora)`);
  console.error(error);

  erroresDetalle.push({
    cod_venta: venta.cod_venta,
    mensaje: error.message,
    stack: error.stack
  });
}
  }

  await new Promise(r => setTimeout(r, 100)); // pausa entre chunks
}
console.log(`📦 Total registros : ${total_registros}`);
console.log(`🟢 FINALIZADO`);
console.log(`✅ Ventas procesadas: ${procesadas}`);
console.log(`⏩ Ventas saltadas: ${saltadas}`);
console.log(`❌ Ventas con error: ${errores}`);
console.log(`📦 Total registros intentados: ${procesadas + errores + saltadas}`);
console.log("✅ ventasJson cargadas:", ventasJson.length); // ¿da 2030?
if (erroresDetalle.length > 0) {
  console.log(`📋 Errores detectados (${erroresDetalle.length}):`);
  erroresDetalle.forEach((e, i) => {
    console.log(`🔴 ${i + 1}) cod_venta: ${e.cod_venta}`);
    console.log(`   📝 Mensaje: ${e.mensaje}`);
    console.log(`   📄 Stack:\n${e.stack}\n`);
  });
 
}

      
 
   
};

module.exports = { migrateDB };
