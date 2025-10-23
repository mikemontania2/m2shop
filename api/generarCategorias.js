const fs = require("fs");

// 📂 Leer productos convertidos
const productos = JSON.parse(fs.readFileSync("variantes_convertidos.json", "utf8"));

// 📂 Array de imágenes por categoría
const imagenesCategorias = [
  {
    id: "cuidado-de-las-prendas",
    image: "https://www.cavallaro.com.py/userfiles/images/banners/banner-medio2-411x330.jpg",
    image2: "https://www.cavallaro.com.py/userfiles/images/clasificaciones/cuidado-de-prendas.png"
  },
  {
    id: "limpieza-y-desinfeccion-del-hogar",
    image: "https://www.cavallaro.com.py/userfiles/images/banners/banner-medio-411x330.jpg",
    image2: "https://www.cavallaro.com.py/userfiles/images/clasificaciones/limpieza-y-desinfeccion-del-hogar.png"
  },
  {
    id: "higiene-personal",
    image: "https://www.cavallaro.com.py/userfiles/images/banners/banner-medio-411x330-tocador.jpg",
    image2: "https://www.cavallaro.com.py/userfiles/images/clasificaciones/limpieza-y-desinfeccion-del-hogar.png"
  }
];

// 🔹 Función para generar slugs
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

// 🔁 Agrupar categorías y subcategorías
const categoriasArray = [];

productos.forEach((p) => {
  const catId = p.category;
  const subId = p.subcategory;

  // Buscar si la categoría ya existe
  let categoria = categoriasArray.find((c) => c.id === catId);
  if (!categoria) {
    // Buscar imágenes correspondientes
    const imagenCat = imagenesCategorias.find((i) => i.id === catId) || { image: "", image2: "" };

    categoria = {
      id: catId,
      name: p.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      description: "",
      image: imagenCat.image,
      image2: imagenCat.image2,
      slug: slugify(p.category),
      subcategories: []
    };
    categoriasArray.push(categoria);
  }

  // Agregar subcategoría si no existe
  if (subId && !categoria.subcategories.some((s) => s.id === subId)) {
    categoria.subcategories.push({
      id: subId,
      name: subId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      description: "",
      slug: slugify(`${catId}-${subId}`)
    });
  }
});

// 💾 Guardar en archivo
fs.writeFileSync("categorias_generadas.json", JSON.stringify(categoriasArray, null, 2), "utf8");

console.log("✅ Archivo generado: categorias_generadas.json");
console.log("📝 Las imágenes de las categorías ya se asignaron automáticamente.");
