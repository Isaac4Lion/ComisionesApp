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
const actualizarPassword = async (req,res)=>{
    if(Object.values(req.body).includes("")){return res.status(400).json({msg:"Completa todos los campos, por favor."})}
    const usuarioBDD = await Usuarios.findById(req.user._id)
    if(!usuarioBDD) {return res.status(404).json({msg:`Lo sentimos, no existe ese usuario`})}
    const verificarPassword = await usuarioBDD.matchPassword(req.body.actual_password)
    if(!verificarPassword){ return res.status(404).json({msg:"Lo sentimos, la contraseña es incorrecta."})}
    if (req.body.nueva_password !== req.body.confirmar_nueva_password){return res.status(400).json({msg:"Las contraseñas no coinciden"})}
    usuarioBDD.password = await usuarioBDD.encrypPassword(req.body.nueva_password)
    await usuarioBDD.save()
    res.status(200).json({msg:"Contraseña actualizada correctamente"})
}

export {
    verificarToken,
    actualizarPassword
}