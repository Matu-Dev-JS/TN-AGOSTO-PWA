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


import {getAllProductsController, postProductController, putProductController, deleteProductController, getProductByIdController} from '../controllers/products.controllers.js'

productRouter.get("/", getAllProductsController);
productRouter.get('/:product_id', getProductByIdController)
productRouter.post('/', postProductController);
productRouter.put("/:product_id", putProductController )
productRouter.delete('/:product_id', deleteProductController)


export default productRouter