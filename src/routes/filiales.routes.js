import { Router } from 'express'
import { verificarToken } from '../middleware/verificarToken.js'
import { createFilial, deleteFilial, getFilial, getFiliales, updateFilial } from '../controllers/filiales.controller.js'


const router = Router()

router.get('/filiales', getFiliales)

router.get('/filiales/:id', getFilial)

router.post('/filiales', verificarToken, createFilial)

router.patch('/filiales/:id', verificarToken, updateFilial)

router.delete('/filiales/:id', deleteFilial)


export default router;