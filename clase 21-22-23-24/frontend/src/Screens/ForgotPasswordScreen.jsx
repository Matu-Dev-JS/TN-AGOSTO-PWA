import React from 'react'

const ForgotPasswordScreen = () => {
    const handleForgotPassword = (e) => {
        e.preventDefault()
    }
    return (
        <div>
            <h1>Restablecer contraseña </h1>
            <p>Al restablecer tu contraseña se enviara un correo electronico para enviarte las instrucciones de restablecimiento de contraseña</p>
            <form onSubmit={handleForgotPassword}>
                
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
                <button type='submit'>Restablecer</button>
                <Link to='/login'>Iniciar sesion</Link>
            </form>
        </div>
    )
}

export default ForgotPasswordScreen