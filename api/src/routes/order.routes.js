const { Router } = require('express');
const ctrl = require('../controllers/order.controller');
const router = Router();

router.post('/', ctrl.create);
router.get('/my/:customerId', ctrl.listMy);
router.post('/:id/repeat', ctrl.repeat);

module.exports = router;
