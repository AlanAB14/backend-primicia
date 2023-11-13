import { Router } from 'express'
import { verificarToken } from '../middleware/verificarToken.js'
import { createContacto, deleteContacto, getContacto, getContactos } from '../controllers/contacto.controller.js'

const router = Router()

router.get('/contacto', verificarToken, getContactos)

router.get('/contacto/:id', verificarToken, getContacto)

router.post('/contacto', createContacto)

router.delete('/contacto/:id', verificarToken, deleteContacto)

export default router;