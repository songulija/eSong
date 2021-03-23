import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'


//@desc   fetch all products
//@route  GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 10;//how many products per page you want
    // getting query strings. like we make request /api/products?pageNumber=1. we can get it with req.query. if we dont have query use 1 page
    const page = Number(req.query.pageNumber) || 1

    // getting query strings. like we make request /api/products?keyword=Computer. we can get it with req.query
    const keyword = req.query.keyword ? {//so if it has query keyword then
        name: {//we want to match query to name of product
            $regex: req.query.keyword,
            $options: 'i'
        }//options case insensitive
    } : {}

    const count = await Product.countDocuments({ ...keyword })//count all products. we may have keyword so pass keyword

    //it will either have keyword which will match name(part of name) of Product with help of $regex. Or it'll be empty
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    //limit by pageSize(products per page you want). Skip whatever pageSize is multiplied .. that will give correct amount of products and correct place

    res.json({ products, page, pages: Math.ceil(count / pageSize) })//return products, page, and pages

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



//@desc   Create new review
//@route  POST /api/products/:id/reviews
//@access private

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    //we want to destructure body. get all that we pass to this route

    //api/products/:id/reviews (:id) is param that's passed to url. so when we make request to backend,
    const product = await Product.findById(req.params.id)

    if (product) {//if product with that id exist then update its name to user passed values
        //check if user already submited review. check array of review of that product
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )
        //check if review user (user id) is equal to logged in user(getting from token)

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        //contruct review object\
        const review = {//name equal to logged user name
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }//user(user id) equal to logged user _id(getting from token with req.user)

        product.reviews.push(review)
        //push new review
        product.numReviews = product.reviews.length//update product.numreviews
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        //change rating

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})



//@desc   Get Top rated products
//@route  GET /api/products/top
//@access public

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)
    //sort all products by rating. ascending order. and how many orders we want
})



export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts }