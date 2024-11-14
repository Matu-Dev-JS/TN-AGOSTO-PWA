import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/enviroment.js'
import AppError from '../helpers/errors/app.error.js'


const authMiddleware = (roles_permitidos) => {
    //Hago lo que quiera con este parametro
    return (req, res, next) => {
        try {
            //Este header generalmente tiene informacion de la authorizacion
            const auth_header = req.headers['authorization'] //'Bearer token_value'

            if (!auth_header) {
                return res.json({ message: 'Falta el token de autorizacion' })
            }
            //'Bearer token_value'.split(' ') => ['Bearer', 'token_value']
            const access_token = auth_header.split(' ')[1]

            if (!access_token) {
                return res.json({ message: 'El token de autorizacion esta malformado' })
            }

            const user_session_payload_decoded = jwt.verify(access_token, ENVIROMENT.SECRET_KEY)

            if(!roles_permitidos.includes(user_session_payload_decoded.role)){

                return res.json({ message: 'No tienes permisos para esa operacion' , status: 403})
            }

            //request es un objeto con datos de la consulta

            //Guardamos en el objeto request informacion de sesion del usuario
            req.user = user_session_payload_decoded

            next() //ir al controlador o middleware siguiente
        }
        catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }
}
//productRouter.delete('/:product_id', authMiddleware, deleteProductController)

//productRouter.delete('/:product_id', authMiddleware(['admin']), deleteProductController)

export default authMiddleware