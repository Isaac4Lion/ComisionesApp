import { Schema, model } from "mongoose";

const condicionesSchema = new Schema({
    nombre:{
        type: String,
        unique: true,
        require: true,
        trim: true,
    },
    porcentaje_comision:{
        type:Number,
        require: true,
    },
    nro_pagos:{
        type:Number,
        require: true,
        default:2,
    },
    condicion_porcentaje:{
        type: Number, 
    },
    condicion_dias:{
        type:Number,
    },
})

export default model('Condiciones', condicionesSchema)