const { sequelize, Order, OrderItem, Product, Discount } = require('../models');
const { Op } = require('sequelize');

async function create(req, res) {
  const { customer_id, customer_name, customer_email, customer_phone, shipping_address, items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Order items are required' });
  }

  const trx = await sequelize.transaction();
  try {
    const order = await Order.create({
      customer_id: customer_id || null,
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      status: 'pending',
      total: 0,
    }, { transaction: trx });

    let total = 0;
    let amountEligibleSubtotal = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.product_id, { transaction: trx, lock: trx.LOCK.UPDATE });
      if (!product) throw new Error('Product not found: ' + item.product_id);
      const quantity = Math.max(1, Number(item.quantity || 1));
      if (product.stock < quantity) throw new Error('Insufficient stock for product ' + product.id);

      // Aplicar descuento PRODUCT si existe y vigente
      const now = new Date();
      const productDiscount = await Discount.findOne({
        where: {
          type: 'PRODUCT',
          [Op.and]: [
            { start_date: { [Op.lte]: now } },
            { end_date: { [Op.gte]: now } },
          ],
          [Op.or]: [
            { product_id: product.id },
            {
              product_id: null,
              sku_from: { [Op.lte]: product.id },
              sku_to: { [Op.gte]: product.id },
            },
          ],
        },
        transaction: trx,
        lock: trx.LOCK.UPDATE,
      });

      const unitPrice = Number(product.price);
      const lineSubtotal = unitPrice * quantity;
      let discountPercent = 0;
      if (productDiscount) {
        discountPercent = Number(productDiscount.value);
      }

      const discounted = discountPercent > 0 ? lineSubtotal * (1 - discountPercent / 100) : lineSubtotal;

      await OrderItem.create({ order_id: order.id, product_id: product.id, quantity, price: product.price }, { transaction: trx });

      product.stock = product.stock - quantity;
      await product.save({ transaction: trx });

      total += discounted;
      if (!productDiscount) {
        amountEligibleSubtotal += lineSubtotal;
      }
    }

    // Aplicar descuento AMOUNT al subtotal elegible (sin PRODUCT)
    if (amountEligibleSubtotal > 0) {
      const now = new Date();
      const amountRule = await Discount.findOne({
        where: {
          type: 'AMOUNT',
          qty_from: { [Op.lte]: amountEligibleSubtotal },
          qty_to: { [Op.gte]: amountEligibleSubtotal },
          start_date: { [Op.lte]: now },
          end_date: { [Op.gte]: now },
        },
        order: [[ 'value', 'DESC' ]],
        transaction: trx,
      });
      if (amountRule) {
        const percent = Number(amountRule.value);
        const discountValue = amountEligibleSubtotal * (percent / 100);
        total -= discountValue;
      }
    }

    order.total = total;
    await order.save({ transaction: trx });

    await trx.commit();
    res.status(201).json(order);
  } catch (err) {
    await trx.rollback();
    res.status(400).json({ message: err.message || 'Error creating order' });
  }
}

async function listMy(req, res) {
  const customerId = Number(req.params.customerId);
  if (!customerId) return res.status(400).json({ message: 'customerId requerido' });
  const orders = await Order.findAll({ where: { customer_id: customerId }, order: [["created_at", "DESC"]] });
  res.json(orders);
}

async function repeat(req, res) {
  const id = Number(req.params.id);
  const original = await Order.findByPk(id, { include: [{ model: Product }] });
  if (!original) return res.status(404).json({ message: 'Pedido no encontrado' });
  // Nota: para simplificar, duplicamos sin validar stock aquí
  const items = await OrderItem.findAll({ where: { order_id: id } });
  const payload = {
    customer_id: original.customer_id || null,
    customer_name: original.customer_name,
    customer_email: original.customer_email,
    customer_phone: original.customer_phone,
    shipping_address: original.shipping_address,
    items: items.map(i => ({ product_id: i.product_id, quantity: i.quantity }))
  };
  req.body = payload;
  return create(req, res);
}

module.exports = { create, listMy, repeat };
