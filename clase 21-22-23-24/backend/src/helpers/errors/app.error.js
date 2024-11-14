class AppError extends Error{
    constructor(message, status_code){
        super(message)
        this.status_code = status_code
        this.status = String(status_code).startsWith('4') ? 'fail' : 'error'//error (sintaxis, err de databse), fail(no se encontro el producto)

        //Si debemos responder con ese error
        //Todos los errores de aplicacion deben tener su propia respuesta
        this.is_operational = true

        //Capturar la traza del error
        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError

//new Error('No se que paso') => {message: 'nose que paso'}
