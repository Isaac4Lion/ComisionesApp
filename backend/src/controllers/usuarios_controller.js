import Usuarios from "../models/Usuarios.js"
import generarJWT from '../helpers/JWT.js'

const login = async (req,res)=>{
    const {
        email,
        password
    } = req.body

    // Validar que los campos no estén vacíos
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    // Validar que el email exista en la base de datos
    const usuario = await Usuarios.findOne({email})
    if(!usuario) return res.status(400).json({msg:"Lo sentimos, el email no existe"})
    // Validar que la contraseña sea correcta
    const matchPassword = await usuario.matchPassword(password)
    if(!matchPassword) return res.status(400).json({msg:"Lo sentimos, la contraseña es incorrecta"})
    // Validar si el correo esta confirmado
    if(!usuario?.confirmarEmail) return res.status(400).json({msg:"Lo sentimos, debes confirmar tu correo"})
    
    // Crear un token
    const token = generarJWT(usuario._id,'usuario')
    const {nombre, apellido, email:correo} = usuario
    // Responder con el token
    res.status(200).json({
        token,
        data: {nombre, apellido, correo},
        msg:"Inicio de sesión exitoso"
    })
}

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
    login,
    verificarToken,
}