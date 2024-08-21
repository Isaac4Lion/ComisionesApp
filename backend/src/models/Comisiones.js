import { Schema, model } from 'mongoose'

const comisionesSchema = new Schema({
    nombre_cliente:{
        type:String,
        require:true,
        trim:true,
    },
    fecha_reserva:{
        type:String,
        require:true,
        trim:true,
    },
    vendedor:{
        type: String,
        require:true,
        trim:true,
    },
    etapa:{
        type: Number,
        require:true,
        trim:true,
    },
    manzana:{
        type: String,
        require:true,
        trim:true,
    },
    lote:{
        type: Number,
        require:true,
        trim:true,
    },
    valor_venta:{
        type: Number,
        require:true,
        trim:true,
    },
    descuento:{
        type: Number,
        require:true,
        trim:true,
    },
    valor_descuento:{
        type: Number,
        require:true,
        trim:true,
    },
    valor_reserva:{
        type: Number,
        require:true,
        trim:true,
    },
    tipo_financiamiento:{
        type: String,
        require:true,
        trim:true,
    },
    valor_total_recibido:{
        type: Number,
        require:true,
        trim:true,
    },
    porcentaje_comision:{
        type: Number,
        require:true,
        trim:true,
    },
    valor_comision:{
        type: Number,
        require:true,
        trim:true,
    },
    abono_comision:{
        type: Number,
        require:true,
        trim:true,
    },
    fecha_ultimo_abono:{
        type: String,
        require:true,
        trim:true,
    },
    saldo_por_pagar:{
        type: Number,
        require:true,
        trim:true,
    },
    observacion:{
        type: String,
        require:true,
        trim:true,
    },
    condicion:{
        type: String,
        require:true,
        trim:true,
    },
    estado_comision:{
        type: String,
        require:true,
        trim:true,
    },
    abonos_anteriores:{
        type: Array,
        require:true,
        trim:true,
    },
    desistimiento:{
        type:Boolean,
        default:false,
    },
})

export default model('Comisiones',comisionesSchema)