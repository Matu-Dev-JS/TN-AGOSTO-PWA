import express from 'express'
import statusRouter from './routes/status.route.js'
import authRouter from './routes/auth.route.js'
import mongoDB from './config/db.config.js'
import cors from 'cors'
import productRouter from './routes/product.route.js'
import errorHandlerMiddleware from './middlewares/errorHandler.middleware.js'
import pool from './config/dbMysql.config.js'
import ProductRepository from './repositories/product.repository.js'

const PORT = 3000
const app = express()


//Middleware que habilita las consultas de origen cruzado
app.use(cors())

app.use(express.json())

app.use('/api/status', statusRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)


app.use(errorHandlerMiddleware)

app.listen(PORT, ()=> {
    console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`)
})


/* ProductRepository.createProduct({
    title: 'test', 
    price: 1.1,
    stock: 1,
    description: "test", 
    seller_id: 1,
    category: "test", 
    image_base64: null
})
 */

ProductRepository.getAllProducts()