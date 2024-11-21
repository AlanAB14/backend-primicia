const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { getHabilitarFunciones, getHabilitarFuncion, updateHabilitarFuncion } = require('../controllers/habilitarFuncion.controller.js');

const router = Router();

router.get('/habilitarFuncion', getHabilitarFunciones);

router.get('/habilitarFuncion/:id', getHabilitarFuncion);

router.patch('/habilitarFuncion/:id', verificarToken, updateHabilitarFuncion);

module.exports = router;
