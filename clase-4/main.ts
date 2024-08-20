/* Objeto literal */

/* 
interface Producto {
    nombre: string, 
    precio: number, 
    id: number, 
    categoria: string, 
    stock: number,
    descripcion: string
}

const producto : Producto = {
    nombre: 'Tv samsung',
    precio: 2000,
    id: 1,
    categoria: 'TECNOLOGIA',
    stock: 0,
    descripcion: 'lorem'
}

const producto_2 : Producto = {
    nombre: 'Tv samsung',
    precio: 2000,
    id: 1,
    categoria: 'TECNOLOGIA',
    stock: 100,
    descripcion: 'lorem'
}

console.log(producto.nombre)
console.log(producto['nombre'])

//Creando una propiedad
producto.stock = 10

//Reasignar propiedad
producto.nombre = 'LG 50"'


const venderProducto = (producto : Producto) => {
    console.log('Has vendido a ' + producto.nombre + ' y ahora me quedan ' + producto.stock)
}

venderProducto(producto)
venderProducto(producto_2)



const mixed : [number, string, boolean] = [10, 'pepe', false]
const nombres : string[] = ['pepe', 'juan', 'maria']
const notas : number[]= [10, 7, 5]

const productos : Producto[] = [
    producto, 
    producto_2
]
 */


class Usuario {
    /* TIPADO DE LAS PROPIEDADES DEL USUARIO */
    nombre: string
    role : string
    clave: string
    email : string
    edad : number
    cuit: number
    id: number

    //TIPADO DE LOS PARAMETROS DE LA FUNCION CONSTRUCTORA
    constructor(nombre : string, role : string, clave : string, email : string, edad : number, cuit : number, id: number){
        this.nombre = nombre
        this.role = role
        this.clave = clave
        this.email = email
        this.edad = edad
        this.cuit = cuit
        this.id = id
    }
}

/* const usuario_1 : Usuario = new Usuario('pepe', 'admin', '123', 'pepe@gmail.com', 72, 222132126)
const usuario_2 = new Usuario('pepe', 'admin', '123', 'pepe@gmail.com', 72, 222132126) */

class ManejadorUsuarios {
    usuarios : Usuario[]
    id_counter : number
    constructor(){
        this.usuarios = []
        this.id_counter = 0
    }

    agregarUsuario(nombre : string, role : string, clave :string, email : string, edad: number, cuit : number ){
        const nuevo_usuario : Usuario = new Usuario(nombre, role, clave, email, edad, cuit, this.id_counter++)
        this.usuarios.push(nuevo_usuario)
    }
    eliminarUsuarioPorId(){

    }
    obtenerUsuarios(){

    }
    
}


const manejador_usuarios : ManejadorUsuarios = new ManejadorUsuarios()

manejador_usuarios.agregarUsuario('pepe', 'admin', '123', 'pepe@gmail.com', 53, 213213132)

console.log(manejador_usuarios.usuarios)
/* console.log(usuario_1, usuario_2) */