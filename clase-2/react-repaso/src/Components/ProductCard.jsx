import React from "react"
import { Link } from "react-router-dom"

const ProductCard = ({nombre, precio, imagen, id, descripcion}) => {
    return (
        <div>
            <h2>{nombre}</h2>
            <img src={imagen} alt={nombre} />
            <span>Precio: ${precio}</span>
            <p>{descripcion}</p>
            <Link to={'/detail/' + id}>Ver detalle</Link>
            <hr/>
        </div>
    )
}

export default ProductCard