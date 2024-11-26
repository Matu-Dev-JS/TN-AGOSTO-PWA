import {  createContext, useEffect, useState } from "react";

//Es un component
export const AuthContext = createContext()

//Necesitamos crear el componente proveedor

export const AuthProvider = ({children}) =>{
    //children es una prop para pasar el contenido hijo de nuestro componente

    //Si hay token en el session o localstorage entonces esta authentificado


    const [is_authenticated_state, setIsAuthenticatedState] = useState(Boolean(sessionStorage.getItem('access_token')))
    useEffect(
        () =>{
            Boolean(sessionStorage.getItem('access_token')) && setIsAuthenticatedState(true)
        },
        []
    )
    return (
        <AuthContext.Provider 
            value={
                {
                    is_authenticated_state
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}