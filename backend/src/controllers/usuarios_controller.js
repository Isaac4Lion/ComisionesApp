import Usuarios from "../models/Usuarios.js"

const verificarToken = async (req, res)=>{
    const {token} = req.params
    const usuario = await Usuarios.findOne({token})
    if(!usuario) {return res.status(400).json({msg:"Lo sentimos, el token no es válido"})}
    usuario.confirmarEmail = true
    usuario.token = null
    await usuario.save()
    res.status(200).json({msg:"Correo confirmado exitosamente"})
}

export {
    verificarToken,
}