


/* FETCH y ASYNC */

/* Que es fetch */
/* Que permite hacer? */


/* 
Las promesas tienen estados

-Pending => indica que dicha promesa aun esta pendiente de resolucion
-Resolved => la promesa fue rusuelta
-Rejected => la promesa fue rechazada o hubo un fallo al resolverse
*/

/* 1s cargarse */


/* const obtenerAnakin = async () => {
    const respuesta = await fetch('https://swapi.dev/api/people/1', {
        method: 'GET'
    })
    const data = await respuesta.json()
    return data
} */

/* const obtenerPagina = async () => {
    const respuesta = await fetch('https://swapi.dev', {
        method: 'GET'
    })
    console.log('persona2', respuesta)
}
 */
/* const renderizarPersonaje = async () => {
    const {name} = await obtenerAnakin()

    document.write(name)
}


renderizarPersonaje() */
/* obtenerAnakin()
obtenerAnakin2() */





/* fetch('https://swapi.dev/api/people/1', {
    method: 'GET'
})

fetch('https://swapi.dev/api/people/1', {
    method: 'GET'
}) */

/* POST /api/products  le voy a enviar un objeto*/



/* Callback es una funcion pasada por parametro */


const usuarios = [
    {
        nombre: 'Pepe',
        edad: 30
    },
    {
        nombre: 'Maria',
        edad: 49
    },
    {
        nombre: 'Jose',
        edad: 56
    },

]
console.log(usuarios)
/* usuarios.push() */

/* For each recibe una funcion, la cual invocara por detras */
/* usuarios.forEach((usuario, indice, listaDeUsuarios) =>{
    console.log('hola ' + usuario.nombre)
}) */

const filterPro = (array, accionCallbackFn) => {
    const resultado = []

    for(const elemento of array){
        if(accionCallbackFn(elemento)){
            resultado.push(elemento)
        }
    }

    return resultado
}

const resultado = filterPro(usuarios, (usuario) =>{
    return usuario.edad > 35
})

console.log(resultado)