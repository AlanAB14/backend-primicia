const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { updateComision, getComisiones } = require('../controllers/comisiones.controller.js');

const router = Router();

router.get('/comisiones', getComisiones);

router.patch('/comisiones/:id', verificarToken, updateComision);

module.exports = router;
