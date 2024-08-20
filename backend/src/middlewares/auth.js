import jwt from "jsonwebtoken";
import Administradores from "../models/Administradores.js";

const verificarAutenticacion = async (req,res, next) => {
    if(!req.headers.authorization){return res.status(404).json({msg: "Lo sentimos debes proporcionar un token."})}
    const {authorization} = req.headers
    try {
        const {id, rol} = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET)
        if (rol === 'admin'){
            req.admin = await Administradores.findById(id).lean().select('-password')
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

export {
    verificarAutenticacion
}