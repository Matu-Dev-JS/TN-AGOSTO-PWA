import express from 'express'

const app = express()
const PORT = 8000

//Middleware = un codigo / programa que se ejecuta entre medio de otro programa
//Todas las consultas HTTP que se hagan a mi servidor pasaran por app.use
//Que hace express.json()? Si los headers de la consulta son Content-Type: 'application/json' entonces guardara el body como JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




//Crear un endpoint
///ping => vamos a responder con un texto con contenido 'pong'
app.get('/ping', (req, res) => {
    //response.ok => Si la respuesta se hizo bien o no
    //response.status => Determinamos como fue resuelta la operacion
    //response.payload / response.data / response.result => objeto con informacion
    const response = {
        ok: true,
        status: 200,
        message: 'Consulta realizada con exito',
        payload: {

        }
    }
    //Logica de negocio que probablemente cambie mi respuesta
    //.status() settea el statusHTTP de mi respuesta
    res.status(200).json(response)
})

app.post('/ping', (req, res) => {
    const response = {
        ok: true,
        status: 200,
        message: 'Consulta realizada con exito',
        payload: {

        }
    }
    try {
        //Caputurar los datos del body
        //El body esta en la request
        //Este es el body: req.body
        
        console.log('Este es el body:', req.body)
        console.log(req.body.nombre)
        

        if(!req.body.nombre){
            response.ok = false
            response.status = 400
            response.message = 'No ingresaste el nombre'
            res.json(response)
        }
        res.json(response)
    }
    catch(error){

        response.message = 'Internal server error'
        response.payload.detail = error.detail
        
        response.status = 500
        response.ok = false
        res.json(response)
    }
})

const productos = [
    {
        id: 1,
        nombre: 'Pantalon',
        precio: 100,
        imagen: 'https://picsum.photos/id/237/200/300',
        descripcion: 'Pantalon deportivo',
        stock: 10
    },
    {
        id: 2,
        nombre: 'Camisa',
        precio: 50,
        imagen: 'https://picsum.photos/id/238/200/300',
        descripcion: 'Camisa deportiva',
        stock: 5
    },
    {
        id: 3,
        nombre: 'Zapatos',
        precio: 200,
        imagen: 'https://picsum.photos/id/239/200/300',
        descripcion: 'Zapatos deportivos',
        stock: 20
    }
]

//Esta ruta tiene un parametro de busqueda, llamado producto_id
app.get('/productos/:producto_id', (req, res) => {
    //req.params es un objeto que guardara todos mis parametros de busqueda
    //LOS VALORES DE MI REQ.PARAMS seran STRING
    //api/cart/:user_id/:cart_id se guardara en req.params como {user_id: 'valor', cart_id: 'valor'}
    const {producto_id} = req.params

    //TODO verificar que venga un producto_id
    const producto_buscado = productos.find((producto) => producto.id === Number(producto_id))
    if(!producto_buscado){
        //Responder con 404
    }

    const respuesta = {
        ok: true,
        status: 200,
        payload: {
            message: 'Productos obtenidos',
            producto: producto_buscado
        }
    }
    res.json(respuesta)
})

// /productos => responder con todos los productos

app.get('/productos', (req, res) => {
    //Los query params se almacenan en req.query
    const {min_price, max_price} = req.query
    const productos_buscados = productos.filter(producto => producto.precio > min_price && producto.precio < max_price)
    const respuesta = {
        ok: true,
        status: 200,
        payload: {
            message: 'Productos obtenidos',
            productos: productos_buscados
        }
    }
    res.json(respuesta)
})


//crear un endpoint POST llamado /register al que le pasaran un username y una password
//Validar que username y password sean datos string no vacios
//Si hay error de validacion responder ok: false, status: 400, payload:{ message: 'Debes tener un username valido' }
//Sino mostrar los datos por consola
//Responder en caso de que todo este bien con ok: true, status: 201, payload: {message: 'Usuario registrado'}


app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en http://localhost:${PORT}`)
})