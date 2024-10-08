
import ResponseBuilder from '../builders/response.builder.js'
import filesystem from 'fs'

const readJson = async (name) => {
    try{
        const file = JSON.parse(await filesystem.promises.readFile(`./data/${name}.json`, {encoding: 'utf-8'}))
        return file
    }
    catch (error) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage(`Error de lectura`)
        .setPayload({
            detail: error.message
        })
        .build()

        throw response
    }
}

const writeJson = async (name, data) => {
    try{
        console.log(data)
        const jsonString = JSON.stringify(data, null, 2)
        await filesystem.promises.writeFile(`./data/${name}.json`, jsonString, {encoding: 'utf-8'})
    }
    catch (error) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage(`Error de escritura`)
        .setPayload({
            detail: error.message
        })
        .build()

        throw response
    }
}

export {readJson, writeJson} 