import React from 'react';//import react module to use JSX code
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js'

function App() {
  return (//have to wrap entire App in Router in order to use it
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
        </Container>

      </main>
      <Footer />
    </Router>

  );//creating Routes. when going to home route it will load HomeScreen component using exact becouse 
  //it will go to '/' exactly. It can bug and when going to /product/.. it can go to '/'
  //WHEN you go to /product/..(id) route, /:id means it can be any id of product that we pass
  //. it will load ProductScreen component
}

export default App;
