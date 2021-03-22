import express from 'express'
const router = express.Router()
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


//when user makes post request to localhost:5000/api/orders. Its not protected so we dont have to add Protect middleware
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);//it will call addOrderItems function which has req, res
//when user makes get request to /api/orders/myorders route. it'll be protected(check for token). it'll call getMyOrders
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)//when user makes put request to this route
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
//when user makes put request to this route. protect middleware to check for token, and admin
export default router
