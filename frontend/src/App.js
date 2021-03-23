import React from 'react';//import react module to use JSX code
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js'
import CartScreen from './screens/CartScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js'
import ProfileScreen from './screens/ProfileScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import UserListScreen from './screens/UserListScreen.js';
import UserEditScreen from './screens/UserEditScreen.js';
import ProductListScreen from './screens/ProductListScreen.js';
import ProductEditScreen from './screens/ProductEditScreen.js';
import OrderListScreen from './screens/OrderListScreen.js';

function App() {
  return (//have to wrap entire App in Router in order to use it
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} />
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>

      </main>
      <Footer />
    </Router>

  );//creating Routes. when going to home route it will load HomeScreen component using exact becouse 
  //it will go to '/' exactly. It can bug and when going to /product/.. it can go to '/'
  //WHEN you go to /product/..(id) route, /:id means it can be any id of product that we pass
  //. it will load ProductScreen component
  //WHEN you go to /cart/:id? id is optional. you can just go to cart. when going to that route load CartScreen component
}

export default App;
