const { Category, Product, Discount } = require('./src/models');
const { sequelize } = require('./dbconfig');
const fs = require('fs');
const path = require('path');

async function importCatalogIfPresent() {
  const file = path.join(__dirname, 'data', 'catalog.json');
  if (!fs.existsSync(file)) return false;

  const raw = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(raw);

  // Import categories
  if (Array.isArray(data.categories)) {
    for (const c of data.categories) {
      await Category.findOrCreate({
        where: { slug: c.slug },
        defaults: {
          name: c.name,
          slug: c.slug,
          description: c.description || null,
          image_url: c.image_url || null,
          display_order: c.display_order || 0,
        },
      });
    }
  }

  // Map categories by slug
  const cats = await Category.findAll();
  const slugToCategoryId = new Map(cats.map(c => [c.slug, c.id]));

  // Import products; use provided id as SKU (product id)
  const defaultImage = data.defaults?.product_image_url || null;
  if (Array.isArray(data.products)) {
    for (const p of data.products) {
      const category_id = slugToCategoryId.get(p.category_slug);
      if (!category_id) continue;
      // Upsert by id (SKU)
      const [record] = await Product.findOrCreate({
        where: { id: p.id },
        defaults: {
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description || null,
          recommended_uses: p.recommended_uses || null,
          properties: p.properties || null,
          price: p.price,
          image_url: p.image_url || defaultImage,
          stock: p.stock ?? 0,
          category_id,
          is_featured: !!p.is_featured,
          is_new: !!p.is_new,
        },
      });
      // Optionally update if exists
      if (record && p._update === true) {
        await record.update({
          name: p.name,
          slug: p.slug,
          description: p.description || null,
          recommended_uses: p.recommended_uses || null,
          properties: p.properties || null,
          price: p.price,
          image_url: p.image_url || defaultImage,
          stock: p.stock ?? record.stock,
          category_id,
          is_featured: !!p.is_featured,
          is_new: !!p.is_new,
        });
      }
    }
    // Fix sequences for explicit IDs
    await sequelize.query("SELECT setval(pg_get_serial_sequence('products','id'), (SELECT MAX(id) FROM products));");
  }

  return true;
}

async function importDiscountsIfPresent() {
  const file = path.join(__dirname, 'data', 'discounts.json');
  if (!fs.existsSync(file)) return false;
  const raw = fs.readFileSync(file, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (_) {
    console.error('discounts.json inválido');
    return false;
  }
  if (!Array.isArray(data) || data.length === 0) return false;
  const count = await Discount.count();
  if (count > 0) return true; // ya hay descuentos
  await Discount.bulkCreate(data.map(d => ({
    type: d.type,
    sku_from: d.sku_from ?? null,
    sku_to: d.sku_to ?? null,
    qty_from: d.qty_from ?? null,
    qty_to: d.qty_to ?? null,
    value: d.value,
    start_date: d.start_date,
    end_date: d.end_date,
    product_id: d.product_id ?? null,
  })));
  return true;
}

async function populateDB() {
  try {
    // Evitar duplicados en cargas repetidas
    const categoriesCount = await Category.count();
    // Intentar importar catálogo completo desde data/catalog.json si existe
    const imported = await importCatalogIfPresent();
    if (!imported && categoriesCount === 0) {
      const catElectronics = await Category.create({ name: 'Electronics', slug: 'electronics', description: 'Electronic devices and gadgets', image_url: 'https://picsum.photos/seed/electronics/800/400', display_order: 1 });
      const catFashion = await Category.create({ name: 'Fashion', slug: 'fashion', description: 'Clothing and accessories', image_url: 'https://picsum.photos/seed/fashion/800/400', display_order: 2 });

      await Product.bulkCreate([
        { name: 'Smartphone X', slug: 'smartphone-x', description: '6.5" OLED, 128GB', recommended_uses: 'Uso diario, fotografía, redes sociales', properties: 'Pantalla OLED, 128GB, 5G', price: 699.99, image_url: 'https://picsum.photos/seed/phone/600/600', stock: 50, category_id: catElectronics.id, is_featured: true, is_new: true },
        { name: 'Wireless Headphones', slug: 'wireless-headphones', description: 'Noise cancelling', recommended_uses: 'Viajes, oficina, gimnasio', properties: 'Bluetooth 5.2, ANC', price: 149.99, image_url: 'https://picsum.photos/seed/headphones/600/600', stock: 120, category_id: catElectronics.id, is_featured: true },
        { name: 'T-Shirt Basic', slug: 'tshirt-basic', description: 'Cotton, unisex', recommended_uses: 'Diario, casual', properties: '100% algodón, varias tallas', price: 19.99, image_url: 'https://picsum.photos/seed/tshirt/600/600', stock: 200, category_id: catFashion.id, is_new: true }
      ]);
    }

    // Descuentos: intentar importar desde data/discounts.json; si no, seed por defecto
    const importedDiscounts = await importDiscountsIfPresent();
    if (!importedDiscounts) {
      const discountCount = await Discount.count();
      if (discountCount === 0) {
        await Discount.bulkCreate([
          // AMOUNT por rango de montos (usa qty_from/qty_to como rango de monto en Gs)
          { type: 'AMOUNT', qty_from: 1000001, qty_to: 999999999, value: 25, start_date: '2025-04-01', end_date: '9999-01-01' },
          { type: 'AMOUNT', qty_from: 500001, qty_to: 999999, value: 20, start_date: '2025-04-01', end_date: '9999-01-01' },
          { type: 'AMOUNT', qty_from: 200001, qty_to: 500000, value: 15, start_date: '2025-04-01', end_date: '9999-01-01' },
          { type: 'AMOUNT', qty_from: 65001, qty_to: 200000, value: 10, start_date: '2025-04-01', end_date: '9999-01-01' },
          { type: 'AMOUNT', qty_from: 20000, qty_to: 65000, value: 5, start_date: '2025-04-01', end_date: '9999-01-01' },
          // PRODUCT: descuento por SKU/producto específico (ejemplo 300000231 con 20%)
          { type: 'PRODUCT', product_id: 300000231, value: 20, start_date: '2025-04-02', end_date: '9999-01-02' },
        ]);
      }
    }
  } catch (err) {
    console.error('Error populating DB', err);
  }
}

module.exports = { populateDB };
