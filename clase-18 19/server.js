import express from 'express'
import express_handlebars from 'express-handlebars'

const app = express()
const PORT = 3000

//Configuramos nuestro motor de plantillas

//1) Indicamos a la aplicacion que motor debe utilizar
app.engine('handlebars', express_handlebars.engine())

//2) Indicamos que usaremos como plantilla
app.set('view engine', 'handlebars')

//3) Indicamos la direccion donde estaran nuestras plantillas
app.set('views', './views')

app.use(express.static('public'))

app.get('/', (req, res)=> {

    /* 
    res.render indica que voy a renderizar y devolver HTML como respuesta

    res.render debe recibir el nombre de la vista y un objeto de opciones.

    res.render('', {layout: ''})Podemos pasarle en el objeto de opciones la prop layout con el valor del nombre del layout que queremos usar (por defecto se usara main.layout) o podemos indicarle false para indicar que NO se usara layout (solo cargara la vista)
    */
    res.render('home', {
        layout: 'main', 
        data: {
            title: 'Pagina 6',
            username: 'juancito'
        },
        helpers: {
            isRegistered(){
                //Esta funcion se carga del lado del servidor
                return 1 === 1 && 'juancito'.length > 60
            },
        }
        
    })
})


app.listen(PORT, ()=> {
    console.log(`La aplicacion se esta ejecutando en http://localhost:${PORT}`)
})