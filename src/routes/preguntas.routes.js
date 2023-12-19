const { Router } = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const {
  createPregunta,
  deletePregunta,
  getPreguntas,
  updatePregunta,
} = require('../controllers/preguntas.controller.js');

const router = Router();

router.get('/preguntas', getPreguntas);

router.post('/preguntas', verificarToken, createPregunta);

router.patch('/preguntas/:id', verificarToken, updatePregunta);

router.delete('/preguntas/:id', deletePregunta);

module.exports = router;
