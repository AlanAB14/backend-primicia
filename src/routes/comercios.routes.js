const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const {
  createComercio,
  deleteComercio,
  getComercio,
  getComercios,
  getComerciosPorCategoria,
  getComerciosPorFilial,
  getComerciosPorPromocion,
  updateComercio,
  getComerciosPorCategoriaYFilial,
  getComerciosPorFilialCategoriaPromocion,
} = require('../controllers/comercios.controller.js');

const router = Router();

router.get('/comercios', getComercios);

router.get('/comercios/:id', getComercio);

router.get('/comerciosPorFilial/:id', getComerciosPorFilial);

router.get('/comerciosPorCategoria/:id', getComerciosPorCategoria);

router.post('/comerciosPorFilialCategoriaPromocion', getComerciosPorFilialCategoriaPromocion);

router.post('/comerciosPorCategoriaYFilial', getComerciosPorCategoriaYFilial);

router.get('/comerciosPorPromocion/:id', getComerciosPorPromocion);

router.post('/comercios', verificarToken, createComercio);

router.patch('/comercios/:id', verificarToken, updateComercio);

router.delete('/comercios/:id', deleteComercio);

module.exports = router;
