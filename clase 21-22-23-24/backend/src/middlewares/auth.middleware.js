import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/enviroment.js'

const authMiddleware = (req, res, next) => {
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

        //request es un objeto con datos de la consulta

        //Guardamos en el objeto request informacion de sesion del usuario
        req.user = user_session_payload_decoded

        next() //ir al controlador o middleware siguiente
    }
    catch (error) {
        res.sendStatus(500)
    }   

} 

export default authMiddleware