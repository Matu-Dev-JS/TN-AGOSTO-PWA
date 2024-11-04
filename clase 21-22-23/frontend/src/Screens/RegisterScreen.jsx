import React from 'react'

const RegisterScreen = () => {

    const handleRegister = async (event) => {
        event.preventDefault()
        console.log('Formulario registro enviado')
        /* Obtener un objeto con todos los datos del form, ejemplo {name: '', email: '', password: ''} */
        
        const form_state = {
            email: '',
            password: '',
            name: ''
        }

        const formularioJSX = event.target
        const formulario_valores_form_data = new FormData(formularioJSX) 
        
        for(let campo in form_state){
            form_state[campo] = formulario_valores_form_data.get(campo)
        }

        //Todo esto lo hacemos para conseguir un objeto con los valores de mi formulario
        console.log(form_state)

        const responseHTTP = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form_state)
        })
        
        const data = await responseHTTP.json()
        
        console.log(data)
    }
    return (
        <div>
            <h1>Registrate en Brand name</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Ingresa tu nombre:</label>
                    <input name='name' id='name' placeholder='Cosme fulanito' type='text'/>
                </div>
                <div>
                    <label>Ingresa tu email:</label>
                    <input name='email' id='email' placeholder='cosmefulanito@gmail.com' type='email'/>
                </div>
                <div>
                    <label>Ingresa tu contraseña:</label>
                    <input name='password' id='password' placeholder='Tu_contraseña' type='password'/>
                </div>
                <button type='submit'>Registrar</button>
            </form>
        </div>
    )
}

export default RegisterScreen