
//Manejo que error tuvo cada campo 
/* function errorHandler(field_name, field_value){
    if (!field_value) {
        campos_permitidos[field_name].error = 'Por favor completa el campo'
    }
} */

    const ERRORS_VALIDATION_DICCIONARY = {
        'STRING_VALIDATION': 'STRING_VALIDATION'
        
    }
    
    
    const verifyString = (field_name, field_value) => {
        if(!(typeof(field_value) === 'string')){
            return {
                error: ERRORS_VALIDATION_DICCIONARY.STRING_VALIDATION,
                message: field_name + ' debe ser un texto',
            }
        }
    }
    const verifyMinLength = (field_name, field_value, minLength) => {
        if(!(field_value.length > minLength)){
            return {
                error: 'MIN_LENGTH_VALIDATION',
                message: field_name + ' debe tener como minimo ' + minLength + ' caracteres',
            }
        }
    }
    
    const verifyNumber = (field_name, field_value) => {
        if(!(typeof field_value === 'number')){
            return {
                error: 'NUMBER_VALIDATION',
                message: field_name + ' debe ser un numero',
            }
        }
    }
    
    //Hacer verifyNumber
    
    controllers.renderNewProductPost = async (req, res) => {
        try {
            const { nombre, precio, descripcion, categorias, stock } = req.body;
    
            const form = {
                nombre: { 
                    valor: nombre, 
                    errors: [],
                    validations:[
                        verifyString,
                        (field_name, field_value) => verifyMinLength(field_name, field_value, 5)
                    ]
                },
                precio: { 
                    valor: precio, 
                    errors: [],
                    validations: [
                        verifyNumber
                    ]
    
                },
                descripcion: { 
                    valor: descripcion, 
                    errors: [],
                    validations: [
                        verifyString,
                        (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
                    ]
                },
                categorias: { 
                    valor: categorias, 
                    errors: [],
                    validations: [
    
                    ]
                },
                stock: { 
                    valor: stock, 
                    errors: [],
                    validations: [
                        verifyNumber
                    ]
                }
            };
    
            /* 
            Aqui recorremos los campos del formulario y por cada campo activamos las validaciones de dicho campo.
            En caso de que una validacion falle, insertamos dicho fallo sobre la lista de errores de ese campo.
            */
            let hayErrores = false
            for(let field_name in form){
                for(let validation of form[field_name].validations){
                    /* result: {error, message} | undefined */
                    let result = validation(field_name, form[field_name].valor)
                    if(result){
                        hayErrores = true
                        form[field_name].errors.push(result)
                    }
                }
            }
            if(hayErrores){
                const response = new ViewPropBuilder()
                .setStatus(400)
                .setLayout('main')
                .setData({
                    form_state: form,
                })
                .build();
                return res.status(400).render('newProduct', response);
            }
    
    
            const products = JSON.parse(await fs.promises.readFile('./data/data.json', { encoding: 'utf-8' }));
            if (!products) {
                const response = new ViewPropBuilder().setStatus(500).setLayout('main').setData({ message: 'Products not found' }).build()
                return res.status(500).render('error', response)
            }
            const newProduct = {
                id: products.length + 1,
                nombre,
                precio,
                descripcion,
                categorias,
                stock
            }
    
            products.push(newProduct)
            await fs.promises.writeFile('./data/data.json', JSON.stringify(products, null, 2), { encoding: 'utf-8' })
            return res.status(200).redirect('/');
        } catch (error) {
            const response = new ViewPropBuilder()
                .setStatus(500)
                .setLayout(null)
                .setData({ error: error.code })
                .build();
            return res.status(500).send(response);
        }
    };