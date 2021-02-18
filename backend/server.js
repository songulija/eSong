const express = require('express');//require express to use itcd ..
const app = express();//express is function that represents express
const products = require('./data/products');

//when user makes request to home route it triggers this callback function
app.get('/', function (req, res) {
    res.send('Hello');
});

//when user makes request to home route it triggers this callback function
app.get('/api/products', function (req, res) {
    res.json(products);
})

//when user makes get request to /api/product/..(param) whatever user types in.
//it will trigger this callback function
app.get('/api/products/:id', function (req, res) {
    //find product in products array. where product _id is equalt to whatever is typed after
    ///api/product/..(param)
    const product = products.find((p) => p._id === req.params.id);
    res.json(product)

})

app.listen(5000, function () {
    console.log('Server started on port 5000');
})