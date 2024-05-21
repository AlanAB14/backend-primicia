const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { createTasa, deleteTasa, getTasas, updateTasa, getTasasFecha, updateTasaFecha } = require('../controllers/tasas.controller.js');

const router = Router();

router.get('/tasas', getTasas);

router.get('/tasasFecha', getTasasFecha);

router.post('/tasas', verificarToken, createTasa);

router.patch('/tasas/:id', verificarToken, updateTasa);

router.patch('/tasasFecha', verificarToken, updateTasaFecha);

router.delete('/tasas/:id', verificarToken, deleteTasa);

module.exports = router;
