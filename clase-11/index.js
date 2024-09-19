//Punto de entrada o Entry Point

//Pasos para empezar un proyecto en node.js
//Abrir la terminal y colocar:
//npm init -y
//npm i -D nodemon
/* 
Alternativa nodemon:
"scripts": {
    "dev": "nodemon index",
    "test": "echo \"Error: no test specified\" && exit 1"
},

Alternativa node --watch 
"scripts": {
    "dev": "node --watch index",
    "test": "echo \"Error: no test specified\" && exit 1"
},
*/

//nodemon
/* Es una libreria de desarrollo que nos permite ejecutar nuestro codigo cada vez que guardemos */
//Alternativa nativa de node a nodemon:
//node --watch <filename>

//Browser Object Model

//EN NODE NO EXISTE NI DOM NI BOM


const {createTxt} = require('./utils/filesystem.js')



createTxt('prueba', 'hola')


//Require, module.exports es como funcionan las importaciones en COMMONJS