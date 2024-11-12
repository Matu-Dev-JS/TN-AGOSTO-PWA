import React from 'react'
import useForm from '../Hooks/useForm'
import { Link, useNavigate } from 'react-router-dom'

const LoginScreen = () => {
	const { formState, handleChange } = useForm({
		email: '',
		password: ''
	})
	const navigate  = useNavigate()
	console.log(formState)
	const handleLogin = async (e) => {
		e.preventDefault()
		const responseHTTP = await fetch('http://localhost:3000/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            })
        console.log(responseHTTP)
        const data = await responseHTTP.json()
		if(!data.ok){
			//Manejaran los estados de error
		}
		else{
			sessionStorage.setItem('access-token', data.data.access_token)
			navigate('/home')
		}
        console.log(data)
	}
	return (
		<div>
			<h1>Inicia sesion </h1>
			<form onSubmit={handleLogin}>
				<div>
					<label>Ingresa tu email:</label>
					<input
						name='email'
						id='email'
						placeholder='cosmefulanito@gmail.com'
						type='email'
						onChange={handleChange}
						value={formState.email}
					/>
				</div>
				<div>
					<label>Ingresa tu contraseña:</label>
					<input
						name='password'
						id='password'
						placeholder='Tu_contraseña'
						type='password'
						onChange={handleChange}
						value={formState.password}
					/>
				</div>
				<button type='submit'>Iniciar sesion</button>
				<Link to='/forgot-password'>Olvide mi contraseña</Link>
			</form>
		</div>
	)
}

export default LoginScreen