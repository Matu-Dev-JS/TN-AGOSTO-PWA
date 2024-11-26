import React, { useContext, useEffect } from 'react'
import useProducts from '../Hooks/useProducts'
import { Link } from 'react-router-dom'




const HomeScreen = () => {
    const {products_state, products_loading_state, products_error_state} = useProducts()
    //Necesito el is_authenticated_state

  return (
    <div>
        <h1>Bienvenido a Brand name</h1>
        {/* 
        Ver si el usuario tiene rol de admin y si tiene rol de admin mostrar el boton de crear producto
        este boton te llevara a /product/new y nos mostrara un formulario para crear el producto
        */}
        <div>
            {
                products_loading_state
                ? <span>Cargando</span>
                : (
                    products_error_state
                    ? <span>{products_error_state}</span>
                    : <div>
                        {
                            products_state.map(
                                (product) => {
                                    return (
                                       <Product product={product} key={product._id}/>
                                    )
                                    
                                }
                            )

                        }
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default HomeScreen

const Product = ({product}) => {

    return (
        <div key={product._id}>
            <h2>{product.title}</h2>
            <span>Precio ${product.price}</span>
            <Link to={`/product/${product._id}`}>Ver detalle</Link>
        </div>
    )
}    