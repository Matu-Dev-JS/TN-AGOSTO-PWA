import { crearJson, leerJson } from "./utils/filesystemManager.js";
const test = async ( ) => {
    try{
        const result = await crearJson('data')

        console.log('accion super importante')
        /* await leerJson('data') */
    }
    catch(error){
        console.error(error)
    }
}
test()

