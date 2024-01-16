const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const {name, image , type, countInStock, price, rating, description} = req.body;
        if(!name || !image || !type || !countInStock || !price || !rating){
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(400).json({
              status: "ERR",
              message: "The productId is required",
            });
          }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(400).json({
              status: "ERR",
              message: "The userId is required",
            });
          }
        const response = await ProductService.getDetailProduct(productId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}



const getAllProduct = async (req, res) => {
    try {
        const { limit, page } = req.query;
        const response = await ProductService.getAllProduct(Number(limit), Number(page))
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    getAllProduct
}