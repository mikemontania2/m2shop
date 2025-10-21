// generarCategorias.js
const fs = require("fs");

// 📂 Leer productos convertidos
const productos = JSON.parse(fs.readFileSync("variantes_convertidos.json", "utf8"));

// 🔁 Agrupar categorías y subcategorías
const categoriasMap = new Map();

productos.forEach((p) => {
  const catId = p.category;
  const subId = p.subcategory;

  if (!categoriasMap.has(catId)) {
    categoriasMap.set(catId, {
      id: catId,
      name: p.category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      description: "",
      image: "",
      subcategories: []
    });
  }

  const categoria = categoriasMap.get(catId);

  if (subId && !categoria.subcategories.some((s) => s.id === subId)) {
    categoria.subcategories.push({
      id: subId,
      name: subId
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      description: ""
    });
  }
});

// 📦 Convertir el Map en array
const categoriasArray = Array.from(categoriasMap.values());

// 💾 Guardar en archivo
fs.writeFileSync("categorias_generadas.json", JSON.stringify(categoriasArray, null, 2), "utf8");

console.log("✅ Archivo generado: categorias_generadas.json");
console.log("📝 Ahora podés completar las imágenes y descripciones manualmente.");
