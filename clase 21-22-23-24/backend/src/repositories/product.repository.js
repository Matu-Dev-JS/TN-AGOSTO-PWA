import Product from "../models/products.model.js";




//Capa logica de nuestra app para comunicar con la DB
class ProductRepository {
    
    /**
     * Creates a new product
     * @param {Object} new_product_data - new product data to be stored in the DB
     * @returns {Promise<Product>} - a Promise that resolves to the newly created product
     */
    static async createProduct ( new_product_data ) {
        const new_product = new Product(new_product_data)
        return await new_product.save()
    }
    
    /**
     * Updates a product with the given id
     * @param {string} product_id - id of the product to update
     * @param {Object} updated_data - data to be updated in the product
     * @returns {Promise<Product>} - a Promise that resolves to the updated product
     */
    static async updateProduct (product_id, updated_data) {
        return Product.findByIdAndUpdate(product_id, updated_data)
    }

    /**
     * Retrieves all active products from the database
     * @returns {Promise<Array<Product>>} - A promise that resolves to an array of active products
     */
    static async getAllProducts (){
        return Product.find({active: true})
    }

    /**
     * Retrieves a product by its id
     * @param {string} product_id - id of the product to retrieve
     * @returns {Promise<Product>} - a Promise that resolves to the product with the given id
     */
    static async getProductById(product_id){
        return Product.findById(product_id)
    }

    /**
     * Deletes a product with the given id
     * @param {string} product_id - id of the product to delete
     * @returns {Promise<Product>} - a Promise that resolves to the deleted product
     */
    static async deleteProduct (product_id) {
        //El {new: true} indica que debe devolver el producto actualizado
        return Product.findByIdAndUpdate(product_id, {active: false}, {new: true})
    }
}

export default ProductRepository