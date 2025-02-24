import { Link } from "react-router-dom";
import {useContext, useState, useEffect} from 'react';
import { cartcntxt } from '../context/cartcontext';

const Navbar = () => {
  const cart = useContext(cartcntxt);
  const cartitems = cart.cart.cartitems;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary text-primary bg-dark fw-bold">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav w-100 d-flex justify-content-center">
            <Link className="nav-link" to="/products">Products</Link>
            <Link className="nav-link" to="/add">Add Product</Link>
            <Link className="nav-link" to="/cart">Cart({cartitems?.length || 0})</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
