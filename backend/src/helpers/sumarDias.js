export default function sumarDias(fechaStr, dias) {
    // Convertir la fecha en un objeto Date
    const [dia, mes, anio] = fechaStr.split('/').map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    
    // Sumar los días
    fecha.setDate(fecha.getDate() + dias);
    
    // Formatear la fecha de nuevo al formato 'dd/mm/aaaa'
    const nuevoDia = String(fecha.getDate()).padStart(2, '0');
    const nuevoMes = String(fecha.getMonth() + 1).padStart(2, '0');
    const nuevoAnio = fecha.getFullYear();
    
    return `${nuevoDia}/${nuevoMes}/${nuevoAnio}`;
}
