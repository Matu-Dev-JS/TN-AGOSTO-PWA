const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

export const verifyString = (field_name, field_value) => {
    if(!(typeof(field_value) === 'string')){
        return {
            error: 'STRING_VALIDATION',
            message: field_name + ' debe ser un texto',
        }
    }
}
export const verifyMinLength = (field_name, field_value, minLength) => {
    if(!(field_value.length >= minLength)){
        return {
            error: 'MIN_LENGTH_VALIDATION',
            message: field_name + ' debe tener como minimo ' + minLength + ' caracteres',
        }
    }
}

export const verifyNumber = (field_name, field_value) => {
    if(!(typeof field_value === 'number')){
        return {
            error: 'NUMBER_VALIDATION',
            message: field_name + ' debe ser un numero',
        }
    }
}

export const verifyEmail = (field_name, field_value) => {
    if(!(emailRegex.test(field_value))){
        return {
            error: 'EMAIL_VALIDATION',
            message: field_name + ' no cumple el formato email'
        }
    }
}