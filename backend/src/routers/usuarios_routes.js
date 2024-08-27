import { Router } from "express";
import { actualizarPassword, verificarToken } from "../controllers/usuarios_controller.js";

const router = Router()

router.get('/usuario/verificar-token/:token', verificarToken)
router.put('/usuario/actualizar-password', verificarAutenticacion, actualizarPassword)

export default router