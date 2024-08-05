import {Router} from 'express'

const router = Router()

import { 
    registrarComision, 
    eliminarUltimaComision, 
} from '../controllers/comisiones_controller.js'


//CRUD Comisiones
router.post('/comisiones/eliminar-ultima-comision', eliminarUltimaComision)
router.put('/comisiones/:id', registrarComision)


export default router