const { Router } = require('express');
const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Ruta de ejemplo M2POS/ejemplo' });
});

module.exports = router;
