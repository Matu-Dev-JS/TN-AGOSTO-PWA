/* 
let producto = {
    nombre: 'Tv samsung',
    precio: 2000,
    id: 1,
    categoria: 'TECNOLOGIA'
}

let producto_2  = {
    nombre: 'Tv samsung',
    precio: 2000,
    id: 1,
    categoria: 'TECNOLOGIA'
}

const venderProducto = (producto ) => {
    console.log('Has vendido a ' + producto.nombre + ' y ahora me quedan ' + producto.stock)
    
} */

/* const sumar = (a, b) => a + b */

/* producto.stock = 10

console.log(venderProducto(producto_2))

console.log(sumar(1, 2)) */

//La clase se usa para crear objetos
class Producto {
    /* El constructor es una funcion que se a ejecutar cuando se cree el producto */
    constructor(nombre, precio){
        console.log("Creando un producto con clase, yeah 🤓😎")
        /* This es una autoreferencia al objeto que retornara la clase */
        console.log(nombre, precio)
        this.x_valor = 'hola'
        this.precio = precio
        this.nombre = nombre
    }

    //Declaracion de un metodo
    presentarProducto(cliente){
        console.log('Hola ' + cliente + ', este producto se llama ' + this.nombre)
    }
    comprar(cantidad){
        console.log('Comprar a ' + this.nombre + ' ' + cantidad + ' veces costara $' + (cantidad * this.precio))
    }


}

//Instanciar la clase Producto, esto retorna un objeto
let resultado = new Producto('tv LG', 800)
const samsung = new Producto('s20', 1200)


resultado.presentarProducto('pepe')
resultado.comprar(10)
samsung.comprar(10)

/* Comprar es un metodo que recibira una cantidad a comprar y me dira, 'comprar a {nombre} {x} veces costara ${total} */



//Funcion constructora de ES5 (YA NO SE USA)
function Item () {
    this.nombre = 'x item'
    Item.prototype.presentar = function(){
        console.log('Este producto se llama ' + this.nombre)
    }
}


let item_1 = new Item()

console.log(item_1)

item_1.presentar()