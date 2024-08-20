"use strict";
/* const saludar = (persona : string) => {
    console.log('hola ' + persona)
}



let personita = {nombre: 'pepe', apellido: 'suarez'}


saludar(personita.nombre)
 */
/* Indico explicitamente que la variable nombre es de tipo STRING */
/* let nombre : string = 'pepe'

nombre = '1' */
let nombre = null;
if (nombre) {
    console.log(nombre);
}
else {
    console.log('No hay nombre aun');
}
let edad = 80;
let isRegistered = true;
const calcularIva = (precio) => {
    return precio * 0.21;
};
let resultado = calcularIva(400);
let edad_2;
edad_2 = Number(prompt());
console.log(edad_2);
const saludar = (nombre) => {
    console.log('hola ' + nombre);
};
saludar('pepe');
const mandarEmail = (to, message = 'nada', subject) => {
    /* FIU FIU se mando el email con magia negra */
    console.log(to, message);
};
mandarEmail('pepito189@gmail.com');
