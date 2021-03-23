import path from 'path'//just nodejs module that works with file path
import express from 'express';//require express to use itcd ..
import dotenv from 'dotenv';//import module to use environment varuables
import connectDB from './config/db.js';


import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import morgan from 'morgan'


dotenv.config();//to use environment varuables from env file

connectDB();

const app = express();//express is function that represents express

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());//that will allow to accept json data in body


//for anything that goes to /api/products is going to be linked to productsRoutes.js
//Where we have methods that will catch all HTTP request to /api/products
app.use('/api/products', productRoutes);//we just use middleware

//for anything that goes to /api/users is going to be linked to userRoutes.js
//Where we have methods that will catch all HTTP request to /api/users
app.use('/api/users', userRoutes);

//for anything that goes to /api/orders is going to be linked to orderRoutes.js
//Where we have methods that will catch all HTTP request to /api/users
app.use('/api/orders', orderRoutes);

//for anything that goes to /api/upload is going to be linked to uploadRoutes.js
//Where we have methods that will catch all HTTP request to /api/upload
app.use('/api/upload', uploadRoutes)


//when making get request to this route. so when ready to make payment we will make request 
app.get('/api/config/paypal', (req, res) => {//to this route and get PAYPAL_CLIENT_ID
    res.send(process.env.PAYPAL_CLIENT_ID)
})


const __dirname = path.resolve();//to get __directory path of directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))//make folder uploads static

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))//set /frontnd/build folder as static folder

    app.get('*', (req, res) => {//when you hit any route thats not our api
        //point to that index html thats in our build folder
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))//path to index.html
        //setting front end build into static folder, any route thats is not any of these (our api) will point into index.html
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

//we want erors for 404 which is not found. if we go anywhere that is not actual route
app.use(notFound);


//middleware is basically function that has acces to the request response cycle. So
//when you make request we can have function that can acces anything in these objects
//we have next becouse we call next to move to next piece of middleware unless you want 
//to stop request res cycle
app.use(errorHandler);



const PORT = process.env.PORT || 5000;//GET environment varuables(PORT) from .env file
//or use 6000
app.listen(PORT, function () {
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`);
})