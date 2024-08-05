import {Router} from 'express'

const router = Router()

import { 
    exportarExcel,
    importarExcel,
    subirBDD,
} from '../controllers/archivosxlsx_controller.js'

import { 
    detalleLote, 
    registrarLote,
    modificarLote,
    eliminarLote,
    listarLotesQuery
} from '../controllers/lotes_controller.js'


//Rutas XLSX
router.post('/importar-excel', importarExcel)
router.get('/exportar-excel', exportarExcel)
router.get('/subir-bdd', subirBDD)

//Rutas Lotes
router.get('/lotes', listarLotesQuery)

router.post('/lotes/registrar', registrarLote)
router.put('/lotes/:id', modificarLote)
router.delete('/lotes/:id', eliminarLote)

router.get('/lotes/:id', detalleLote)

export default router