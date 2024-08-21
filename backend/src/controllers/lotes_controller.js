import mongoose from "mongoose";
import Comisiones from "../models/Comisiones.js";
import calcularEstado from "../helpers/calcularEstado.js";

const detalleLote = async (req,res) => {
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe ese lote registrado`});
    const comisionBDD = await Comisiones.findById(id).select('-_id -__v').lean();
    res.status(200).json(comisionBDD);
}

const listarLotesQuery = async (req, res) => {
    const { nombre, vendedor, etapa, manzana, lote, condicion, estado } = req.query;
    let query = {desistimiento:false}; //Inicializar query con el valor de desistimiento false
    
    if (nombre) query['nombre_cliente'] = new RegExp(nombre, 'i');
    if (vendedor) query['vendedor'] = new RegExp(vendedor, 'i');
    if (etapa) query['etapa'] = etapa;
    if (manzana) query['manzana'] = new RegExp(manzana, 'i');
    if (lote) query['lote'] = lote;
    if (condicion) query['condicion'] = new RegExp(condicion, 'i');
    if (estado) query['estado_comision'] = new RegExp(estado, 'i');
    
    try {
        const comisionesBDD = await Comisiones.find(query)
            .sort('etapa manzana lote')
            .select('-fecha_reserva -area -descuento -valor_descuento -valor_reserva -tipo_financiamiento -porcentaje_comision -observacion -abonos_anteriores -desistimiento -__v')
            .lean();
        
        return res.status(200).json(comisionesBDD);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
const listarLotesDesistidos = async (req,res) =>{
    const { nombre, vendedor, etapa, manzana, lote, condicion, estado } = req.query;
    let query = {desistimiento:true}; //Inicializar query con el valor de desistimiento false
    
    if (nombre) query['nombre_cliente'] = new RegExp(nombre, 'i');
    if (vendedor) query['vendedor'] = new RegExp(vendedor, 'i');
    if (etapa) query['etapa'] = etapa;
    if (manzana) query['manzana'] = new RegExp(manzana, 'i');
    if (lote) query['lote'] = lote;
    if (condicion) query['condicion'] = new RegExp(condicion, 'i');
    if (estado) query['estado_comision'] = new RegExp(estado, 'i');
    
    try {
        const comisionesBDD = await Comisiones.find(query)
            .sort('etapa manzana lote')
            .select('-fecha_reserva -area -descuento -valor_descuento -valor_reserva -tipo_financiamiento -porcentaje_comision -observacion -abonos_anteriores -desistimiento -__v')
            .lean();
        
        return res.status(200).json(comisionesBDD);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


const registrarLote = async (req,res) =>{
    const {
        etapa,
        manzana,
        lote,
        nombre_cliente,
        fecha_reserva,
        vendedor,
        valor_venta,
        descuento,
        valor_reserva,
        tipo_financiamiento,
        valor_total_recibido,
        porcentaje_comision,
        observacion,
        condicion
    } = req.body

    if (!etapa){return res.status(400).json({msg:"Ingresa una etapa, por favor."})}
    if (!manzana){return res.status(400).json({msg:"Ingresa la manzana, por favor."})}
    if (!lote){return res.status(400).json({msg:"Ingresa un lote, por favor."})}
    if (!nombre_cliente){return res.status(400).json({msg:"Ingresa el nombre del cliente, por favor."})}
    if (!fecha_reserva){return res.status(400).json({msg:"Ingresa la fecha de reserva, por favor."})}
    if (!vendedor){return res.status(400).json({msg:"Ingresa el vendedor, por favor."})}
    if (!valor_venta){return res.status(400).json({msg:"Ingresa el valor de venta, por favor."})}
    if (!valor_reserva){return res.status(400).json({msg:"Ingresa el valor de reserva, por favor."})}
    if (!valor_total_recibido){return res.status(400).json({msg:"Ingresa el valor total recibido, por favor."})}
    if (!porcentaje_comision){return res.status(400).json({msg:"Ingresa el porcentaje de la comisión, por favor."})}
    if (!condicion){return res.status(400).json({msg:"Ingresa el tipo de condición, por favor."})}

    const loteBDD = await Comisiones.findOne({'etapa':etapa, 'manzana':manzana ,'lote':lote, 'desistimiento':false}).exec()

    if(!loteBDD){

        //Calcular el estado de la comision
        const nuevoLote = {
            nombre_cliente,
            fecha_reserva,
            vendedor,
            etapa,
            manzana,
            lote,
            valor_venta,
            descuento,
            valor_descuento: Number(valor_venta*descuento).toFixed(2),
            valor_reserva,
            tipo_financiamiento,
            valor_total_recibido,
            porcentaje_comision: Number(porcentaje_comision/100).toFixed(3),
            valor_comision: Number(valor_venta * (porcentaje_comision/100)).toFixed(2),
            saldo_por_pagar: Number(valor_venta * (porcentaje_comision/100)).toFixed(2),
            observacion,
            condicion
        }
        nuevoLote.estado_comision = await calcularEstado(nuevoLote,false)
        await Comisiones.create(nuevoLote);
        return res.status(200).json({msg:"Lote creado correctamente"})
    }
    return res.status(400).json({msg:"El lote ya se encuentra registrado"})
}

const modificarLote = async (req,res) => {
    const {id} = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if (!mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el lote ${id}`});

    try {
        let loteModificado = await Comisiones.findByIdAndUpdate(id, req.body, { new: true });

        if (!loteModificado) {
            return res.status(404).json({ msg: `Lo sentimos, no existe el lote ${id}` });
        }

        loteModificado.estado_comision = calcularEstado(loteModificado,false);
        await loteModificado.save();

        res.status(200).json({ msg: "Lote actualizado correctamente", loteModificado });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar el lote", error });
    }
}

const eliminarLote = async (req,res) => {
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el lote ${id}`})

    await Comisiones.findByIdAndUpdate(id,{desistimiento:true})
    res.status(200).json({msg:"Lote desistido correctamente"})
}
export {
    detalleLote,
    listarLotesQuery,
    registrarLote,
    modificarLote,
    eliminarLote,
    listarLotesDesistidos
}