import express from 'express';
const router = express.Router();
import Product from '../models/productModel.js';//import product model with represents collection\
//we dont have to connect to db becouse we connected to it in server.js

//we going to point to /api/products from server.js. When user makes get request to
// /api/products route it will trigger this callback function
router.get('/', async function(req,res){
    try{
        const products = await Product.find({});//get all product documents from products collection
        res.json(products);//return response back to user. send back products as json data
        console.log('Succesfully got all product documents');
    }catch(err){
        console.log(`Error: ${err.message}`);
        process.exit(1);//exit with error
    }
    
})

//when user makes get request t /api/products/.. whatever is typed after it
//it will trigger this callback function
router.get('/:id', async function(req,res){
    try{
        const product = await Product.findById(req.params.id);//find document by id.
        //where id is equal to whatever is typed after /api/products/.. (params)
        if(product){//if product was found return response to user. send product to him
            res.json(product)
        }else{//if it was not found return response with error status 404 and message
            res.status('404',json.message({message: 'Product not Found'}));
        }
    }catch(err){
        console.log(`Error: ${err.message}`);
        process.exit(1);//exit with error
    }
    
})


export default router;//export router to use in server.js



