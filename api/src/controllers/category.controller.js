const { Category } = require('../models');

async function list(req, res) {
  const items = await Category.findAll({ order: [["display_order", "ASC"], ["id", "ASC"]] });
  res.json(items);
}

async function get(req, res) {
  const item = await Category.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Category not found' });
  res.json(item);
}

async function create(req, res) {
  const item = await Category.create(req.body);
  res.status(201).json(item);
}

async function update(req, res) {
  const item = await Category.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Category not found' });
  await item.update(req.body);
  res.json(item);
}

async function remove(req, res) {
  const item = await Category.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Category not found' });
  await item.destroy();
  res.status(204).send();
}

module.exports = { list, get, create, update, remove };
