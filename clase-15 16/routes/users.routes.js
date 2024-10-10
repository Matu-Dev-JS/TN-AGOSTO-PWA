import express from "express"
import filesystem from 'fs'
import ResponseBuilder from "../builders/response.builder.js"

//instancio mi ruta y se lo asigno al user router
const userRouter = express.Router()


//La usamos como si fuera app, pero ahora tiene asignado las consultas a la ruta /api/users

//Endpoint real: /api/users + /
//Voy a buscar en mi lista de usuarios a todos los usuarios y devolvere a los que active = true
userRouter.get('/', async (req, res)=> {
    try{
        const users = JSON.parse( await filesystem.promises.readFile('./data/usuarios.json', {encoding: 'utf-8'}) )
        //Esto genera un objeto {response: {ok, status, message, payload}}
    
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('Usuarios obtenidos')
        .setPayload({
            users: users
        })
        .build() //Este siempre debe ir al final

        res.json(response)
    }
    catch (error){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('Internal server error')
        .setPayload({
            detail: error.message
        })
        .build()
        res.status(500).json(response)
    }
   
})

userRouter.delete('/:user_id', (req, res) =>{
    const {user_id} = req.params
    /*Logica para eliminar un usuario */
})

export default userRouter