import { Router } from "express";
import { 
    login, 
    registrarUsuario, 
    registrarAdministrador, 
    verificarToken, 
    listarUsuarios, 
    eliminarUsuario, 
    eliminarAdmin 
} from "../controllers/administrador_controller.js";
import { verificarAutenticacion } from '../middlewares/auth.js'

const router = Router()

router.post('/login', login)
router.post('/admin/usuario', verificarAutenticacion, registrarUsuario)
router.post('/admin/admin', registrarAdministrador)
router.get('/admin/verificar-token/:token', verificarToken)
router.get('/admin/usuarios', listarUsuarios)
router.delete('/admin/usuario/:id', eliminarUsuario)
router.delete('/admin/admin/:id', eliminarAdmin)

export default router