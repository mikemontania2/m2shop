const { Router } = require('express');
const { Discount } = require('../models');
const { Op } = require('sequelize');
const router = Router();

router.get('/', async (_req, res) => {
  const now = new Date();
  const items = await Discount.findAll({
    where: {
      start_date: { [Op.lte]: now },
      end_date: { [Op.gte]: now },
    },
    order: [['type', 'ASC'], ['value', 'DESC']],
  });
  res.json(items);
});

module.exports = router;
