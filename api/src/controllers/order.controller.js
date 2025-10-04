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
      subtotal: 0,
      importe_descuento: 0,
      porcentaje_descuento: 0,
      importe_iva: 0,
      total: 0,
    }, { transaction: trx });

    // Acumuladores
    let subtotal = 0; // Suma de precios sin descuentos
    let productDiscountAmount = 0; // Descuentos por PRODUCT
    let amountEligibleSubtotal = 0; // Subtotal elegible para AMOUNT (líneas sin descuento PRODUCT)

    // Guardar líneas para prorratear el descuento AMOUNT e IVA luego
    const lineItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.product_id, { transaction: trx, lock: trx.LOCK.UPDATE });
      if (!product) throw new Error('Product not found: ' + item.product_id);
      const quantity = Math.max(1, Number(item.quantity || 1));
      if (product.stock < quantity) throw new Error('Insufficient stock for product ' + product.id);

      // Buscar descuento PRODUCT vigente
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
      subtotal += lineSubtotal;

      const productIvaPercent = Number(product.iva ?? 10);

      const productDiscountPercent = productDiscount ? Number(productDiscount.value) : 0;
      const lineAfterProduct = productDiscountPercent > 0
        ? lineSubtotal * (1 - productDiscountPercent / 100)
        : lineSubtotal;
      const lineProductDiscount = lineSubtotal - lineAfterProduct;
      productDiscountAmount += lineProductDiscount;

      const eligibleForAmount = !productDiscount;
      if (eligibleForAmount) {
        amountEligibleSubtotal += lineSubtotal;
      }

      // Persistir item del pedido al precio original (auditoría)
      await OrderItem.create({
        order_id: order.id,
        product_id: product.id,
        quantity,
        price: product.price,
      }, { transaction: trx });

      // Actualizar stock
      product.stock = product.stock - quantity;
      await product.save({ transaction: trx });

      lineItems.push({
        productId: product.id,
        quantity,
        ivaPercent: productIvaPercent,
        lineSubtotal,
        lineAfterProduct,
        eligibleForAmount,
      });
    }

    // Descuento por monto (AMOUNT) prorrateado en las líneas elegibles
    let amountDiscountPercent = 0;
    let amountDiscountValue = 0;
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
        order: [['value', 'DESC']],
        transaction: trx,
      });
      if (amountRule) {
        amountDiscountPercent = Number(amountRule.value);
        amountDiscountValue = amountEligibleSubtotal * (amountDiscountPercent / 100);
      }
    }

    // Calcular prorrateo AMOUNT e IVA
    let totalAfterAllDiscounts = 0;
    let importeIva = 0;
    for (const li of lineItems) {
      let proratedAmountDiscount = 0;
      if (amountDiscountValue > 0 && li.eligibleForAmount && amountEligibleSubtotal > 0) {
        const weight = li.lineSubtotal / amountEligibleSubtotal;
        proratedAmountDiscount = amountDiscountValue * weight;
      }
      const finalLineAmount = li.lineAfterProduct - proratedAmountDiscount;
      totalAfterAllDiscounts += finalLineAmount;
      importeIva += finalLineAmount * (li.ivaPercent / 100);
    }

    const importeDescuento = (subtotal - totalAfterAllDiscounts);
    const porcentajeDescuento = subtotal > 0 ? (importeDescuento / subtotal) * 100 : 0;
    const total = totalAfterAllDiscounts + importeIva;

    order.subtotal = subtotal;
    order.importe_descuento = importeDescuento;
    order.porcentaje_descuento = porcentajeDescuento;
    order.importe_iva = importeIva;
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
