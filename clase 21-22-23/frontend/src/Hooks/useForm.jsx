import { useState } from "react"

const useForm =  (initialForm) => {
    const [formState, setFormState] = useState(initialForm)
    

    const handleChange = (evento) => {
        evento.target// que es? Es el elemento HTML que emitio el evento
        evento.target.value//Que es? El valor del elemento HTML (el input)
        
        const field_name = evento.target.name
        const field_value = evento.target.value


        //La funcion setter de mi estado me permite modificar mi estado y re renderizar mi componente
        //Opcionalmente yo le puedo pasar una callback, la misma sera invocada y el valor de retorno de la callback sera el nuevo valor de mi estado
        //El parametro de la callback es el prevState o el estado previo de ese estado (osea el valor actual)
        setFormState((prevFormState) => {
            return {...prevFormState, [field_name]: field_value}
        })
        
    }

    //logica de formulario y estados
    return {
        formState,
        handleChange
    }
}

export default useForm