import { Router } from "express";
import { login, registrarUsuario, registrarAdministrador, verificarToken, listarUsuarios } from "../controllers/administrador_controller.js";

const router = Router()

router.post('/admin/registrar-usuario', registrarUsuario)
router.post('/admin/registrar-admin', registrarAdministrador)
router.get('/admin/verificar-token/:token', verificarToken)
router.get('/admin/usuarios', listarUsuarios)

export default router