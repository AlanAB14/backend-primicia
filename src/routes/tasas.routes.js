const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { createTasa, deleteTasa, getTasas, updateTasa } = require('../controllers/tasas.controller.js');

const router = Router();

router.get('/tasas', getTasas);

router.post('/tasas', verificarToken, createTasa);

router.patch('/tasas/:id', verificarToken, updateTasa);

router.delete('/tasas/:id', verificarToken, deleteTasa);

module.exports = router;
