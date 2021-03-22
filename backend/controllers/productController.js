import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'


//@desc   fetch all products
//@route  GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({})

    res.json(products)

})


//@desc   fetch all products
//@route  GET /api/products/:id
//@access public

const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'product not found' })
    }

})



//@desc   Delete a product
//@route  DELETE /api/products/:id
//@access private admin

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {//product found
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})



//@desc   Create a product
//@route  POST /api/products
//@access private admin

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({//create new product document in products collection
        name: 'Sample name',
        price: 0,
        user: req.user._id,//we will get req.user._id which is id from token which is beeing passed
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdProduct = await product.save()//save product document in products collection
    res.status(201).json(createdProduct)
})



//@desc   Update a product
//@route  PUT /api/products/:id
//@access private admin

const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body;
    //we want to destructure body. get all that we pass to this route

    //api/products/:id (:id) is param that's passed to url. so when we make request to backend,
    //we can access it with req.params
    const product = await Product.findById(req.params.id)

    if (product) {//if product with that id exist then update its name to user passed values
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})



export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }