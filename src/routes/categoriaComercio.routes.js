import { Router } from 'express'
import { verificarToken } from '../middleware/verificarToken.js'
import { createCategoria, deleteCategoria, getCategoria, getCategorias, updateCategoria } from '../controllers/categoriasComercio.controller.js'


const router = Router()

router.get('/categorias', getCategorias)

router.get('/categorias/:id', getCategoria)

router.post('/categorias', verificarToken, createCategoria)

router.patch('/categorias/:id', verificarToken, updateCategoria)

router.delete('/categorias/:id', verificarToken, deleteCategoria)


export default router;