import React, { useEffect, useState } from "react"
import { getAuthenticatedHeaders } from "../utils/fetching"

const useProductDetail = (product_id) =>{
    const [product_detail_state, setProductDetail] = useState()
    const [product_detail_loading_state, setProductDetailLoading] = useState(true)
    const [product_detail_error_state, setProductDetailError] = useState(null)

    const getProductDetail = async (product_id) => {
        const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
            method: 'GET',
            headers: getAuthenticatedHeaders()
        })
        const data = await response.json()
        console.log(data)
        if(!data.ok) {
            //Seteamos el error para manejarlo despues
            setProductDetailError(data.error)
        }
        else{
            setProductDetail(data.payload.product)
        }
        setProductDetailLoading(false)
    }

    useEffect(
        () =>{
            getProductDetail(product_id)
        },
        []
    )
    
    return {
        product_detail_state, 
        product_detail_loading_state,
        product_detail_error_state
    }
}

export default useProductDetail