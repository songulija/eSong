import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'


//when user makes post request to localhost:5000/api/orders. Its not protected so we dont have to add Protect middleware
router.route('/').post(protect, addOrderItems);//it will call addOrderItems function which has req, res
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)//when user makes put request to this route
export default router
