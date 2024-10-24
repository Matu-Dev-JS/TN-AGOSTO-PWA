export const registerController = (req, res) => {
    const {name, password, email} = req.body

    //Tarea/TODO
    //Validar name, password, email

    //Imaginemos que los datos son validos
    
    res.json({ok: true})
}