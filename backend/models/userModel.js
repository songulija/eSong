import mongoose from 'mongoose';//import module to use it

//creating schema. every document in users collection will follow
//this schema structure
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
})

//creating user model. it bascially represents collection. it'll create collection
//if it doesnt exist. we pass collection name singular form it'll pluralize it auto.
//also provide userSchema by which all documents in users collection will be created
const User = mongoose.model('User', userSchema);
export default User;