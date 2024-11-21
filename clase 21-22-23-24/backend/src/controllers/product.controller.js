import AppError from "../helpers/errors/app.error.js";
import ProductRepository from "../repositories/product.repository.js";


export const createProductController = async (req, res) => {
    try {
        const { new_product } = req.body
        if (!new_product) {
            return res.status(400).json({ message: "Debe ingresar datos del producto a crear!!" })
        }

        const product = await ProductRepository.createProduct(new_product)
        res.status(201).json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al crear el nuevo producto!!" })
    }
}


export const deleteProductController = async (req, res) => {
    try {
        const { product_id } = req.params
        if (!product_id) {
            return res.status(400).json({ message: "Es necesario un numero de ID!!" })
        }

        const product = await ProductRepository.deleteProduct(product_id)
        if (product) {
            res.status(200).json({ message: "Producto eliminado correctamente!!" })
        } else {
            res.status(404).json({ message: "Producto no encontrado!!" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al eliminar el producto!!" })
    }
}


    export const updateProductController = async (req, res) => {
        try {
            const { product_id } = req.params
            const { updated_data } = req.body
    
            if (!updated_data) {
                return res.status(400).json({ message: "Es necesario los datos para actualizar el producto" })
            }
    
            const updatedProduct = await ProductRepository.updateProduct(product_id, updated_data)
            if (updatedProduct) {
                res.status(200).json('Producto actualizado' + updatedProduct)
            } else {
                res.status(404).json({ message: "El producto no fue encontrado!!" })
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Error al actualizar el producto!!" })
        }
    }


    export const getProductByIdController = async (req, res, next) => {
        try {
            const { product_id } = req.params
            if (!product_id) {
                return next(new AppError('Se necesita un product_id', 400))
            }
    
            const product = await ProductRepository.getProductById(product_id)
            if (product) {
                res.status(200).json({
                    ok:true,
                    message:'Producto obtenido',
                    payload: {
                        product: product
                    }
                })
            } else {
                //Yo puedo pasar a next el parametro para x middleware
                return next(new AppError('Producto no encontrado', 404))
            }
        } catch (error) {
            
            next(error)
        }
    }

    export const getAllProductController = async (req, res) => {
        try {
            const products = await ProductRepository.getAllProducts()
            res.status(200).json({
                ok: true,
                payload: {
                    products
                }
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                ok: false,
                message: "Hubo un error al obtener los productos!!", 
                error: "Hubo un error al obtener los productos!!"
            })
        }
    }