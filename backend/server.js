const express = require('express');//require express to use itcd ..
const app = express();//express is function that represents express
const products = require('./data/products');

//when user makes request to home route it triggers this callback function
app.get('/', function (req, res) {
    res.send('Hello');
});

//when user makes request to home route it triggers this callback function
app.get('/api/products', function (req, res) {
    console.log(products);
})

app.listen(5000, function () {
    console.log('Server started on port 5000');
})