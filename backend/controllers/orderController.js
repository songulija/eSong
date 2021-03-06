import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'


//@desc   Create new order
//@route  POST /api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {
    //destructure from request. orderItems array of items that get send. shipping adress
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;
    //make sure that orderItems that comes from body is not empty
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {//there are orderItems
        const order = new Order({//create new order document in orders collection
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })//this is protected route so we'll be able to get token, and get user id from token

        const createdOrder = await order.save();//save that new order in orders collection
        res.status(201).json(createdOrder)
    }

})


//@desc   Get order by ID
//@route  GET /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
    //when we want to access something thats passed to get route use req.params.id
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    //we get users name and email that is associated with this order. populate from 'user' 
    //and second argument is fields we want to get from user

    if (order) {//if order exist
        res.json(order)
    } else {
        res.status(404)
        throw Error('Order not found')
    }
})


//@desc   Update order to paid
//@route  GET /api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    //when we want to access something thats passed to get route use req.params.id
    const order = await Order.findById(req.params.id)


    if (order) {//if order is found
        order.isPaid = true;//set paid to true
        order.paidAt = Date.now();
        order.paymentResult = {//this'll come from paypal, it will come from paypal response
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_adress: req.body.payer.email_adress
        }
        const updatedOrder = await order.save();//save this updated order in db
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw Error('Order not found')
    }
})


//@desc   Get logged in user orders
//@route  GET /api/orders/myorders
//@access private
const getMyOrders = asyncHandler(async (req, res) => {
    //when we want to access something thats passed to get route use req.params.id
    const orders = await Order.find({ user: req.user._id })
    //we want to get orders where user is equal to req.user._id. only logged in user(get from token)

    res.json(orders)
})


//@desc   Get all orders
//@route  GET /api/orders
//@access private
const getOrders = asyncHandler(async (req, res) => {
    //when we want to access something thats passed to get route use req.params.id
    const orders = await Order.find({}).populate('user', 'id name')//use populate to ged user that's associated with order, its data (id name)
    //we want to get orders where user is equal to req.user._id. only logged in user(get from token)

    res.json(orders)
})



// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered }