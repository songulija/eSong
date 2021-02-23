import mongoose from 'mongoose';//import mongoose module to use it

//creating schema for review. in product schema we have reviews.
//which will be array of review objects(documents). so we will use this schema
//in productSchema. to be able to add many reviews to product
const reviewSchema = mongoose.Schema({
    name:{//review will have name, rating and comment
        type: String,
        required: true
    },
    rating: {
        type:Number,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

//creating schema. every document in products collection will follow
//this schema structure
const productSchema = mongoose.Schema({
    user:{//users sells products, it will be id of that user(ObjectId) 
        type: mongoose.Schema.Types.ObjectId,//which mongoose gives when adding to database by default
        required: true,
        ref: User//reference to specific model for this objectId
    },//that adds relationship between product and user
    name:{//product will have name(string)
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    reviews:[reviewSchema],//review is going to be array of review object(documents)
    rating:{
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock:{
        type: Number,
        required: true,
        default: 0
    }
},{
    timestamps: true
})

//creating product model. it bascially represents collection. it'll create collection
//if it doesnt exist. we pass collection name singular form it'll pluralize it auto.
//also provide productSchema by which all documents in products collection will be created
const Product = mongoose.model('Product', productSchema);

export default Product


