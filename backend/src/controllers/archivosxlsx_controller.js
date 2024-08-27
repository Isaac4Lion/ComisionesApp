import Comisiones from "../models/Comisiones.js";

import XLSX from "xlsx";
import mod_path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import nombres_excel from "../helpers/nombres_excel.js";
import calcularEstado from "../helpers/calcularEstado.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Variable global que almacena la direccion del archivo subido
let f_subir;

//Funcion que sube un archivo xlsx a una carpeta llamada /cargas
const importarExcel = (req, res) => {
  try {
    if (!req.files) {
      res.status(400).json({ msg: "No se ha encontrado el archivo" });
    }
    f_subir = req.files.f_subir;
    const ext = mod_path.extname(f_subir.name);
    const ext_permitidas = [".xlsx", ".csv"];

    if (!ext_permitidas.includes(ext)) {
      let resp_json = { mensaje: " ", mimetype: "" };
      resp_json.mensaje +=
        "El archivo " + f_subir.name + " es un archivo no permitido";
      resp_json.mimetype = f_subir.mimetype;
      return res.status(200).json(resp_json);
    }
    let ruta_archivo = __dirname + "/../cargas/Comisiones.xlsx";

    f_subir.mv(ruta_archivo, (err) => {
      if (err) {
        return res
          .status(200)
          .json({ mensaje: "Ocurrió un error al subir el archivo: " + err });
      }
      req.f_subir = f_subir;
      return res
        .status(200)
        .json({ mensaje: "Archivo Cargado", archivo: f_subir.name });
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const subirBDD = async (req, res) => {
  if (f_subir) {
    await Comisiones.collection.drop().catch((error) => {
      console.log(error);
    });
    let ruta_archivo = __dirname + "/../cargas/Comisiones.xlsx";
    const workBook = XLSX.readFile(ruta_archivo, {
      cellText: false,
      cellDates: true,
    });
    const worksheet = workBook.Sheets["Comisiones"];

    let jsa = XLSX.utils.sheet_to_json(worksheet);

    // Usar Promise.all para esperar a que todas las promesas se resuelvan
    let comisiones_formateadas = await Promise.all(
      jsa.map(async (comision) => {
        let obj = {};

        // Formatear las fechas
        const formatDate = (date) =>
          typeof date === "object" ? date.toLocaleDateString() : date;

        comision[nombres_excel.fecha_reserva] = formatDate(
          comision[nombres_excel.fecha_reserva]
        );
        comision[nombres_excel.fecha_abono] = formatDate(
          comision[nombres_excel.fecha_abono]
        );

        // Formatear los números a dos decimales
        const formatNumber = (num) => (num ? Number(num.toFixed(2)) : num);

        comision[nombres_excel.valor_descuento] = formatNumber(
          comision[nombres_excel.valor_descuento]
        );
        comision[nombres_excel.valor_venta] = formatNumber(
          comision[nombres_excel.valor_venta]
        );
        comision[nombres_excel.valor_total_recibido] = formatNumber(
          comision[nombres_excel.valor_total_recibido]
        );
        comision[nombres_excel.valor_comision] = formatNumber(
          comision[nombres_excel.valor_comision]
        );
        comision[nombres_excel.abono_comision] = formatNumber(
          comision[nombres_excel.abono_comision]
        );
        comision[nombres_excel.saldo_por_pagar] = formatNumber(
          comision[nombres_excel.saldo_por_pagar]
        );

        // Formatear cadenas de texto
        const formatString = (obs) => (obs ? obs : "");
        comision[nombres_excel.observacion] = formatString(
          comision[nombres_excel.observacion]
        );
        comision[nombres_excel.fecha_ultimo_abono] = formatString(
          comision[nombres_excel.fecha_ultimo_abono]
        );

        // Cambiar las cabeceras por las claves de la base de datos
        Object.keys(nombres_excel).forEach((key) => {
          obj[key] = comision[nombres_excel[key]];
        });

        if (typeof comision[nombres_excel.fecha_abono] === "string") {
          let fechas = comision[nombres_excel.fecha_abono].split("+");
          obj["abonos_anteriores"] = fechas.slice(0, -1);
          obj["fecha_ultimo_abono"] = fechas[fechas.length - 1];
          fechas.slice(0, -1).forEach((fecha, i) => {
            comision[`FECHA ABONO ${i + 1}`] = fecha;
          });
        }

        // Estado de la comisión
        obj["estado_comision"] = await calcularEstado(comision, true);
        return obj;
      })
    );

    try {
      f_subir = ""; // Resetear la bandera de archivo subido

      await Comisiones.create(comisiones_formateadas);

      return res
        .status(200)
        .json({ msg: "Se ha subido el archivo correctamente" });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Error al subir a la bdd: " + error.message });
    }
  }
  res
    .status(400)
    .json({ msg: "No se encuentra el archivo, suba uno por favor" });
};

//Permite exportar la informacion de la BDD y descargarla localmente en archivo xlsx
const exportarExcel = async (req, res) => {
  try {
    const comisionesBDD = await Comisiones.find({desistimiento:false})
      .sort("etapa manzana lote")
      .select("-_id -__v")
      .lean();
    let comisiones_formateadas = comisionesBDD.map((comision) => {
      const obj = {};
      obj[nombres_excel.nombre_cliente] = comision["nombre_cliente"];
      obj[nombres_excel.fecha_reserva] = comision["fecha_reserva"];
      obj[nombres_excel.vendedor] = comision["vendedor"];
      obj[nombres_excel.etapa] = comision["etapa"];
      obj[nombres_excel.manzana] = comision["manzana"];
      obj[nombres_excel.lote] = comision["lote"];
      obj[nombres_excel.valor_venta] = comision["valor_venta"];
      obj[nombres_excel.descuento] = comision["descuento"];
      obj[nombres_excel.valor_descuento] = comision["valor_descuento"];
      obj[nombres_excel.valor_reserva] = comision["valor_reserva"];
      obj[nombres_excel.tipo_financiamiento] = comision["tipo_financiamiento"];
      obj[nombres_excel.valor_total_recibido] = comision["valor_total_recibido"];
      obj[nombres_excel.porcentaje_comision] = comision["porcentaje_comision"];
      obj[nombres_excel.valor_comision] = comision["valor_comision"];
      obj[nombres_excel.abono_comision] = comision["abono_comision"];
      if (comision["abonos_anteriores"].length > 0) {
        let fechas_concat = "";
        for (let i = 0; i < comision["abonos_anteriores"].length; i++) {
          fechas_concat += comision["abonos_anteriores"][i] + "+";
        }
        obj[nombres_excel.fecha_abono] =
          fechas_concat + comision["fecha_ultimo_abono"];
      } else {
        obj[nombres_excel.fecha_abono] = comision["fecha_ultimo_abono"];
      }
      obj[nombres_excel.saldo_por_pagar] = comision["saldo_por_pagar"];
      obj[nombres_excel.observacion] = comision["observacion"];
      obj[nombres_excel.condicion] = comision["condicion"];
      obj[nombres_excel.estado_comision] = comision["estado_comision"];
      return obj;
    });
    //Limpiar campos vacios
    comisiones_formateadas = comisiones_formateadas.filter(
      (item) => typeof item["ETAPA"] !== "undefined"
    );

    const worksheet = XLSX.utils.json_to_sheet(comisiones_formateadas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Comisiones");
    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
      compression: true,
    });

    // Set headers to prompt download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Comisiones_${Date.now().toString()}.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.status(200).send(buffer);
  } catch (error) {
    return res.status(400).json({ error: "Error: " + error.message });
  }
};

export { importarExcel, subirBDD, exportarExcel };
