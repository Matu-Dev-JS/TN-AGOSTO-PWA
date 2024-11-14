
import express from 'express'
import { createProductController, deleteProductController, getAllProductController, getProductByIdController, updateProductController } from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
const productRouter = express.Router()


productRouter.get('/:product_id', authMiddleware(['user','admin']), getProductByIdController)
productRouter.get('/', authMiddleware(['user','admin']), getAllProductController)
productRouter.post('/', authMiddleware(['admin']), createProductController)
productRouter.put('/:product_id', authMiddleware(['admin']), updateProductController)
productRouter.delete('/:product_id', authMiddleware(['admin']), deleteProductController)

export default productRouter