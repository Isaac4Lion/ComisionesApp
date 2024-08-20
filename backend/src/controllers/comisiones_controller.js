import calcularEstado from "../helpers/calcularEstado.js"
import Comisiones from "../models/Comisiones.js"

//Objeto que verifica si una comision fue creada
let ultima_comision = {}

const registrarComision = async (req, res) => {
    const { id } = req.params;
    const { abono_comision, fecha_abono } = req.body;

    if (!abono_comision || !fecha_abono) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }
    
    if (abono_comision <= 0){
        return res.status(400).json({ msg: "Ingresa un valor correcto" });
    }

    const loteRegistrado = await Comisiones.findById(id).select('-__v -area -tipo_financiamiento');

    if (loteRegistrado) {
        if (abono_comision > loteRegistrado.saldo_por_pagar) {
            return res.status(400).json({ msg: "No puedes ingresar un valor mayor que el saldo a pagar" });
        }
        //Se guarda los datos que se cambian al registrar la comisión
        ultima_comision.id = id
        ultima_comision.abono = loteRegistrado.abono_comision || 0
        ultima_comision.saldo_por_pagar = loteRegistrado.saldo_por_pagar

        const abonoComisionFloat = parseFloat(abono_comision);
        
        if (loteRegistrado.abono_comision) {
            const abonoActual = parseFloat(loteRegistrado.abono_comision);
            loteRegistrado.abono_comision = (abonoActual + abonoComisionFloat).toFixed(2);

            if (!Array.isArray(loteRegistrado.abonos_anteriores)) {
                loteRegistrado.abonos_anteriores = [];
            }

            loteRegistrado.abonos_anteriores.push(loteRegistrado.fecha_ultimo_abono);
            loteRegistrado.fecha_ultimo_abono = fecha_abono;
        } else {
            loteRegistrado.abono_comision = abonoComisionFloat.toFixed(2);
            loteRegistrado.fecha_ultimo_abono = fecha_abono;
        }

        loteRegistrado.saldo_por_pagar = (loteRegistrado.valor_comision - parseFloat(loteRegistrado.abono_comision)).toFixed(2);
        loteRegistrado.estado_comision = await calcularEstado(loteRegistrado,false);

        await loteRegistrado.save();
        return res.status(200).json({ msg: "Se ha registrado la comisión correctamente" });
    } else {
        return res.status(400).json({ msg: "Lote no registrado" });
    }
};


const eliminarUltimaComision = async (req,res) => {
    //Comprueba que exista una comision registrada recientemente
    if(ultima_comision.id){
        const ultimoLoteRegistrado = await Comisiones.findById(ultima_comision.id).select('-__v -area -tipo_financiamiento')
        ultimoLoteRegistrado.abono_comision = ultima_comision.abono
        ultimoLoteRegistrado.abono_comision = Number(ultimoLoteRegistrado.abono_comision).toFixed(2)
        ultimoLoteRegistrado.fecha_ultimo_abono = ultimoLoteRegistrado.abonos_anteriores[ultimoLoteRegistrado.abonos_anteriores.length-1]
        ultimoLoteRegistrado.abonos_anteriores.pop()
        ultimoLoteRegistrado.saldo_por_pagar = ultima_comision.saldo_por_pagar
        ultimoLoteRegistrado.estado_comision = await calcularEstado(ultimoLoteRegistrado, false)
        ultimoLoteRegistrado.save()
        ultima_comision.id = ""
        ultima_comision.abono = 0;
        ultima_comision.saldo_por_pagar = 0;
        return res.status(200).json({msg:"Comision eliminada correctamente"})
    }else{
        return res.status(400).json({msg: "No se ha registrado ninguna comisión recientemente"})
    }
}

export{
    registrarComision,
    eliminarUltimaComision
}