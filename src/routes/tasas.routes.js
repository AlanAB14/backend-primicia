import { Router } from 'express'
import { verificarToken } from '../middleware/verificarToken.js'
import { createTasa, deleteTasa, getTasas, updateTasa } from '../controllers/tasas.controller.js'


const router = Router()

router.get('/tasas', getTasas)

router.post('/tasas', verificarToken, createTasa)

router.patch('/tasas/:id', verificarToken, updateTasa)

router.delete('/tasas/:id', verificarToken, deleteTasa)


export default router;