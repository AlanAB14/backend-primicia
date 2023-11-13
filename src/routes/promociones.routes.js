import { Router } from 'express'
import { verificarToken } from '../middleware/verificarToken.js'
import { createPromocion, deletePromocion, getPromocion, getPromociones, updatePromocion } from '../controllers/promociones.controller.js'


const router = Router()

router.get('/promociones', getPromociones)

router.get('/promociones/:id', getPromocion)

router.post('/promociones', verificarToken, createPromocion)

router.patch('/promociones/:id', verificarToken, updatePromocion)

router.delete('/promociones/:id', verificarToken, deletePromocion)


export default router;