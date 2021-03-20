import mongoose from 'mongoose';//import mongoose model to use it 

//creating schema. every document in orders collection will follow
//this schema structure
const orderSchema = mongoose.Schema({
    user: {//users makes orders, it will be id of that user(ObjectId) 
        type: mongoose.Schema.Types.ObjectId,//which mongoose gives when adding to database by default
        required: true,
        ref: 'User'//reference to specific model for this objectId
    },
    orderItems: [
        {//user will able to have array of order items
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {//reference to specific product that is ordered
                type: mongoose.Schema.Types.ObjectId,//which mongoose gives when adding to database by default
                required: true,
                ref: 'Product'//reference to specific model for this objectId
            }
        }
    ],
    shippingAddress: {//shipping adress will have adress, city,postalcode
        address: { type: String, required: true },
        city: { type: String, required: true },
        postCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },//so you could easy add payment method
    paymentResult: {//paymentResult gonna have few fields as id, status...
        id: { type: String },//we will actually will come from paypal, when you make payment
        status: { type: String },//when its succesful, we get some data back, that we will save
        update_time: { type: String },
        email_adress: { type: String }
    },
    taxPrice: { type: Number, required: true, default: 0.0 },//each order will have taxPrice, shippingPrice
    shippingPrice: { type: Number, required: true, default: 0.0 },//totalPrice and isPaid(which by default is false)
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },//when paid, and if it is delivered. by default its false
    deliveredAt: { type: Boolean, required: true, default: false }

}, {
    timestamps: true
});

//creating order model. it bascially represents collection. it'll create collection
//if it doesn't exist. we pass collection name singular form it'll pluralize it auto.
//also provide orderSchema by which all documents in orders collection will be created
const Order = mongoose.model('Order', orderSchema);

export default Order;



