/* const saludar = (persona : string) => {
    console.log('hola ' + persona)
}



let personita = {nombre: 'pepe', apellido: 'suarez'}


saludar(personita.nombre)
 */


/* Indico explicitamente que la variable nombre es de tipo STRING */
/* let nombre : string = 'pepe'

nombre = '1' */


let nombre : string | null  = null


if(nombre){
    console.log(nombre)
}
else{
    console.log('No hay nombre aun')
}

let edad : number = 80
let isRegistered : boolean = true

const calcularIva = (precio: number) : number => {
    return precio * 0.21
}

let resultado : number = calcularIva(400)


let edad_2 : number

edad_2 = Number(prompt())

console.log(edad_2)


const saludar = (nombre: string) : void => {
    console.log('hola ' + nombre)
}

saludar('pepe')

const mandarEmail = (to : string, message: string = 'nada', subject?: string) : void=> {
    /* FIU FIU se mando el email con magia negra */
    console.log(to, message)
}


mandarEmail('pepito189@gmail.com', 'hola, soy yo, pepe')


/* prompt() */

