import Administradores from "../models/Administradores.js"
import Usuarios from "../models/Usuarios.js"
import generarJWT from '../helpers/JWT.js'
import { sendMailToAdmin, sendMailToUser } from "../config/nodemailer.js"
import mongoose from "mongoose"

const registrarUsuario = async (req,res) => {
    const {
        nombre,
        apellido,
        email
    } = req.body

    if (Object.values(req.body).includes("")) {return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})}
    
    const verificarEmail = await Usuarios.findOne({email})
    if(verificarEmail) {return res.status(400).json({msg:"Lo sentimos, el email ya existe"})}

    const password = Math.random().toString(36).slice(-8);

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

    res.status(200).json({res:'Registro exitoso, se ha enviado un correo electrónico al usuario.'})
}
const registrarAdministrador = async (req,res) => {
    const {
        nombre_usuario,
        password,
        email
    } = req.body

    if (Object.values(req.body).includes("")) {return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})}
    
    const verificarNombreUsuario = await Administradores.findOne({nombre_usuario})
    if(verificarNombreUsuario) {return res.status(400).json({msg:"Lo sentimos, el nombre de usuario ya existe"})}

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

    res.status(200).json({res:'Registro exitoso, se ha enviado un correo electrónico al administrador.'})
}

const login = async(req,res) => {
    const {
        email,
        password
    } = req.body

    if (Object.values(req.body).includes("")){ return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})}
    
    const admin = await Administradores.findOne({email})
    if(!admin) {return res.status(400).json({msg:"Lo sentimos, el correo electrónico no está registrado"})}
    if(!admin?.confirmarEmail) {return res.status(400).json({msg:"Lo sentimos, debes confirmar tu correo"})}
    // Validar que la contraseña sea correcta
    const matchPassword = await admin.matchPassword(password)
    if(!matchPassword) return res.status(400).json({msg:"Lo sentimos, la contraseña es incorrecta"})
    // Validar si el correo esta confirmado
    
    // Crear un token
    const token = generarJWT(admin._id,'admin')
    const {nombre_usuario:nombre, email:correo} = admin
    // Responder con el token
    res.status(200).json({
        token,
        data: {nombre, correo},
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

const listarUsuarios = async (req,res) => {
    try {
        const usuarios = await Usuarios.find()
            .sort({createdAt:-1})
            .select('-password -token -__v')
            .lean();
            const admins = await Administradores.find()
            .sort({createdAt:-1})
            .select('-password -token -__v')
            .lean();
        
        return res.status(200).json({usuarios:usuarios, admins:admins});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const eliminarUsuario = async (req,res) => {
    const {id} = req.params
    if (!mongoose.isValidObjectId(id)){ return res.status(400).json({msg: "ID inválido"})}
    try {
        await Usuarios.findByIdAndDelete(id)
        return res.status(200).json({msg: "Se ha eliminado el usuario exitosamente."})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error.message})
    }
}

const eliminarAdmin = async (req,res) => {
    const {id} = req.params
    const administradores = await Administradores.find({confirmarEmail:true})
    if (administradores.length === 1){ 
        const id_admin = administradores[0].id
        if(id_admin === id){
            return res.status(400).json({msg: 'No puedes eliminar este administrador'})
        }
    }
    if (!mongoose.isValidObjectId(id)){ return res.status(400).json({msg: "ID inválido"})}
    try {
        await Administradores.findByIdAndDelete(id)
        return res.status(200).json({msg: "Se ha eliminado el administrador exitosamente."})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error.message})
    }
}

export{
    registrarUsuario,
    registrarAdministrador,
    login,
    verificarToken,
    listarUsuarios,
    eliminarUsuario,
    eliminarAdmin
}