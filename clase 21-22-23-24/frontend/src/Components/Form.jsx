import React from 'react'
import useForm from '../Hooks/useForm'

const Form = ({children, action, form_fields, inital_state_form}) => {
    //children hace referencia a el contenido encerrado como hijo de nuestro componente
    const { formState, handleChange } = useForm(inital_state_form)

    const handleSubmit = (e) => {
        e.preventDefault()
        action(formState)
    }
    

    return (
        <form onSubmit={handleSubmit}>

            <FieldList form_fields={form_fields} handleChange={handleChange} form_state={formState}/>
            {children}
        </form>
    )
}   

const FieldList = ({form_fields, handleChange, form_state} ) => {
    return (
        form_fields.map((field, index) => {
            return (
                <Field 
                key={index + field.field_data_props.name} 
                field={field} 
                handleChange={handleChange} 
                state_value={form_state[field.field_data_props.name]}
                />
            )
        })
    )
}

/* 
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
*/

const Field = ({field, handleChange, state_value}) => {
    return (
        <div {...field.field_container_props}>
            {field.label_text && <label>{field.label_text}</label>}
            <>
                {
                    field.field_component === 'INPUT'
                    ? <input  onChange={handleChange} value={state_value} {...field.field_data_props}/>
                    : <textarea></textarea>
                }
            </>
        </div>
    )
}



/* const InputSelected = ({type}) =>{
    const INPUTS = {
        "INPUT": <input/>,
        "TEXTAREA": <textarea/>
    }
    return INPUTS[type]
}


<InputSelected type={"INPUT"} /> */




export default Form