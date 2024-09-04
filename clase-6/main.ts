class Accion {
    id: number
    descripcion: string
    fecha: Date

    constructor(
        id: number,
        descripcion: string,
        fecha: Date
    ) 
    {
        this.id = id
        this.descripcion = descripcion
        this.fecha = fecha
    }
    getFechaFormateada () :string {
        return parseCustomDateFormat(this.fecha)
    }
}

const parseCustomDateFormat = (fecha: Date) => {
    const horas: string = fecha.getHours().toString()
    const minutos: string = fecha.getMinutes().toString()
    const dia: string = fecha.getDate().toString()
    const mes: string = (fecha.getMonth() + 1).toString()
    const anio: number = fecha.getFullYear()
    const fechaFormateada: string = `${horas}:${minutos} ${dia}/${mes}/${anio}`;
    return fechaFormateada
}

class CustomDate extends Date {
    constructor(fecha: Date) {
        super(fecha)
    }
    getFechaFormateada () :string {
        return parseCustomDateFormat(this)
    }
}


/* const eliminarAccionPorID(id: number) {
    const posAccion = this.acciones.findIndex(element => element.id === id) 

    this.acciones.splice(posAccion, 1)
    
} */

class Accion2 {
    id: number
    descripcion: string
    constructor(id: number,descripcion: string){
        this.id = id
        this.descripcion = descripcion  
    }
}
class AccionEnvioMensaje extends Accion2{
    constructor(id: number) {
        super(id, 'ENVIO_MENSAJE')
    }
}
new AccionEnvioMensaje(1)
new AccionEnvioMensaje(2)