
//Una funcion que me devuelve los headers de una consulta autenticada
const getAuthenticatedHeaders = () => {
    const access_token = sessionStorage.getItem('access-token')
    return { 
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    }
}

export {getAuthenticatedHeaders}