import ENVIROMENT from "../config/enviroment.js"
import ResponseBuilder from "../helpers/builders/responseBuilder.js"
import trasporterEmail from "../helpers/emailTransporter.helpers.js"
import { verifyEmail, verifyMinLength, verifyString } from "../helpers/validations.helpers.js"
import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'


export const registerController = async (req, res) => {
    try {
        const { name, password, email } = req.body
        const registerConfig = {
            name: {
                value: name,
                errors: [],
                validation: [
                    verifyString,
                    (field_name, field_value) => verifyMinLength(field_name, field_value, 5)
                ]
            },
            password: {
                value: password,
                errors: [],
                validation: [
                    verifyString,
                    (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
                ]
            },
            email: {
                value: email,
                errors: [],
                validation: [
                    verifyEmail,
                    (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
                ]
            }
        }
        let hayErrores = false
        for (let field_name in registerConfig) {
            for (let validation of registerConfig[field_name].validation) {
                let result = validation(field_name, registerConfig[field_name].value)
                if (result) {
                    hayErrores = true
                    registerConfig[field_name].errors.push(result)
                }
            }
        }

        /* 
        {
            fields: {}
        }
        validator.setField(FIELDS.EMAIL)
        validator.validate()
        validator.hasErrors()
        */


        if (hayErrores) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setCode('VALIDATION_ERROR')
                .setData(
                    {
                        registerState: registerConfig
                    }
                )
                .build()
            return res.json(response)
        }

        const hashedPassword = await bcrypt.hash(registerConfig.password.value, 10)

        const validationToken = jwt.sign(
            {
                email: registerConfig.email.value
            },
            ENVIROMENT.SECRET_KEY,
            {
                expiresIn: '1d'
            }
        )

        const redirectUrl = `http://localhost:3000/api/auth/verify-email/` + validationToken

        const result = await trasporterEmail.sendMail({
            subject: 'Valida tu email',
            to: registerConfig.email.value,
            html: `
                <h1>Valida tu mail</h1>
                <p>Para validar tu mail da click <a href='${redirectUrl}'>aqui</a></p>
            `
        })






        const userCreated = new User({
            name: registerConfig.name.value,
            email: registerConfig.email.value,
            password: hashedPassword,
            verficationToken: ''
        })
        await userCreated.save() //Esto lo guardara en mongoDB




        const response = new ResponseBuilder()
            .setCode('SUCCESS')
            .setOk(true)
            .setStatus(200)
            .setData(
                { registerResult: registerConfig }
            )
            .build()
        return res.json(response)
    }
    catch (error) {

        if (error.code === 11000) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setCode(400)
                .setMessage('Email already registered')
                .setData({
                    detail: 'El email ya esta registrado'
                })
                .build()
            return res.json(response)
        }


    }
}


export const verifyEmailController = async (req, res) => {
    try {
        const { validation_token } = req.params

        const payload = jwt.verify(validation_token, ENVIROMENT.SECRET_KEY)
        const email_to_verify = payload.email
        const user_to_verify = await User.findOne({ email: email_to_verify })
        user_to_verify.emailVerified = true
        await user_to_verify.save()
        //res.send(`<h1>Email verificado exitosamente, por favor logueate</h1>`)
        res.sendStatus(200)
        //res.redirect('http://localhost:5173/login')
    }
    catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

//email: 'pepe' password: 'p'

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        //Validacion de datos (tarea)

        const user = await User.findOne({ email: email })
        
        if(!user){
            res.sendStatus(404)
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) {
            //throw o res.status(401).json
        }

        if (!user.emailVerified) {
            res.sendStatus(403)
        }

        const access_token = jwt.sign(
            {
                user_id: user._id,
                name: user.name,
                email: user.email
            },
            ENVIROMENT.SECRET_KEY,
            {
                expiresIn: '1d' //Esto determina cuanto dura la sesion
            }
        )

        const response = new ResponseBuilder()
        .setOk(true)
        .setCode('LOGGED_SUCCESS')
        .setMessage('Logged success!')
        .setStatus(200)
        .setData({
            access_token: access_token,
            user_info: {
                user_id: user._id,
                name: user.name,
                email: user.email
            }
        })
        .build()

        res.status(200).json(response)


        //Recibir del body el email y la password | hecho
        //Validar estos datos | hecho
        //Buscar en la DB si existe un usuario con dicho mail | hecho
        //Comparar la password hasheada del usuario con la password recibida | hecho
        //Si no es igual tirar error | hecho
        //verficar si su emailVerified es verdadero (sino tirar error de logueo) | hecho
        //Generar un token de acceso con JWT donde guardemos datos como el user_id, nombre y el email | hecho
        //Responder existosamente con el token de acceso
    }
    catch (error) {

    }
}

/* 
response = {
    ok: true,
    status: 200,
    message: 'Login success',
    data: {
        token: '',
        user_info: {
            name,
            email,
            user_id
        }
    }
} */

export const forgotPasswordController = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({email: email})

    const reset_token = jwt.sign(
        {email: user.email},
        ENVIROMENT.SECRET_KEY,
        { expiresIn: '1d'}
    )

    const resetUrl = `${ENVIROMENT.FRONTEND_URL}/auth/recovery-password/${reset_token}`

    const result = await trasporterEmail.sendMail({
        subject: 'Recuperar password',
        to: user.email,
        html:`<a href=${resetUrl}> Recuperar </a>`
    })


    res.sendStatus(200)
    //Recibir el email del body
    //Buscar al usuario por email (si no esta devolver 404)
    //Firmar reset_token con el email dentro
    //Crear una resetUrl = url_front/resetPassword/$reset_token
    //Enviar un mail con asunto: recuperar contraseña y un link con el resetUrl
    //responder con 200
}


export const recoveryPasswordController = () => {
    //Caputurar el reset_token de params
    //Validar el token y obtienen el email del payload
    //Buscar en la db al usuario con ese email
    //Validar que contraseña nueva este
    //Hashear la password

    //Ejemplo de actualizar con mongoose
    // const user = await User.findOne({email: email})
    // user.password = newPassword
    // user.save()
    //Responder con status 200
}