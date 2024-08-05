const calcularEstado = (comision) => {
    if(comision["condicion"]=="A"){
        if(comision["valor_total_recibido"]==comision["valor_venta"]){
            if(comision["saldo_por_pagar"]<0.09){
                return "COMISIONES PAGADAS"
            }else{
                return "POR PAGAR"
            }
        }else if(comision["valor_total_recibido"]>=comision["valor_venta30"]){
            if(!comision['abono_comision']){
                return "POR PAGAR"
            }else if(comision['saldo_por_pagar']<=0.05){
                return "ESPECIAL"
            }else{
                return "PENDIENTE"
            }
        }else{
            return "PENDIENTE"
        }
    }else{
        return "POR DEFINIR"
    }
}

export default calcularEstado