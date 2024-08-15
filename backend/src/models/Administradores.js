import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

const administradorSchema = new Schema({
    nombre_usuario:{
        type:String,
        require:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    confirmarEmail:{
        type:Boolean,
        default:false,
    },
    token:{
        type:String,
        default:null,
    },
    createdAt: {
        type:Date,
        default: Date.now(),
    }
})
// Método para cifrar el password del veterinario
administradorSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
administradorSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

// Método para crear un token 
administradorSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

export default model('Administrador', administradorSchema);