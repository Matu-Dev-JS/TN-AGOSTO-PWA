import express from  'express'
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'

const app = express()
app.use(express.json())
const PORT = 3000

app.get('/ping', (req, res) =>{
    res.json({
        ok: true,
        message: 'Consulta exitosa',
        status: 200,
        payload: {
            value: 'Pong'
        }
    })
})

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.listen(PORT, () => {
    console.log(`La aplicacion se esta ejecutando en http://localhost:${PORT}`)
})