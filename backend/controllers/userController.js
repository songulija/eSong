import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'


//@desc   Auth user & get token
//@route  POST /api/users/login
//@access public

//authenticate user and send back some data. we want to send token.
//so then we could use that token to access some pages 
const authUser = asyncHandler(async (req, res) => {
    //when we will make request we will send some data. we can acces that data wth req.body
    const { email, password } = req.body;//destructure that data from req.body
    console.log(email + ' ' + password)

    const user = await User.findOne({ email: email })
    //we want to find one document in users collection. find user document with that email

    if (user && (await user.matchPassword(password))) {//if user with that email exist, and if password matches
        res.json({//when we want to response/return
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })//_id which equals to user._id, name.email,isAdmin, and token
        //we call function that will generate JWT token, and we pass user._id that will be saved in that token
    } else {//if user is not found and password doesnt match
        res.status(401);
        throw new Error('Invalid email or password')

    }
})


//@desc   Auth user & get token
//@route  POST /api/users/login
//@access public

//authenticate user and send back some data. we want to send token.
//so then we could use that token to access some pages 
const registerUser = asyncHandler(async (req, res) => {
    //when we will make request we will send some data. we can acces that data wth req.body
    const { name, email, password } = req.body;//destructure that data from req.body 

    const userExist = await User.findOne({ email })//we want to see if user with that email already exists

    if (userExist) {
        res.status(400);//bad request
        throw new Error('User already exists');//throw eror
    }
    //we will create new user document in users collection
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {//if user was created. 201 means something was created
        res.status(201).json({//when we want to response/return
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)//_id which equals to user._id, name.email,isAdmin, and token
        });//we call function that will generate JWT token, and we pass user._id that will be saved in that token
    } else {//if user was not created
        res.status(400);
        throw new Error('Invalid User data');
    }
})


//@desc   Get user profile
//@route  GET /api/users/profile
//@access private


const getUserProfile = asyncHandler(async (req, res) => {
    //if we verified token it will set req.user to user that is got from db(it has all data except password)
    const user = await User.findById(req.user._id);
    console.log(req.user._id);
    //find user by id from users collection. passing req.user._id
    //to whatever logged in user is. that will get user

    if (user) {//check for user. its found
        res.json({//then return json data _id set to user._id name ...
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })//we return that for logged in user
    } else {
        res.status(404);//not found
        throw new Error('User not found')
    }
})

export { authUser, registerUser, getUserProfile }