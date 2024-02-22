const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { createPromocion, deletePromocion, getPromocion, getPromociones, updatePromocion, getPromocionesConImagen } = require('../controllers/promociones.controller.js');

const router = Router();

// Promociones
router.get('/promociones', getPromociones);

// Promociones con imagen
router.get('/promocionesConImagen', getPromocionesConImagen);

router.get('/promociones/:id', getPromocion);

router.post('/promociones', verificarToken, createPromocion);

router.patch('/promociones/:id', verificarToken, updatePromocion);

router.delete('/promociones/:id', verificarToken, deletePromocion);

module.exports = router;
