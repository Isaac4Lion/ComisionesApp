import {Router} from 'express'

const router = Router()

import { 
    registrarComision, 
    eliminarUltimaComision, 
} from '../controllers/comisiones_controller.js'
import { verificarAutenticacion } from '../middlewares/auth.js'


//CRUD Comisiones
router.post('/comisiones/eliminar-ultima-comision', verificarAutenticacion, eliminarUltimaComision)
router.put('/comisiones/:id', verificarAutenticacion, registrarComision)


export default router