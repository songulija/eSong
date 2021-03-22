import express from 'express'
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


//when user makes post request to localhost:5000/api/users. Its not protected so we dont have to add Protect middleware
router.route('/').post(registerUser).get(protect, admin, getUsers);//it will call registerUser function which
//when making get request, it'll be protected(check token). and check if is admin


//when user will make post request to /login route
router.post('/login', authUser);//it will call async function which has req, re

//when user will make get request to localhost:5000/api/users/profile, call getUserProfile function which has req and res
//we want to protect this get request. to apply middleware we just put it as first argument. so that protect middleware will run
//whenever we hit this route
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

//when making delete request to /api/users/:id  It'll be protected(check for token), and check if admin
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)
export default router
