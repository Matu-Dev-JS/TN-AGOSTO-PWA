export const productos = [
    {
        id: 1,
        nombre: 'PC gamer Dell',
        precio: 2000,
        stock: 2,
        categorias: ['gamer', 'computadoras', 'tecnologia'],
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_858708-MLA72460118102_102023-O.webp',
        descripcion: 'lorem'
    },
    {
        id: 2,
        nombre: 'Notebook gamer',
        precio: 1500,
        stock: 5,
        categorias: ['gamer', 'computadoras', 'tecnologia'],
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_858708-MLA72460118102_102023-O.webp',
        descripcion: 'lorem'
    },
    {
        id: 3,
        nombre: 'Mouse gamer',
        precio: 500,    
        stock: 10,
        categorias: ['gamer', 'computadoras', 'tecnologia'],
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_858708-MLA72460118102_102023-O.webp',
        descripcion: 'lorem'
    },
    {
        id: 4,
        nombre: 'Teclado gamer',
        precio: 1000,
        stock: 15,
        categorias: ['gamer', 'computadoras', 'tecnologia'],
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_858708-MLA72460118102_102023-O.webp',
        descripcion: 'lorem'
    }
]


export const buscarProductoPorId = (id) => {
    return productos.find(producto => producto.id == id)
}