import express from 'express'
import { getProducts, getProductById, deleteProduct, updateProduct, createProduct } from '../controllers/productController.js'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id').
    get(getProductById).delete(protect, admin, deleteProduct).
    put(protect, admin, updateProduct)
//when making delete request to /api/products/:id  it'll be protected(check token). and check if is admin
export default router



