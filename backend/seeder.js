import mongoose from 'mongoose';
import dotenv from 'dotenv';//to get acces to environment varuables
import users from './data/users.js';//import users array from users.js
import products from './data/products.js';
import User from './models/userModel.js';//import mongoose models that i created
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';//import connectDB function from db.js


dotenv.config();//to use environment varuables
connectDB();//calling function that will connect to db

//async functino becouse when working with db you have to wait
const importData = async function(){
    try{
        await Order.deleteMany();//delete all documents from orders collection. model represents collection
        await Product.deleteMany();
        await Product.deleteMany();

        const createdUser = await User.insertMany(users);//insert users array to User collection(model)
        //createdUser will be array of users that inserted to dn
        const adminUser = createdUser[0]._id;//we want to get adminUser _id.
        //we will add admin user to each products that are created
        const sampleProducts = products.map(function(product){//loop through array of products
            return { ...product, user: adminUser}
            //return product with all stuff that were already there, and just add user field
            //adminUser id. becouse admin creates products
        })

        await Product.insertMany(sampleProducts);//insert all products but with adminUser field(his id)
        console.log('Data imported');
        process.exit();//exit with succes
    }catch(err){
        console.log(err);
        process.exit(1);//exit with error

    }
}
const destroyData = async function(){
    try{
        await Order.deleteMany();//delete all documents from orders collection. model represents collection
        await Product.deleteMany();
        await Product.deleteMany();

        console.log('Data deleted');
        process.exit();//exit with succes
    }catch(err){
        console.log(err);
        process.exit(1);//exit with error

    }
}

//if we write in console node backend/seeder -d. argv will get that -d, last 
if(process.argv[2] == '-d'){//then destroy data
    destroyData()
}else{
    importData();
}










