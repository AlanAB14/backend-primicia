import { Router } from 'express'
import { verificarToken } from '../middleware/verificarToken.js'
import { createComercio, deleteComercio, getComercio, getComercios, getComerciosPorCategoria, getComerciosPorFilial, getComerciosPorPromocion, updateComercio } from '../controllers/comercios.controller.js'


const router = Router()

router.get('/comercios', getComercios)

router.get('/comercios/:id', getComercio)

router.get('/comerciosPorFilial/:id', getComerciosPorFilial)

router.get('/comerciosPorCategoria/:id', getComerciosPorCategoria)

router.get('/comerciosPorPromocion/:id', getComerciosPorPromocion)

router.post('/comercios', verificarToken, createComercio)

router.patch('/comercios/:id', verificarToken, updateComercio)

router.delete('/comercios/:id', deleteComercio)


export default router;