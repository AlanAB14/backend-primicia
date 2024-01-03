const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const {
  createFilial,
  deleteFilial,
  getFilial,
  getFiliales,
  updateFilial,
} = require('../controllers/filiales.controller.js');

const router = Router();

router.get('/filiales', getFiliales);

router.get('/filiales/:id', getFilial);

router.post('/filiales', verificarToken, createFilial);

router.patch('/filiales/:id', verificarToken, updateFilial);

router.delete('/filiales/:id', verificarToken, deleteFilial);

module.exports = router;
