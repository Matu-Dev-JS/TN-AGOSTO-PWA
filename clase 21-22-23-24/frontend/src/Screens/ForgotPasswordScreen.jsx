import React from 'react'
import useForm from '../Hooks/useForm'
import Form from '../Components/Form'
import { Link } from 'react-router-dom'

const ForgotPasswordScreen = () => {

    const form_fields = [
        {
            label_text: 'Ingresa el mail de recuperacion:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                name: 'email',
                id: 'email',
                placeholder:'joedoe@example.com',
                type: 'email'
            }
        }
    ]

    const inital_state_form = {
		email: ''
	}


    const submitForgotPassword = async (form_state) => {
        //Aca ya podemos hacer la accion que queramos

        const responseHTTP = await fetch('http://localhost:3000/api/auth/forgot-password',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: form_state.email
                })
            })

        const data = await responseHTTP.json()
        console.log(data)
    }
    return (
        <div>
            <h1>Restablecer contraseña </h1>
            <p>Al restablecer tu contraseña se enviara un correo electronico para enviarte las instrucciones de restablecimiento de contraseña</p>

            <Form form_fields={form_fields} action={submitForgotPassword} inital_state_form={inital_state_form}>
                <button type='submit'>Restablecer</button>
                <Link to='/login'>Iniciar sesion</Link>
            </Form>
        </div>
    )
}

export default ForgotPasswordScreen