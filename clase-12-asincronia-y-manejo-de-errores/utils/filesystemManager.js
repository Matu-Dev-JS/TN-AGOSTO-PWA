

import filesystem from 'fs'

//crar archivo
//filesystem.promises.writeFile(fileName, data, {encoding: 'utf-8'} )
//leer archivos
//filesystem.promises.readFile(fileName, {encoding: 'utf-8'})


//Crear la sig funcion
const crearJson = async (fileName, data) => {
    try{
        if(!fileName){
            throw {code: 'ERR_INVALID_ARG_TYPE', detail:  'Falta fileName en crearJson, se esperaba un dato verdadero pero recibio ' + fileName}
        }
        if(!data){
            throw {code: 'ERR_INVALID_ARG_TYPE', detail: 'Falta data en crearJson, se esperaba un dato verdadero pero recibio ' + data}
        }
        await filesystem.promises.writeFile(`./public/${fileName}.json`, JSON.stringify(data), { encoding: 'utf-8' });
        console.log(`Archivo ${fileName}.json creado con éxito.`);
    }
    /* error es el objeto de error */
    catch(error){
        if(error.code == 'ERR_INVALID_ARG_TYPE' ){
            console.error(error.detail)
        }
        else{
            
            throw error
        }
    }
    
}


/* const ERRORES = {
    'ERR_INVALID_ARG_TYPE': {
        detail: 'argumentos invalidos',
        fn: () => {
            Envio de ticket al slack reportes
        }
    },
    'ERROR_GENERICO': {
        
    }
}
 */

//Ejemplo de uso
//crearJson('data', [])
//Debe crear a un archivo llamado data.json con el contenido: []

const leerJson = async (name) => {
    const nombreJSON = './public/' + name + '.json'
    const contenido = await filesystem.promises.readFile(nombreJSON, { encoding: 'utf-8' })
    const dataJSON = JSON.parse(contenido)
    console.log(dataJSON)
}

/* 
Agregar try catch a las funciones crearJson y leerJson
Deben tener sus propias validaciones de parametros (es decir que los parametros sean valores correctos)
Ejemplo:
crearJson(fileName, data)
fileName = string con almenos un caracter
data = data debe ser de tipo objeto y debe ser verdadero
Ojito con el null!!
data = null
typeof (data) => 'object'

Tambien los errores genericos los mostraran por consola de error

Condiciones:
Su codigo NO debe crashear

Recomendaciones: 
Para probar que su codigo no crashee usen la siguiente funcion
const test = async ( ) => {
    try{
        const result = await crearJson('data')

        console.log('accion super importante')

    }
    catch(error){
        console.error(error)
    }
}
test()

Si su codigo esta bien, deberia mostar por consola SIEMPRE 'accion super importante'

*/



//ejemplo de uso
//leerJson('data')
//Debe devolver el contenido de data.json

export {crearJson, leerJson}

/* 
    Crear una clase llamada JSONFileManager que tendra 2 metodos estaticos
    crearJson
    leerJson
*/

class ProductsManager {
    static productCategories = {
        "TECNOLOGY": "TECNOLOGY",
        "HOME": "HOME",
        "OFFICE": "OFFICE"
    }
    
    constructor (){
        this.valor = 'pepe'
    }


    static async createProduct(){
        /* logica de codigo */
    } 
    static async deleteProduct(){
        /* logica de codigo */

    } 

}

ProductsManager.createProduct()
ProductsManager.deleteProduct()
ProductsManager.productCategories


/* 
Crear un archivo llamado counters.json usando la funcion crearJson, counters.json sera un objeto con el sig formato
{
    products: 0
}

Crear un ProductManager
debe ser una clase con los metodos estaticos:
createProduct
updateProduct
deleteProduct
getProducts
getProductById

Debe manejarse con persistencia de datos con filesystem usando las funciones de utilidad creadas en filesystemManager.js. Los productos se pueden guardar en un archivo llamado products.json

Se debe tener en cuenta que al crear un producto se recibira titulo, descripcion y precio, el id se le asignara automaticamente usando un contador que debe persistir en el archivo json llamado counters.json. Obviamente al crear un producto el contador se debe actualizar en el archivo counters.json y se debe guardar

REGLAS:
-No se puede modificar los archivos usando filesystem, siempre deberemos usar la funcion crearJson o leerJson
-No puede crashear la aplicacion, los errores deben estar manejados
-Los parametros de cada funcion deben estar validados y en caso de no estar deberan tener sus propios throws

*/