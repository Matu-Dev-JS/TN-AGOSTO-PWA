//modulo con la logica de las variables de entorno de mi aplicacion

import dotenv from 'dotenv'

//process es una variable global que guarda datos del proceso de ejecucion de node
//Configuramos en process.env las variables de entorno del archivo .env
dotenv.config()


const ENVIROMENT = {
    EMAIL_PASSWORD:  process.env.EMAIL_PASSWORD || '',
    EMAIL_USER: process.env.EMAIL_USER || '',
    SECRET_KEY: '35ce6c97-b28f-4d9f-8f8c-f2bbc65a62f4' //TODO: pasarlo a .env
}

export default ENVIROMENT