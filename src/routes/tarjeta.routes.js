import { Router } from 'express'
import { verificarToken } from '../middleware/verificarToken.js'
import { createTarjeta, deleteTarjeta, getTarjeta, getTarjetas } from '../controllers/tarjeta.controller.js'

const router = Router()

router.get('/tarjeta', verificarToken, getTarjetas)

router.get('/tarjeta/:id', verificarToken, getTarjeta)

router.post('/tarjeta', createTarjeta)

router.delete('/tarjeta/:id', verificarToken, deleteTarjeta)

export default router;