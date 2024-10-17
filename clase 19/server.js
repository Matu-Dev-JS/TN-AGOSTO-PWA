import express from 'express'
import {engine} from 'express-handlebars'

const app = express()
const PORT = 3000

//Consfiguro que mi aplicacion tome a los archivos estaticos desde la carpeta public
app.use(express.static('./public'))

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')
app.set('views', './views')

//Middleware para indicarle a mi backend que cuando reciba consultas que tengan Content-Type: 'application/www-url-encoded' se transformen en objeto y sean mandandas por el body de mi request
app.use(express.urlencoded({extended: true}))

app.use(express.json())


const productos = [
    {
        id: 1,
        nombre: 'tv noblex',
        precio: 4000,
        descripcion: 'Una tv que se puede usar para ver canales',
        categorias: ['tecnologia', 'hogar', 'futbol'],
        stock: 4,
        active: true
    },
    {
        id: 2,
        nombre: 'Pc escritorio dell',
        precio: 6000,
        descripcion: 'Una PC cumplidora',
        categorias: ['tecnologia', 'computacion', 'office'],
        stock: 2,
        active: true
    },
    {
        id: 3,
        nombre: 'Laptop MSI',
        precio: 10000,
        descripcion: 'Una laptop apta para todo.',
        categorias: ['tecnologia', 'computacion', 'gaming', 'office'],
        stock: 7,
        active: true
    }
]


app.get('/',  (req, res) => {

    const view_props = {
        layout: 'main',
        status: 200,
        ok: true,
        data: {
            title: 'Ofertas de la semana',
            products: productos,
        },
        helpers: {

        }
    }
    res.render('home-view', view_props)
})

app.get('/product/detail/:product_id',  (req, res) => {
    const {product_id} = req.params
    const producto_buscado = productos.find(producto => producto.id === Number(product_id))
    if(!producto_buscado){
        //Logica de 404
    }
    const view_props = {
        layout: 'main',
        status: 200,
        ok: true,
        data: {
            product: producto_buscado,
        },
        helpers: {

        }
    }
    res.render('detail-view', view_props)
})

app.get('/product/new', (req, res) => {
    const campos_state = {
        nombre: {
            valor: '',
            error: null
        },
        descripcion: {
            valor: '',
            error: null
        },
        stock: {
            valor: 0,
            error: null
        },
        precio: {
            valor: 0,
            error: null
        }
    }
    const view_props = {
        layout: 'main',
        status: 200,
        ok: true,
        data: {
            form_state: campos_state
        }
    }
    res.render('new-product-view', view_props)
})

app.post('/product/new', (req, res) => {
    console.log('consulta recibida')
    const {nombre, descripcion, stock, precio} = req.body

    const campos_state = {
        nombre: {
            valor: nombre,
            error: null
        },
        descripcion: {
            valor: descripcion,
            error: null
        },
        stock: {
            valor: stock,
            error: null
        },
        precio: {
            valor: precio,
            error: null
        }
    }
    //Validar que los datos tengan sentido
    if(!nombre){
        campos_state.nombre.error = 'Debes ingresar un nombre'
    }

    const view_props = {
        layout: 'main',
        status: 400,
        ok: false,
        data: {
            form_state: campos_state
        }
    }
    res.render('new-product-view', view_props)

    /* 
    Agregar los errores restantes
    Si no hay errores entonces agregenlo al array y hagan
    res.redirect('/')
    */
})

app.listen(PORT, () => {
    console.log('El servidor se esta escuchando en http://localhost:' + PORT)
})