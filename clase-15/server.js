import express from  'express'
import userRouter from './routes/users.routes.js'

const app = express()

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

app.listen(PORT, () => {
    console.log(`La aplicacion se esta ejecutando en http://localhost:${PORT}`)
})