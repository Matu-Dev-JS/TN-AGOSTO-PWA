import express from "express";
import filesystem from 'fs'

//Se crea una instancia de servidor HTTP
const app = express()
const PORT = 4000

//Cuando alguien consulte al endpoint 'obtener-usuarios' con metodo get ejecuto la callback
//La callback recibe 2 parametros, request y response
//Request es un objeto con todos los datos de consulta
//Response es un objeto que usamos para emitir respuestas
app.get('/obtener-usuarios', async (request, response) => {
    console.log('recibido')
    /* 
    llamar a /public/usuarios.json y obtener la lista de usuarios.
    Una vez la obtenemos responderemos con la lista de usuarios
    */
    const resultado = await filesystem.promises.readFile('./public/usuarios.json', {encoding: 'utf-8'})
    const usuarios = JSON.parse(resultado)
    response.status(200).json({mensaje:'Hola', code: 1, data: usuarios})
   /*  catch(error){
        console.error(error)
        response.json({

        })
    } */
})

//response.send() nos permite emitir json, HTML, texto plano
//response.json() nos permite emitir json
//response.status() nos permite setear el estatus HTTP de respuesta


/* 
Crear un archivo llamado productos.json dentro de /public que tenga una lista de productos con id, titulo, precio, stock

Crear un endpoint llamado /obtener-productos que al consultarnos nos responda:
{
    mensaje: 'Productos obtenidos',
    status: 200,
    ok: true,
    data: [
        {producto}
    ]
}
El array de productos debe venir del contenido del productos.json

2)
Agregar manejo de errores:

Si no se puede obtener la lista de productos deberan responder:
{
    mensaje: 'SERVER ERROR: Productos no obtenidos',
    status: 500,
    ok: false,
    data: null
}

*/


//Listen espera recibir 2 valores: puerto: 3000, callback
app.listen(PORT, () => {
    //Esta callback se ejecuta cuando se este escuchando mi app en el puerto
    console.log(`El servidor se esta escuchando en el puerto ${PORT}`)
})

//http://localhost:4000


console.log('productos obtenidos', {})