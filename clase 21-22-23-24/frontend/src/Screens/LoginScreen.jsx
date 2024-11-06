import React from 'react'
import useForm from '../Hooks/useForm'

const LoginScreen = () => {
	const { formState, handleChange } = useForm({
		email: '',
		password: ''
	})

	console.log(formState)
	const handleLogin = (e) => {
		e.preventDefault()

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