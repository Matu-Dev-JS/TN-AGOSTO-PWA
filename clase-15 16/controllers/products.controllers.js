import fs from 'fs'
import ResponseBuilder from '../builders/response.builder.js';
export const getAllProductsController =  async (req, res) => {
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
}

export const postProductController = async (req, res) => {
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
}

export const putProductController = async (req, res) => {
    try {

        const { product_id } = req.params

        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Bad request')

        if (isNaN(product_id)) {
            response
                .setPayload(
                    {
                        detail: 'El product_id debe ser un numero'
                    }
                )
                .build()
            return res.json(response)
        }

        const propiedades_permitidas = {
            'title': {
                validate: (title) => typeof title === 'string' && title.trim() !== '',
                error: 'El title no es un string o es vacio.'
            },
            'price': {
                validate: (price) => typeof price === 'number' && price >= 0,
                error: 'El precio no es un numero o es negativo.'
            },
            'stock': {
                validate: (stock) => typeof stock === 'number' && stock >= 0,
                error: 'El stock no es un numero o es negativo.'
            },
            'categoria': {
                validate: (categoria) => typeof categoria === 'string' && (['ropa', 'TECNOLOGIA', 'jugueteria'].includes(categoria)),
                error: 'La categoria no es un string valido o no es una de las categorias existentes.'
            }
        }

        const errores = []
        const propiedades_validas = Object.keys(propiedades_permitidas) // ['title', 'price', 'stock', 'categoria']

        // Validar que las propiedades recibidas sean validas
        for (let propiedad in req.body) {
            if (!propiedades_validas.includes(propiedad)) {
                errores.push(`La propiedad ${propiedad} no es valida.`)
            }
        }

        // Validar que el valor de las propiedades sea valido
        for (let propiedad in propiedades_permitidas) {

            const valor_propiedad = req.body[propiedad]
            if (valor_propiedad !== undefined) {
                let pasoValidacion = propiedades_permitidas[propiedad].validate(valor_propiedad)
                if (!pasoValidacion) {
                    errores.push(propiedades_permitidas[propiedad].error)
                }
            }
        }

        if (errores.length > 0) {
            let error = `Errores: ${errores.join(' - ')}`
            response
                .setMessage("Bad request")
                .setPayload({
                    detail: error
                })
                .build()

            return res.json(response)
        }



        const products = JSON.parse(await fs.promises.readFile("./data/products.json", "utf-8"))



        //Validar products
        const product = products.find(product => product.id === Number(product_id))

        if (!product) {
            response
                .setStatus(404)
                .setMessage('No se encontro el producto')
                .setPayload({
                    product: null
                })
                .build()

            return res.json(response)
        }

        const nuevasPropiedades = req.body
        //VALIDAR QUE EL TITULO NUEVO NO SEA IGUAL A ALGUN TITULO YA EXISTENTE EXCEPTUANDO EL MISMO PRODUCTO
        //Si la propiedad es titulo, valido que el titulo no este escrito, exceptuando que el id de ese titulo repetido sea igual al id recibo
        for (let nuevaPropiedad in nuevasPropiedades) {
            if (nuevaPropiedad === 'title') {
                let algunProductoTieneMismoTitulo = products.some(product => {
                    return (
                        product.id === Number(product_id)
                            ? false //Excepcion
                            : product.title === nuevasPropiedades[nuevaPropiedad]
                    )
                })
                if (algunProductoTieneMismoTitulo) {
                    response
                        .setMessage('Bad request')
                        .setPayload({
                            detail: 'El titulo ya esta en uso'
                        })
                        .build()
                    return res.json(response)
                }
            }

            product[nuevaPropiedad] = nuevasPropiedades[nuevaPropiedad]
        }

        await fs.promises.writeFile("./data/products.json", JSON.stringify(products))

        response
            .setOk(true)
            .setStatus(200)
            .setMessage('Producto actualizado')
            .setPayload({
                product: product
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

        res.json(response)
        return
    }
}

export const deleteProductController  = async (req, res) => {
    try {
        const { product_id } = req.params;

        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Bad request')

        if (isNaN(product_id)) {
            response
                .setPayload(
                    {
                        detail: 'El product_id debe ser un numero'
                    }
                )
                .build()
            return res.json(response)
        }

        let products = JSON.parse(await fs.promises.readFile("./data/products.json", "utf-8")).filter(product => product.active)

        //Validar products
        const product = products.find(product => product.id === Number(product_id))

        if (!product) {
            response
                .setStatus(404)
                .setMessage('No se encontro el producto')
                .setPayload({
                    product: null
                })
                .build()

            return res.json(response)
        }


        
        product.active = false
        await fs.promises.writeFile('./data/products.json', JSON.stringify(products, null, 2))
        products = products.filter(product => product.active)
        response
        .setOk(true)
        .setMessage('Producto eliminado')
        .setStatus(200)
        .setPayload(
            { 
                message: 'Producto eliminado', 
                products: products 
            }).build()
        return res.status(200).json(response)
       
    } catch (error) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setMessage('INTERNAL SERVER ERROR')
        .setStatus(500)
        .setPayload({ products: null, error: error.message }).build()
        return res.status(200).json(response)
    }
}

export const getProductByIdController = async (req, res) => {
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
}