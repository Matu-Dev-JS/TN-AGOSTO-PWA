import React from 'react'
import useForm from '../Hooks/useForm'
import { Link, useParams } from 'react-router-dom'

const RecoveryPasswordScreen = () => {
    const {reset_token} = useParams()
    console.log('Token de reset de contraseña:', reset_token)
    const handleRecoveryPassword = (e) => {
        e.preventDefault()
    }

    const { formState, handleChange } = useForm({
		password: ''
	})
    return (
        <div>
            <h1>Modifica tu contraseña </h1>
   
            <form onSubmit={handleRecoveryPassword}>
                
                <div>
                    <label>Ingresa nueva contraseña:</label>
                    <input
                        name='password'
                        id='password'
                        placeholder=''
                        type='password'
                        onChange={handleChange}
                        value={formState.email}
                    />
                </div>
                <button type='submit'>Restablecer</button>
                <Link to='/login'>Iniciar sesion</Link>
            </form>
        </div>
    )
}

export default RecoveryPasswordScreen