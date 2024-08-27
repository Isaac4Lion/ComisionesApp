import jwt from "jsonwebtoken";
import Administradores from "../models/Administradores.js";
import Usuarios from "../models/Usuarios.js";

const verificarAutenticacion = async (req,res, next) => {
    if(!req.headers.authorization){return res.status(404).json({msg: "Lo sentimos debes proporcionar un token."})}
    const {authorization} = req.headers
    try {
        const {id, rol} = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET)
        if (rol === 'admin'){
            req.admin = await Administradores.findById(id).lean().select('-password')
            if (!req.admin) {
                return res.status(404).json({ msg: "Credenciales incorrectas." });
            }
            req.admin.rol = rol
            next()
        }else if(rol === 'usuario'){
            req.user = await Usuarios.findById(id).lean().select('-password -createdAt -confirmarEmail')
            if (!req.user) {
                return res.status(404).json({ msg: "Credenciales incorrectas." });
            }
            req.user.rol = rol
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

export {
    verificarAutenticacion
}