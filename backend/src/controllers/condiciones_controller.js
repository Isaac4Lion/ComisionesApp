import Condiciones from "../models/Condiciones.js"

const crearCondicion = async (req, res) => {
    const {
        nombre, 
        porcentaje_comision, 
        nro_pagos, 
        condicion_porcentaje, 
        condicion_dias
    } = req.body

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
                nombre,
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
                nombre,
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

export {
    crearCondicion
}