import React, {useState} from 'react'
import useForm from '../Hooks/useForm'
import { useNavigate } from 'react-router-dom'


const RegisterScreen = () => {

    const navigate = useNavigate()

    //Cuando invoco a useForm se crea otro esta de formulario y me devuelve dicho estado una funcion para asociar a cada input y que modifiquen mi estado de formulario

    const {formState, handleChange} = useForm({
        name: '',
        email: '',
        password: ''
    })

    const [errorsState, setErrorsState ]  = useState({
        name: '',
        email: '',
        password: '',
        general: ''
    })

 
    const handleRegister = async (event) => {
        event.preventDefault()
        console.log('Formulario registro enviado')

        //Que hace fetch?
        //Nos permite hacer consultas HTTP
        const responseHTTP = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })

        console.log(responseHTTP)
        
        const data = await responseHTTP.json()
        
        console.log(data)

        //TODO manejar errores del back

        if(!data.ok){
            //Tomar el error que venga del back y setear en caso de ser necesario errores
            if(data.data.registerState.name.errors){
                //seteamos el estado de error
                setErrorsState((prevState ) => { 
                    return {...prevState, name: data.data.registerState.name.errors}
                })
            }
        }
        else{
            navigate('/login')
        }
       
    }

   


    return (
        <div>
            <h1>Registrate en Brand name</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Ingresa tu nombre:</label>
                    <input 
                        name='name' 
                        id='name' 
                        placeholder='Cosme fulanito' 
                        type='text' 
                        onChange={handleChange}
                        value={formState.name}
                    />
                    {
                        errorsState.name && <span>{errorsState.name}</span>
                    }
                </div>
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
                    {
                        errorsState.email && <span>{errorsState.email}</span>
                    }
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
                    {
                        errorsState.password && <span>{errorsState.password}</span>
                    }
                </div>
                <button type='submit'>Registrar</button>
            </form>
        </div>
    )
}

export default RegisterScreen