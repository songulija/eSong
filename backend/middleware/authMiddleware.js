import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//this will validate the token
//this is middleware function. asyncHandler will do try catch block in this async function
const protect = asyncHandler(async (req, res, next) => {
    let token;
    //we will check for token. if there was passed req.headers.authorization value
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //i just want token. without word Bearer. we split and get only token part
            token = req.headers.authorization.split(' ')[1]
            //decode that token. we pass token, and pass secret 
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            //we just set users data that we get from db to req.user which now'll have acces to all protected routes
            req.user = await User.findById(decoded.id).select('-password');
            //finding user by id, and we dont want to select password from db\
            //so oour 

        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {//if there is no token
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    next()//since its middleware we call next
})

export { protect }