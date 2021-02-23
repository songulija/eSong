import mongoose from 'mongoose';//require mongoose model to use it
const connectDB = async function(){
    try{
        const conn = await mongoose.connect('mongodb+srv://admin-lukas:123@cluster0.rz3xq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true});
        console.log(`MongoDB connected ' ${conn.connection.host}`);

    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);//exit with error

    }
}

export default connectDB;//export this function to use in other files