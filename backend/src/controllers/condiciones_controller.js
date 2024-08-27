import mongoose from "mongoose"
import Condiciones from "../models/Condiciones.js"
import Comisiones from "../models/Comisiones.js"

const listarCondiciones = async (req,res) => {
    try {
        const condicionesBDD = await Condiciones.find().lean().select('-__v')
        if (condicionesBDD.length === 0){ return res.status(400).json({msg:"No existen condiciones registradas"})}
        
        return res.status(200).json(condicionesBDD)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error: "+ error.message})
    }
}
const detalleCondicion = async (req,res)=>{
    const {id} = req.params
    if (!mongoose.isValidObjectId(id)){return res.status(400).json({msg:"El ID proporcionado no es válido."})}
    try {
        const condicion = await Condiciones.findById(id).select('-__v').lean()
        if (!condicion) { return res.status(400).json({msg: "No se ha encontrado esa condicion registrada"})}
        return res.status(200).json(condicion)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error: "+error.message})
    }
}
const crearCondicion = async (req, res) => {
    const {
        nombre, 
        porcentaje_comision, 
        nro_pagos, 
        condicion_porcentaje, 
        condicion_dias
    } = req.body

    const nombreUpper = nombre ? nombre.toUpperCase() : nombre

    if (!nombre){ return res.status(400).json({msg: "Completa el campo nombre"})}
    if (!porcentaje_comision){ return res.status(400).json({msg: "Completa el campo de porcentaje de comisión."})}
    if (typeof porcentaje_comision !== 'number'){ return res.status(400).json({msg:"Ingresa un valor correcto para el porcentaje de la comisión."})}
    if (porcentaje_comision > 5){ return res.status(400).json({msg: "El porcentaje de comisión no puede ser mayor al 5%."})}
    if (typeof nro_pagos !== 'number'){ return res.status(400).json({msg:"Ingresa un valor correcto para el número de pagos."})}
    if (nro_pagos <= 0){ return res.status(400).json({msg: "El número de pagos no puede ser menor o igual a 0."})}
    
    try {
        if ((await Condiciones.find({nombre:nombre})).length > 0){ return res.status(400).json({msg:"Ese nombre ya existe en una condición."})}
    
        if (condicion_porcentaje){
            if (typeof condicion_porcentaje !== 'number'){return res.status(400).json({msg:"El porcentaje debe ser un número"})}
            if(condicion_dias){ return res.status(400).json({msg:"No puede existir la condicion de días si ya existe condición de porcentaje"})}
            const condicion = {
                nombre: nombreUpper,
                porcentaje_comision,
                nro_pagos,
                condicion_porcentaje
            }
            await Condiciones.create(condicion)
            return res.status(201).json({msg:"Se ha registrado el tipo de condición exitosamente."})
        }
        if (condicion_dias){
            if (typeof condicion_dias !== 'number'){return res.status(400).json({msg:"El valor de los días debe ser un número."})}
            if(condicion_porcentaje){ return res.status(400).json({msg:"No puede existir la condicion de porcentaje si ya existe la condición de días."})}
            const condicion = {
                nombre: nombreUpper,
                porcentaje_comision,
                nro_pagos,
                condicion_dias
            }
            await Condiciones.create(condicion)
            return res.status(201).json({msg:"Se ha registrado el tipo de condición exitosamente."})
    
        }
        return res.status(400).json({msg:"No se ha ingresado el tipo de condicion"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:error.message})
    }
}
const modificarCondicion = async (req,res) => {
    const {id} = req.params;
    const {
        nombre, 
        porcentaje_comision, 
        nro_pagos, 
        condicion_dias, 
        condicion_porcentaje
    } = req.body

    
    if (!mongoose.isValidObjectId(id)){return res.status(400).json({msg: "El ID parece incorrecto."})}
    if (!nombre){ return res.status(400).json({msg: "Completa el campo nombre"})}
    if (!porcentaje_comision){ return res.status(400).json({msg: "Completa el campo de porcentaje de comisión."})}
    if (typeof porcentaje_comision !== 'number'){ return res.status(400).json({msg:"Ingresa un valor correcto para el porcentaje de la comisión."})}
    if (porcentaje_comision > 5){ return res.status(400).json({msg: "El porcentaje de comisión no puede ser mayor al 5%."})}
    if (typeof nro_pagos !== 'number'){ return res.status(400).json({msg:"Ingresa un valor correcto para el número de pagos."})}
    if (nro_pagos <= 0){ return res.status(400).json({msg: "El número de pagos no puede ser menor o igual a 0."})}
    
    const nombreUpper = nombre ? nombre.toUpperCase() : nombre
    try {
        const condicionBDD = await Condiciones.findById(id)
        if (!condicionBDD){return res.status(400).json({msg:"No se encuentra registrada esa condición."})}
        
        const nombreExiste = await Condiciones.findOne({nombre:nombre})
        if (nombreExiste && condicionBDD.nombre !== nombre){return res.status(400).json({msg: "El nombre de la condición ya existe"})}
        
        if(condicion_dias){
            if (typeof condicion_dias !== 'number'){return res.status(400).json({msg:"El valor de los días debe ser un número."})}
            if (condicion_dias<0){ return res.status(400).json({msg:"La condicion días no puede ser menor a 0 días"})}
            if(condicion_porcentaje){ return res.status(400).json({msg:"No puede existir la condicion de porcentaje si ya existe la condición de días."})}
            const condicion = {
                nombre: nombreUpper,
                porcentaje_comision,
                nro_pagos,
                condicion_dias
            }
            condicionBDD.overwrite(condicion)
            condicionBDD.save()
            return res.status(200).json({msg:"Se ha modificado la condicion correctamente", condicion})
        }
        if(condicion_porcentaje){
            if (typeof condicion_porcentaje !== 'number'){return res.status(400).json({msg:"El porcentaje debe ser un número."})}
            if (condicion_porcentaje<0){ return res.status(400).json({msg:"La condicion porcentaje no puede ser menor que el 0%"})}
            if (condicion_porcentaje>100){ return res.status(400).json({msg:"La condicion porcentaje no puede ser mayor que el 100%"})}
            if(condicion_dias){ return res.status(400).json({msg:"No puede existir la condicion de días si ya existe la condición de porcentaje."})}
            const condicion = {
                nombre: nombreUpper,
                porcentaje_comision,
                nro_pagos,
                condicion_porcentaje
            }
            condicionBDD.overwrite(condicion)
            condicionBDD.save()
            return res.status(200).json({msg:"Se ha modificado la condicion correctamente", condicion})
        }
        return res.status(400).json({msg:"No puedes dejar vacio el tipo de condición."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error: "+error.message})
    }
}

const eliminarCondicion = async (req,res) => {
    const {id} = req.params
    if (!mongoose.isValidObjectId(id)){return res.status(400).json({msg:"El ID proporcionado no es válido."})}
    try {
        const condicion = await Condiciones.findById(id)
        if (!condicion) { return res.status(400).json({msg: "No se ha encontrado esa condicion registrada"})}
        const lotesBDD = await Comisiones.find({condicion:condicion.nombre})
        if(lotesBDD.length>0){ return res.status(400).json({msg: "No puedes eliminar porque tienes lotes registrados con esta condición."})}

        await Condiciones.findByIdAndDelete(id)
        return res.status(200).json({msg: "Se ha eliminado la condicion correctamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error: "+error.message})
    }
}

export {
    listarCondiciones,
    detalleCondicion,
    crearCondicion,
    modificarCondicion,
    eliminarCondicion
}