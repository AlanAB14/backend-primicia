const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { getPromocionesEspeciales, getPromocionesEspecialesConImagen, getPromocionEspecial, createPromocionEspecial, updatePromocionEspecial, deletePromocionEspecial } = require('../controllers/promocionesEspeciales.controller.js');

const router = Router();

// Promociones
router.get('/promocionesEspeciales', getPromocionesEspeciales);

// Promociones con imagen
router.get('/promocionesEspecialesConImagen', getPromocionesEspecialesConImagen);

router.get('/promocionesEspeciales/:id', getPromocionEspecial);

router.post('/promocionesEspeciales', verificarToken, createPromocionEspecial);

router.patch('/promocionesEspeciales/:id', verificarToken, updatePromocionEspecial);

router.delete('/promocionesEspeciales/:id', verificarToken, deletePromocionEspecial);

module.exports = router;
