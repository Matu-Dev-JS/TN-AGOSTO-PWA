import ResponseBuilder from "../helpers/builders/responseBuilder.js"
import { verifyEmail, verifyMinLength, verifyString } from "../helpers/validations.helpers.js"
import User from "../models/user.model.js"
import bcrypt from 'bcrypt'


export const registerController = async (req, res) => {
    try{
        const {name, password, email} = req.body
        const registerConfig = {
            name: {
                value: name,
                errors: [],
                validation: [
                    verifyString,
                    (field_name, field_value) => verifyMinLength(field_name, field_value, 5)
                ]
            },
            password: {
                value: password,
                errors: [],
                validation: [
                    verifyString,
                    (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
                ]
            },
            email: {
                value: email,
                errors: [],
                validation: [
                    verifyEmail,
                    (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
                ]
            }
        }
        let hayErrores = false
        for (let field_name in registerConfig){
            for(let validation of registerConfig[field_name].validation){
                let result = validation(field_name, registerConfig[field_name].value)
                if(result){
                    hayErrores = true
                    registerConfig[field_name].errors.push(result)
                }
            }
        }
    
        if(hayErrores){
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setCode('VALIDATION_ERROR')
            .setData(
                {
                    registerState: registerConfig
                }
            )
            .build()
            return res.json(response)
        }
    
        const hashedPassword = await bcrypt.hash(registerConfig.password.value, 10)
    

        const userCreated = new User({
            name: registerConfig.name.value, 
            email: registerConfig.email.value, 
            password: hashedPassword, 
            verficationToken: ''
        })
        await userCreated.save() //Esto lo guardara en mongoDB
    
    
        
        
        const response = new ResponseBuilder()
        .setCode('SUCCESS')
        .setOk(true)
        .setStatus(200)
        .setData(
            {registerResult: registerConfig}
        )
        .build()
        return res.json(response)
    }
    catch(error){
        console.log(error)
    }
}

console.log(bcrypt.compareSync('pePe123456', "$2b$10$3kAs.RkWue6OIGU.gdCJLOeCMBqdD6uOy0eY5H/nHgnHDJTOXBvm2"))