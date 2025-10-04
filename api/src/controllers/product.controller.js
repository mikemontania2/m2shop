const { Product, Category, Discount } = require('../models');
const { Op } = require('sequelize');

async function list(req, res) {
  const { category_slug, is_featured, is_new, search } = req.query;

  const where = {};
  if (typeof is_featured !== 'undefined') where.is_featured = is_featured === 'true';
  if (typeof is_new !== 'undefined') where.is_new = is_new === 'true';
  if (typeof search === 'string' && search.trim() !== '') where.name = { [Op.iLike]: `%${search}%` };

  const include = [];
  if (category_slug) {
    include.push({ model: Category, where: { slug: category_slug } });
  } else {
    include.push(Category);
  }

  const items = await Product.findAll({ include, where, order: [["created_at", "DESC"]] });
  // Calcular descuento PRODUCT vigente y precio final
  const now = new Date();
  for (const it of items) {
    const pd = await Discount.findOne({
      where: {
        type: 'PRODUCT',
        [Op.and]: [
          { start_date: { [Op.lte]: now } },
          { end_date: { [Op.gte]: now } },
        ],
        [Op.or]: [
          { product_id: it.id },
          {
            product_id: null,
            sku_from: { [Op.lte]: it.id },
            sku_to: { [Op.gte]: it.id },
          },
        ],
      }
    });
    const price = Number(it.price);
    const iva = Number(it.iva ?? 10);
    const percent = pd ? Number(pd.value) : 0;
    it.setDataValue('discount_percent', percent);
    it.setDataValue('price_with_discount', percent > 0 ? price * (1 - percent / 100) : price);
    it.setDataValue('iva', iva);
  }
  res.json(items);
}

async function get(req, res) {
  const item = await Product.findByPk(req.params.id, { include: Category });
  if (!item) return res.status(404).json({ message: 'Product not found' });
  const now = new Date();
  const pd = await Discount.findOne({
    where: {
      type: 'PRODUCT',
      [Op.and]: [
        { start_date: { [Op.lte]: now } },
        { end_date: { [Op.gte]: now } },
      ],
      [Op.or]: [
        { product_id: item.id },
        {
          product_id: null,
          sku_from: { [Op.lte]: item.id },
          sku_to: { [Op.gte]: item.id },
        },
      ],
    },
  });
  const price = Number(item.price);
  const iva = Number(item.iva ?? 10);
  const percent = pd ? Number(pd.value) : 0;
  item.setDataValue('discount_percent', percent);
  item.setDataValue('price_with_discount', percent > 0 ? price * (1 - percent / 100) : price);
  item.setDataValue('iva', iva);
  res.json(item);
}

async function getBySlug(req, res) {
  const item = await Product.findOne({ where: { slug: req.params.slug }, include: Category });
  if (!item) return res.status(404).json({ message: 'Product not found' });
  const now = new Date();
  const pd = await Discount.findOne({
    where: {
      type: 'PRODUCT',
      [Op.and]: [
        { start_date: { [Op.lte]: now } },
        { end_date: { [Op.gte]: now } },
      ],
      [Op.or]: [
        { product_id: item.id },
        {
          product_id: null,
          sku_from: { [Op.lte]: item.id },
          sku_to: { [Op.gte]: item.id },
        },
      ],
    },
  });
  const price = Number(item.price);
  const iva = Number(item.iva ?? 10);
  const percent = pd ? Number(pd.value) : 0;
  item.setDataValue('discount_percent', percent);
  item.setDataValue('price_with_discount', percent > 0 ? price * (1 - percent / 100) : price);
  item.setDataValue('iva', iva);
  res.json(item);
}

async function create(req, res) {
  const item = await Product.create(req.body);
  res.status(201).json(item);
}

async function update(req, res) {
  const item = await Product.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Product not found' });
  await item.update(req.body);
  res.json(item);
}

async function remove(req, res) {
  const item = await Product.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Product not found' });
  await item.destroy();
  res.status(204).send();
}

module.exports = { list, get, create, update, remove };
module.exports.getBySlug = getBySlug;
