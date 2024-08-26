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
import perfil from "../controllers/perfil.js";

const router = Router()

router.post('/login', login)
router.get('/perfil', verificarAutenticacion, perfil)
router.post('/admin/usuario', verificarAutenticacion, registrarUsuario)
router.post('/admin/admin',verificarAutenticacion, registrarAdministrador)
router.get('/admin/verificar-token/:token', verificarToken)
router.get('/admin/usuarios', verificarAutenticacion, listarUsuarios)
router.delete('/admin/usuario/:id',verificarAutenticacion, eliminarUsuario)
router.delete('/admin/admin/:id', verificarAutenticacion, eliminarAdmin)

export default router