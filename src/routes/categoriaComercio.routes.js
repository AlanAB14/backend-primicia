const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const {
  createCategoria,
  deleteCategoria,
  getCategoria,
  getCategorias,
  updateCategoria,
} = require('../controllers/categoriasComercio.controller.js');

const router = Router();

router.get('/categorias', getCategorias);

router.get('/categorias/:id', getCategoria);

router.post('/categorias', verificarToken, createCategoria);

router.patch('/categorias/:id', verificarToken, updateCategoria);

router.delete('/categorias/:id', verificarToken, deleteCategoria);

module.exports = router;
