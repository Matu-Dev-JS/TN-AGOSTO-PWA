


//Los middlewares son funciones que se interponen entre una consulta y la respuesta del servidor (controlador)
//Recibe request, response y next
//next es una funcion que va indicar que la consulta puede seguir al siguiente middeware o controlador
const testMiddleware = (req, res, next) => {
    console.log('middleware ejecutado')
    if(.5 < Math.random()){
        res.status(400).json({message: 'Error no has tenido suerte'})
    }
    else{
        //Cuando active next estoy pasando al siguiente middleware o controlador
        next()
    }
}

export default testMiddleware