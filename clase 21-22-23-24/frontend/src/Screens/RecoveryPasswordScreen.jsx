import React from 'react'
import useForm from '../Hooks/useForm'
import {  Link, useParams } from 'react-router-dom'
import Form from '../Components/Form'

const RecoveryPasswordScreen = () => {
    const {reset_token} = useParams()
    console.log('Token de reset de contraseña:', reset_token)
    const actionRecoveryPassword = (form_state) => {
        console.log(form_state)
    }

    

    const form_fields = [
        {
            label_text: 'Ingresa nueva contraseña:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                name: 'password',
                id: 'password',
                placeholder:'',
                type: 'password'
            }
        }
    ]

    const inital_state_form = {
		password: ''
	}

    return (
        <div>
            <h1>Modifica tu contraseña </h1>
            <Form action={actionRecoveryPassword} form_fields={form_fields} inital_state_form={inital_state_form}> 
                
                <button type='submit'>Restablecer</button>
                <Link to='/login'>Iniciar sesion</Link>
            </Form>
        </div>
    )
}

export default RecoveryPasswordScreen