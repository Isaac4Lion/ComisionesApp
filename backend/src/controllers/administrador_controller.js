import Administradores from "../models/Administradores"
import Usuarios from "../models/Usuarios"
import generarJWT from '../helpers/JWT.js'
import { sendMailToAdmin, sendMailToUser } from "../config/nodemailer.js"

const registrarUsuario = async (req,res) => {
    const {
        nombre,
        apellido,
        email,
        password
    } = req.body

    if (Object.values(req.body).includes("")) {return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})}
    
    const verificarEmail = await Usuarios.findOne({email})
    if(verificarEmail) {return res.status(400).json({msg:"Lo sentimos, el email ya existe"})}
    
    const usuario = new Usuarios({
        nombre,
        apellido,
        email,
        password
    })

    usuario.password = await usuario.encrypPassword(password)
    const token = usuario.crearToken()
    await usuario.save()
    sendMailToUser(email,password,token)

    res.status(200).json({res:'Registro exitoso, verifica tu email para confirmar tu cuenta'})
}
const registrarAdministrador = async (req,res) => {
    const {
        nombre_usuario,
        password,
        email
    } = req.body

    if (Object.values(req.body).includes("")) {return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})}
    
    const verificarEmail = await Administradores.findOne({email})
    if(verificarEmail) {return res.status(400).json({msg:"Lo sentimos, el email ya existe"})}
    
    const admin = new Administradores({
        nombre_usuario,
        password,
        email
    })

    admin.password = await admin.encrypPassword(password)
    const token = admin.crearToken()
    await admin.save()
    sendMailToAdmin(email,token)

    res.status(200).json({res:'Registro exitoso, verifica tu email para confirmar tu cuenta'})
}

const login = async(req,res) => {
    const {
        nombre_usuario,
        password
    } = req.body

    if (Object.values(req.body).includes("")){ return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})}
    
    const admin = await Usuarios.findOne({nombre_usuario})
    if(!admin) return res.status(400).json({msg:"Lo sentimos, el usuario no existe"})
    // Validar que la contraseña sea correcta
    const matchPassword = await admin.matchPassword(password)
    if(!matchPassword) return res.status(400).json({msg:"Lo sentimos, la contraseña es incorrecta"})
    // Validar si el correo esta confirmado
    if(!admin?.confirmarEmail) return res.status(400).json({msg:"Lo sentimos, debes confirmar tu correo"})
    
    // Crear un token
    const token = generarJWT(admin._id,'admin')
    const {nombre_usuario:nombre, email} = admin
    // Responder con el token
    res.status(200).json({
        token,
        data: {nombre, email},
        msg:"Inicio de sesión exitoso"
    })
}

const verificarToken = async (req, res)=>{
    const {token} = req.params
    const admin = await Administradores.findOne({token})
    if(!admin) {return res.status(400).json({msg:"Lo sentimos, el token no es válido"})}
    admin.confirmarEmail = true
    admin.token = null
    await admin.save()
    res.status(200).json({msg:"Correo confirmado exitosamente"})
}