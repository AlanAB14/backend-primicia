const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const {
  createContacto,
  deleteContacto,
  getContacto,
  getContactos,
} = require('../controllers/contacto.controller.js');

const router = Router();

router.get('/contacto', verificarToken, getContactos);

router.get('/contacto/:id', verificarToken, getContacto);

router.post('/contacto', createContacto);

router.delete('/contacto/:id', verificarToken, deleteContacto);

module.exports = router;
