/* 
CRUD DE PRODUCTOS

ROUTE: /api/products

Method: GET
Endpoint: / 
Accion: obtenerProductos
Buscar en products.json el array de productos con active = true y devolverlo

Response:
{
    ok: true,
    status: 200,
    message: 'Productos Obtenidos'
    payload: {
        products: [Lista De Productos]
    }
}


Method: GET
Endpoint: /:product_id
obtenerProductoPorId
Buscar en products.json el producto con id igual al id recibido por parametro de busqueda y devolverlo

Response:
{
    ok: true,
    status: 200,
    message: 'Producto Obtenido',
    payload: {
        product: {producto}
    }
}

Sino lo encuentra:

Response:
{
    ok: true,
    status: 404,
    message: 'No se encontro el producto',
    payload: {
        product: null
    }
}

Method: POST
Endpoint: /
crearProducto
Van a recibir por body:
{
    title: 'nuevo tv',
    price: 3000,
    categoria: 'TECNOLOGIA',
    stock: 2
}
y deberar agregarlo a products.json y devolver la lista de productos actualizada
Si todo esta bien responder:
Response:
{
    ok: true,
    status: 201,
    message: 'Producto Creado',
    payload: {
        products: [nueva lista con el producto agregado]
    }
}

posibles errores:
- El producto ya existe, ya existe un producto con el mismo title STATUS: 400
- El enviado no tiene los campos necesarios STATUS: 400 (opcional: especificar los campos faltantes)
- El stock es negativo STATUS: 400
- El stock no es un numero STATUS: 400
- El precio no es un numero STATUS: 400
- El precio es negativo STATUS: 400
- El title no es un string STATUS: 400
- El title es vacio STATUS: 400
- La categoria no es un string valido o no es una de las categorias existentes STATUS: 400 (OPCIONAL categorias_existentes: 'ropa', 'electrodomestico', 'jugueteria')        
- Error de lectura de archivo STATUS: 500



Method: PUT

Endpoint: /:product_id
actualizarProductoPorId

Van a recibir por body:
{
    title: 'nuevo nombre tv',
    price: 2000,
    stock: 2,
    propiedad_falsa: true,
    nombre: 'pepe'
}

//SOLO PUEDEN ACTUALIZARSE las propiedades: title, price, stock y categoria


y deberemos modificarlo al producto por id en products.json y devolver la lista de productos actualizada

POSIBLES ERRORES:

- Las propiedades recibidas deben ser validas, significa que no podemos recibir una propiedad que no existe Status: 400 (opcional: especificar las propiedades validas y la que esta/an mal)
Ejemplo:

{
    status: 400,
    message: 'Las propiedades no son validas'
    payload: {
        message: 'Las propiedades no son validas. Propiedades validas: title, price, stock, categoria, invalidas: propiedad_falsa, nombre'
    }
},

- El producto ya existe, ya existe un producto con el mismo title en la lista (excepcion: se vale si el producto quiere mantener el titulo anterior) STATUS: 400
Ejemplo: si mi lista tiene 'Tv Samsung' y quiero actualizar a 'Tv Samsung' al valor 'Tv Samsung' me va a dejar hacerlo

- El producto enviado debe tener almenos una propiedad (valida) STATUS: 400
- Si hay stock, y el stock es negativo o no es un numero STATUS: 400
- Si hay precio y no es un numero o es negativo STATUS: 400
- Si hay title y no es un string o es vacio STATUS: 400
- La categoria no es un string valido o no es una de las categorias existentes STATUS: 400 (OPCIONAL categorias_existentes: 'ropa', 'electrodomestico', 'jugueteria')        
- Error de lectura de archivo STATUS: 500


COMO SABER SI HAY PROPIEDADES INVALIDAS?

const producto = {
    title: 'nuevo nombre tv',
    price: 2000,
    stock: 2,
    propiedad_falsa: true,
    nombre: 'pepe',
    teclado: true
}

const PROPIEDADES_VALIDAS = ['title', 'price', 'stock']
const propiedades_invalidas = []

for(let propiedad in producto){
    if(!PROPIEDADES_VALIDAS.includes(propiedad)){
        propiedades_invalidas.push(propiedad)
    }
}

console.log(propiedades_invalidas)

Response:
{
    ok: true,
    status: 201,
    payload: {
        product: {producto modificado}
    }
}

Method: DELETE
Endpoint: /:product_id
eliminarProducto
Cambiar el active del producto a false en products.json y devolver la lista de productos actualizada
Response:
{
    ok: true,
    status: 200,
    message: 'Producto eliminado',
    payload: {
        message: 'Producto eliminado'
    }
} 
Si no encuentra el producto:
Response:
{
    ok: true,
    status: 404,
    message: 'No se encontro el producto',
    payload: {
        message: 'No se encontro el producto'
    }
}
    
*/

import { Router } from 'express'
import fs from 'fs'
import ResponseBuilder from '../builders/response.builder.js';
const productRouter = Router()





/* 
Method: GET
Endpoint: /:product_id
obtenerProductoPorId
Buscar en products.json el producto con id igual al id recibido por parametro de busqueda y devolverlo. 
AGREGADO: Debe ser activo, debemos validar parametros de busqueda



Response:
{
    ok: true,
    status: 200,
    message: 'Producto Obtenido',
    payload: {
        product: {producto}
    }
} */



productRouter.get('/:product_id', async (req, res) => {
    try {
        const { product_id } = req.params

        if (isNaN(product_id) && product_id < 0) {
            const response = new ResponseBuilder()
                .setOk(false)
                .status(400)
                .setMessage('Consulta erronea')
                .setPayload({
                    detail: 'Debe haber un product_id numerico que sea 0 o mayor'
                })
                .build()
            return res.status(400).json(response)
        }


        const productos = JSON.parse(await fs.promises.readFile('./data/products.json', { encoding: 'utf-8' }))


        const producto_buscado = productos.find((product) => product.id === Number(product_id))
        if (!producto_buscado) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(404)
                .setMessage('No se encontro el producto')
                .setPayload({
                    product: null
                })
                .build()
            return res.status(404).json(response)
        }

        if (!producto_buscado.active) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(410)
                .setMessage('El producto fue eliminado')
                .setPayload({
                    product: null
                })
                .build()
            return res.json(response)
        }
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Producto obtenido')
            .setPayload({
                product: producto_buscado
            })
            .build()
        return res.json(response)
    }
    catch (error) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage('Server error')
            .setPayload({
                detail: error.message
            })
            .build()
        res.status(404).json(response)
    }
})



/* 
ROUTE: /api/products

Method: GET
Endpoint: / 
Accion: obtenerProductos
Buscar en products.json el array de productos con active = true y devolverlo

Response:
{
    ok: true,
    status: 200,
    message: 'Productos Obtenidos'
    payload: {
        products: [Lista De Productos]
    }
}

*/

productRouter.get("/", async (req, res) => {
    try {

        const obtenerproducts = await fs.promises.readFile(
            "./data/products.json",
            "utf-8"
        );
        const products = JSON.parse(obtenerproducts).filter(product => product.active);

        const response = {
            ok: true,
            status: 200,
            message: "Productos obtenidos con éxito",
            payload: { products: products },
        };

        return res.json(response);

    } catch (error) {
        console.error("error al leer el objeto", error);
        const response = {
            ok: false,
            status: 500,
            message: "Error interno del servidor",
            payload: {
                detail: error.message,
            },
        };
        return res.status(500).json(response);
    }
});




/* 
Method: POST
Endpoint: /
crearProducto
Van a recibir por body:
{
    title: 'nuevo tv',
    price: 3000,
    categoria: 'TECNOLOGIA',
    stock: 2
}
y deberar agregarlo a products.json y devolver la lista de productos actualizada
Si todo esta bien responder:
Response:
{
    ok: true,
    status: 201,
    message: 'Producto Creado',
    payload: {
        products: [nueva lista con el producto agregado]
    }
}

posibles errores:
- El producto ya existe, ya existe un producto con el mismo title STATUS: 400
- El producto enviado no tiene los campos necesarios STATUS: 400 (opcional: especificar los campos faltantes)
- El stock es negativo STATUS: 400
- El stock no es un numero STATUS: 400
- El precio no es un numero STATUS: 400
- El precio es negativo STATUS: 400
- El title no es un string STATUS: 400
- El title es vacio STATUS: 400
- La categoria no es un string valido o no es una de las categorias existentes STATUS: 400 (OPCIONAL categorias_existentes: 'ropa', 'electrodomestico', 'jugueteria')        
- Error de lectura de archivo STATUS: 500

*/


// Crear un nuevo producto con meotodo POST
productRouter.post('/', async (req, res) => {
    try {
        const { title, price, categoria, stock } = req.body;

        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)


        const erroresValidacion = []
        const categorias_validas = ['ropa', 'electrodomestico', 'jugueteria'];
        // Validaciones
        if (!title || typeof title !== 'string' || title.trim() === '') {
            erroresValidacion.push('El title no es un string')
        }
        if (isNaN(price) || price <= 0) {
            erroresValidacion.push('El precio es inválido')
        }
        if (isNaN(stock) || stock < 0) {
            erroresValidacion.push('El stock es inválido')
        }
        if (!categorias_validas.includes(categoria)) {
            erroresValidacion.push('Categoría inválida')
        }

        if (erroresValidacion.length > 0) {
            let errorMensaje = `Errores de validacion:\n` + erroresValidacion.join('\n-')

            response
                .setMessage(errorMensaje)
                .build()

            return res.status(400).json(response)
        }




        const products = JSON.parse(await fs.promises.readFile('./data/products.json', { encoding: 'utf-8' }));
        const exists = products.some(product => product.title === title);

        if (exists) {
            response
            .setStatus(400)
            .setOk(false)
            .setMessage('El producto ya existe')
            .build()
            return res.status(400).json(response);
        }

        const newProduct = {
            id: products.length + 1,
            title,
            price,
            categoria,
            stock,
            active: true
        };

        products.push(newProduct);

        await fs.promises.writeFile('./data/products.json', JSON.stringify(products), 'utf-8');
        response
            .setOk(true)
            .setStatus(201)
            .setMessage('Producto creado')
            .setPayload({ products })
            .build();

        res.status(201).json(response);
    } catch (err) {
        console.error(err)
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage('Error al crear el producto')
            .setPayload({ error: err })
            .build();

        res.status(500).json(response);
    }
});



productRouter.put('/:product_id',  async (req, res) => {
    try {
        const { product_id } = req.params
        const { title, price, stock, categoria } = req.body
        if (!(title.trim() !== '' && categoria.trim() !== '' && stock > 0 && price > 0)) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setMessage('Todos los campos deben tener un valor')
            .setStatus(400).setPayload({ products: null })
            .build()
            return res.status(200).json(response)
        }

        //Validate me duevuelve verdadero si valor pasado es un valor valido
        const propiedades_permitidas = {
            'title': {
                validate: (value) => value && typeof title === 'string' && title.trim() !== '',
                error: 'El titulo debe ser un valor string no vacio'
            }, 
            'categoria': {
                validate: (value) => true,
                error: 'La categoria debe ser valida'
            }, 
            'stock': {
                validate: (value) => true,
                error: 'El stock debe ser un numero mayor a 0'
            }, 
            'precio': {
                validate: (value) => true,
                error: 'El precio debe ser un numero mayor a 0'
            }
        }
        const errores = []

        //Checkeo de propiedades invalidas
        const lista_propiedades_permitidas = Object.keys(propiedades_permitidas) //['precio', 'stock', 'categoria'...]
        for(let propiedad in req.body){
            if(!lista_propiedades_permitidas.includes(propiedad)){
                errores.push(`Propiedad ${req.body[propiedad]} es invalida`)
            }
        }

        //Checkeo de valores enviados de propiedades validas
        for(let propiedad in propiedades_permitidas){

            const valor_propiedad = req.body[propiedad]
            //Checkeamos si existe algun valor mandado para esa propiedad
            if(valor_propiedad !== undefined){

                //Valor propiedad
                let validacion = propiedades_permitidas[propiedad].validate(valor_propiedad)
                if(!validacion){    

                    errores.push(propiedades_permitidas[propiedad].error)
                }
            }
        }

        

        if(errores.length > 0){
            //Logica de crear el error con el array de errores
        }


        const indice = productsArray.findIndex(p => p.id == product_id)
        if (!(indice !== -1)) {
            const response = new ResponseBuilder().setOk(false).setMessage('DATOS INVALIDOS').setStatus(400).setPayload({ products: null }).build()
            return res.status(200).json(response)
        }
        const objetoAgregado = {
            id: product_id,
            title: title,
            price: price,
            stock: stock,
            categoria: categoria,
            active: true
        };
        productsArray.splice(indice, 1, objetoAgregado)
        await filesystem.promises.writeFile('./data/products.json', JSON.stringify(productsArray, null, 2))
        const response = new ResponseBuilder().setOk(true).setMessage('Objeto agregado EXITOSAMENTE').setStatus(201).setPayload({ products: productsArray }).build()
        return res.status(200).json(response)
                
    } catch (error) {
        const response = new ResponseBuilder().setOk(false).setMessage('INTERNAL SERVER ERROR').setStatus(500).setPayload({ products: null, error: error.message }).build()
        return res.status(200).json(response)
    }
})





export default productRouter