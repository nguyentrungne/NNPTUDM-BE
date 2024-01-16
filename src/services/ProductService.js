const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise( async(resolve, reject) =>{
        const {name, image , type, countInStock, price, rating, description} = newProduct;
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is already'
                })
            }
            const createProduct = await Product.create({
                name, image , type, countInStock, price, rating, description
            })
            if (createProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise( async(resolve, reject) =>{
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data,{new:true})

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct,
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getDetailProduct = (id) => {
    return new Promise( async(resolve, reject) =>{
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
        } catch (error) {
            reject(error)
        }
    })
}


const getAllProduct = ( limit, page ) => {
    return new Promise( async(resolve, reject) =>{
        try {
            const totalProduct = await Product.countDocuments()
            const getAllProduct = await Product.find().limit(limit).skip(limit * page)
            resolve({
                status: 'OK',
                message: 'Get All Product Success',
                data: getAllProduct,
                total: totalProduct,
                pageCurrent: Number(page +1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    getAllProduct
}