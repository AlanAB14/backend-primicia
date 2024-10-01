const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { getCostoFinanciero, updateCostoFinanciero } = require('../controllers/costoFinanciero.controller.js');

const router = Router();

router.get('/costoFinanciero', getCostoFinanciero);

router.patch('/costoFinanciero/:id', verificarToken, updateCostoFinanciero);

module.exports = router;
