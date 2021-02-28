import express from 'express';//require express to use itcd ..
import dotenv from 'dotenv';//import module to use environment varuables
import connectDB from './config/db.js';
import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';



dotenv.config();//to use environment varuables from env file

connectDB();

const app = express();//express is function that represents express



//when user makes request to home route it triggers this callback function
app.get('/', function (req, res) {
    res.send('Hello');
});

//for anything that goes to /api/products is going to be linked to productsRoutes.js
//Where we have methods that will catch all HTTP request to /api/products
app.use('/api/products', productRoutes);//we just use middleware

//we want erors for 404 which is not found. if we go anywhere that is not actual route
app.use(notFound);


//middleware is basically function that has acces to the request response cycle. So
//when you make request we can have function that can acces anything in these objects
//we have next becouse we call next to move to next piece of middleware unless you want 
//to stop request res cycle
app.use(errorHandler);

//when user makes request to home route it triggers this callback function
app.get('/api/products', function (req, res) {
    res.json(products);
})

//when user makes get request to /api/product/..(param) whatever user types in.
//it will trigger this callback function
app.get('/api/products/:id', function (req, res) {
    //find product in products array. where product _id is equalt to whatever is typed after
    ///api/product/..(param)
    const product = products.find((p) => p._id === req.params.id);
    res.json(product)

})

const PORT = process.env.PORT || 5000;//GET environment varuables(PORT) from .env file
//or use 6000
app.listen(PORT, function () {
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`);
})