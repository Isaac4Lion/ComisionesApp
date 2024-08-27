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
    listarLotesQuery,
    listarLotesDesistidos,
    eliminarLotePemanentemente,
    resolverLoteDesistido
} from '../controllers/lotes_controller.js'
import { verificarAutenticacion } from '../middlewares/auth.js'


//Rutas XLSX
router.post('/importar-excel', verificarAutenticacion, importarExcel)
router.get('/exportar-excel', verificarAutenticacion, exportarExcel)
router.get('/subir-bdd', verificarAutenticacion, subirBDD)

//Rutas Lotes
router.get('/lotes', verificarAutenticacion, listarLotesQuery)
router.get('/lotes-desistidos', verificarAutenticacion, listarLotesDesistidos)

router.post('/lotes/registrar', verificarAutenticacion, registrarLote)
router.put('/lotes/:id', verificarAutenticacion, modificarLote)
router.get('/lotes-desistidos/:id', verificarAutenticacion, resolverLoteDesistido)
router.delete('/lotes/:id', verificarAutenticacion, eliminarLote)
router.delete('/lotes-desistidos/:id', verificarAutenticacion, eliminarLotePemanentemente)

router.get('/lotes/:id', verificarAutenticacion, detalleLote)

export default router