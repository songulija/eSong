import mongoose from 'mongoose';//import mongoose module to use it

//creating schema for review. in product schema we have reviews.
//which will be array of review objects(documents). so we will use this schema
//in productSchema. to be able to add many reviews to product
const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,//type of object id
        required: true,
        ref: 'User'//reference to specific user for this objectId
    }
}, {
    timestamps: true
})

//creating schema. every document in products collection will follow
//this schema structure
const productSchema = mongoose.Schema({
    user: {//users sells products, it will be id of that user(ObjectId) 
        type: mongoose.Schema.Types.ObjectId,//which mongoose gives when adding to database by default
        required: true,
        ref: 'User'//reference to specific model for this objectId
    },//that adds relationship between product and user
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true
})

//creating product model. it bascially represents collection. it'll create collection
//if it doesnt exist. we pass collection name singular form it'll pluralize it auto.
//also provide productSchema by which all documents in products collection will be created
const Product = mongoose.model('Product', productSchema);

export default Product



