import { Schema, model } from 'mongoose'

const usuariosSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true,
    },
    apellido:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type: String,
        require:true,
        trim:true,
    },
    token:{
        type:String,
        default:null,
    },
    confirmarEmail:{
        type: Boolean,
        default: false,
    }
})
// Método para cifrar el password del veterinario
usuariosSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
usuariosSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

// Método para crear un token 
usuariosSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

export default model('Usuarios',usuariosSchema)