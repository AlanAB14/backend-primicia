import { Router } from 'express'
import { verificarToken } from '../middleware/verificarToken.js'
import { createPregunta, deletePregunta, getPreguntas, updatePregunta } from '../controllers/preguntas.controller.js'


const router = Router()

router.get('/preguntas', getPreguntas)

router.post('/preguntas', verificarToken, createPregunta)

router.patch('/preguntas/:id', verificarToken, updatePregunta)

router.delete('/preguntas/:id', deletePregunta)


export default router;