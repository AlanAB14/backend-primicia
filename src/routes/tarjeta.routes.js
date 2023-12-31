const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { createTarjeta, deleteTarjeta, getTarjeta, getTarjetas } = require('../controllers/tarjeta.controller.js');

const router = Router();

router.get('/tarjeta', verificarToken, getTarjetas);

router.get('/tarjeta/:id', verificarToken, getTarjeta);

router.post('/tarjeta', createTarjeta);

router.delete('/tarjeta/:id', verificarToken, deleteTarjeta);

module.exports = router;
