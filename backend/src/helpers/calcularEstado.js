import Condiciones from "../models/Condiciones.js"
import nombres_excel from "./nombres_excel.js"
import sumarDias from "./sumarDias.js";

const calcularEstado = async (comision, excel) => {
    const condiciones = await Condiciones.find()

    const condicion = excel ? nombres_excel.condicion : 'condicion';
    const abono_comision = excel ? nombres_excel.abono_comision : 'abono_comision';
    const descuento = excel ? nombres_excel.descuento : 'descuento';
    const fecha_abono = excel ? nombres_excel.fecha_abono : 'fecha_abono';
    const fecha_reserva = excel ? nombres_excel.fecha_reserva : 'fecha_reserva';
    const observacion = excel ? nombres_excel.observacion : 'observacion';
    const saldo_por_pagar = excel ? nombres_excel.saldo_por_pagar : 'saldo_por_pagar';
    const tipo_financiamiento = excel ? nombres_excel.tipo_financiamiento : 'tipo_financiamiento';
    const valor_reserva = excel ? nombres_excel.valor_reserva : 'valor_reserva';
    const valor_total_recibido = excel ? nombres_excel.valor_total_recibido : 'valor_total_recibido';
    const valor_venta = excel ? nombres_excel.valor_venta : 'valor_venta'; 

    let estado_comision = ''
    const condicionEncontrada = condiciones.filter(condicionBDD => {
        if (comision[condicion] === condicionBDD.nombre){
            return condicion
        }
    })
    if (condicionEncontrada.length == 0){ return estado_comision = 'SIN CONDICION'}
    
    const comisionTotal = comision[valor_venta] * (condicionEncontrada[0].porcentaje_comision/100)
    if(Number(comision[abono_comision]).toFixed(1) == Number(comisionTotal).toFixed(1)){
        return estado_comision = "PAGADO"
    }
    if(comision[abono_comision] >= (comisionTotal/2)-0.02){ //Para decimales
        if(condicionEncontrada[0].condicion_porcentaje){
            return estado_comision = comision[valor_total_recibido] >= comision[valor_venta]*(condicionEncontrada[0].condicion_porcentaje/100) ? "POR PAGAR" : "PENDIENTE"
        }else if(condicionEncontrada[0].condicion_dias){
            const nuevaFecha = sumarDias(comision[fecha_reserva], condicionEncontrada[0].condicion_dias);
            const [dia, mes, anio] = nuevaFecha.split('/').map(Number);
            const fecha = new Date(anio, mes - 1, dia);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0); // Establecer la hora de hoy a las 00:00:00 para comparar solo la fecha

            return estado_comision = fecha.getTime() > hoy.getTime() ? 'PENDIENTE' : 'POR PAGAR'
        }else{
            return estado_comision = "SIN CONDICION"
        }
    }else{
        return estado_comision = "POR PAGAR"
    }
}

export default calcularEstado