import { Router } from "express";
import { verificarToken } from "../controllers/usuarios_controller.js";

const router = Router()

router.get('/usuario/verificar-token/:token', verificarToken)

export default router