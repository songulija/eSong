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

    const user = await User.findOne({ email })
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
    const user = await User.findById(req.user._id)
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




//@desc   Get user profile
//@route  PUT /api/users/profile
//@access private

//user needs to be logged in and send a token
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    console.log(req.user._id);
    //find user by id from users collection. passing req.user._id
    //to whatever logged in user is. that will get user

    if (user) {//check for user. its found. then user.name set to req.body.name 
        //or if its not there stay to whatever user name is
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {//if password was send to update too then
            user.password = req.body.password
        }//it'll be encrypted automatically becouse of what we did in model

        //then save
        const updatedUser = await user.save();

        //and send response
        res.json({//when we want to response/return
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })//_id which equals to updatedUser._id, name.email,isAdmin, and token of updated user
        //we call function that will generate JWT token, and we pass updatedUser._id that will be saved in that token
    } else {
        res.status(404);//not found
        throw new Error('User not found')
    }
})



//@desc   Get all users
//@route  GET /api/users
//@access private/Admin
//not only its protected and you have to login, but you have to be admin too

const getUsers = asyncHandler(async (req, res) => {
    //if we verified token it will set req.user to user that is got from db(it has all data except password)
    const users = await User.find({})//get all users
    res.json(users)
})




//@desc   Delete user
//@route  DELETE /api/users/:id
//@access private/Admin
//not only its protected and you have to login, but you have to be admin too


const deleteUser = asyncHandler(async (req, res) => {
    //when we want to access something thats passed to get route use req.params.id
    // /api/users/:id (:id) is param that's passed to url. so when we make request to backend,
    //we can access it with req.params
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


//@desc   Get user by id
//@route  GET /api/users/:id
//@access private/Admin
//not only its protected and you have to login, but you have to be admin too

const getUserById = asyncHandler(async (req, res) => {
    //when we want to access something thats passed to get route use req.params.id
    // /api/users/:id (:id) is param that's passed to url. so when we make request to backend,
    //we can access it with req.params
    const user = await User.findById(req.params.id).select('-password')//select only password

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})


// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin ?? user.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser }