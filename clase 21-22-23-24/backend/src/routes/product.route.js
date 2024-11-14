
import express from 'express'
import { createProductController, deleteProductController, getAllProductController, getProductByIdController, updateProductController } from '../controllers/product.controller.js'
const productRouter = express.Router()


productRouter.get('/:product_id', getProductByIdController)
productRouter.get('/', getAllProductController)
productRouter.post('/', createProductController)
productRouter.put('/:product_id', updateProductController)
productRouter.delete('/:product_id', deleteProductController)

export default productRouter