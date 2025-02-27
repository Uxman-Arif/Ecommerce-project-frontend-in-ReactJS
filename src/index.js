import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Products} from './components/products';
import { Productcntxtprovider } from './context/productcontext';
import Navbar from './components/navbar';
import { Addprod } from './components/addprod';
import { Checkout } from './components/checkout';
import {Checkoutprovider} from './context/ceckoutcontext';
import { Cart } from './components/cart';
import { Cartcontextprovider } from './context/cartcontext';
import {Signup} from './components/signup';
import {Signin} from './components/signin';
import Verifyuser from './context/verifyuser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Productcntxtprovider>
      <Checkoutprovider>
        <Cartcontextprovider>
          <BrowserRouter>
          <Navbar />
            <Routes>
              <Route element={<Verifyuser />}>
                <Route path='/products' element={<Products />} />
                <Route path='/add' element={<Addprod />} />
                <Route path='/checkout/:id' element={<Checkout />} />
                <Route path='/cart' element={<Cart />} />
              </Route>
              <Route path='/signup' element={<Signup />} />
              <Route path='/Signin' element={<Signin />} />
              {/* <App /> */}
            </Routes>
          </BrowserRouter>
        </Cartcontextprovider>
      </Checkoutprovider>
    </Productcntxtprovider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
