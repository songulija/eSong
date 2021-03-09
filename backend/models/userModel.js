import mongoose from 'mongoose';//import module to use it
import bcrypt from 'bcryptjs'

//creating schema. every document in users collection will follow
//this schema structure
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
})


//we crate method called matchPassword. it will take enteredPassword which will be plain text
userSchema.methods.matchPassword = async function (enteredPassword) {
    //using bcrypt we will compare two passwords. method compare will compare plain text to 
    //encrypted password
    return await bcrypt.compare(enteredPassword, this.password)
    //it will go through db, and check if enteredPassword is equal to encrypted password in db
    //it will automatically check

}


//we can set certain things to happen on saves on finds and other actions/methods
userSchema.pre('save', async function (next) {//so we want this to happen pre save, before save run this function
    //we only want to do this if password field is sent or modified
    if (!this.isModified('password')) {//if password is not modified
        next()//call next and move on
    }

    //if it has been modified 'password' was sent or modified we want to hash password
    const salt = await bcrypt.genSalt(10);//that creates salt. it will salt 10 times
    this.password = await bcrypt.hash(this.password, salt)
    //this password, its user that we are creating, his password.
    //and we has this.password. and add salt
})

//creating user model. it bascially represents collection. it'll create collection
//if it doesnt exist. we pass collection name singular form it'll pluralize it auto.
//also provide userSchema by which all documents in users collection will be created
const User = mongoose.model('User', userSchema);
export default User;