import React from "react"
import { Link } from "react-router-dom"
import ProductCard from "./ProductCard"

const ProductsList = ({products}) => {
    return (
        <div>
            {products.map(product => {
                return (
                    <ProductCard {...product} />
                )
            })}
        </div>
    )
}



export default ProductsList