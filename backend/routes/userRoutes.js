import express from 'express'
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


//when user makes post request to localhost:5000/api/users. Its not protected so we dont have to add Protect middleware
router.route('/').post(registerUser);//it will call registerUser function which

//when user will make post request to /login route
router.post('/login', authUser);//it will call async function which has req, re

//when user will make get request to localhost:5000/api/users/profile, call getUserProfile function which has req and res
//we want to protect this get request. to apply middleware we just put it as first argument. so that protect middleware will run
//whenever we hit this route
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
//if its put request then. it'll be protected. and call async function updateUserProfile which 
//has req and res
router.route('/')



export default router
