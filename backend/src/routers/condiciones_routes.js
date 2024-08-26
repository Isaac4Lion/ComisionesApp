import { Router } from "express";
import { crearCondicion, detalleCondicion, eliminarCondicion, listarCondiciones, modificarCondicion } from "../controllers/condiciones_controller.js";
import { verificarAutenticacion } from "../middlewares/auth.js";

const router = Router()

router.get('/condiciones', verificarAutenticacion, listarCondiciones)
router.get('/condicion/:id', verificarAutenticacion ,detalleCondicion)
router.post('/condicion', verificarAutenticacion, crearCondicion)
router.put('/condicion/:id',verificarAutenticacion, modificarCondicion)
router.delete('/condicion/:id',verificarAutenticacion ,eliminarCondicion)

export default router