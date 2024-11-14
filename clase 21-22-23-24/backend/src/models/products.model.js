/* 
title
price
stock
description
category
active
seller_id

*/

//Crear el modelo de productos

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,  
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    seller_id: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, 
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;