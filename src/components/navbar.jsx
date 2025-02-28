import { Link, useNavigate } from "react-router-dom";
import {useContext} from 'react';
import { cartcntxt } from '../context/cartcontext';

const Navbar = () => {
  const cart = useContext(cartcntxt);
  const cartitems = cart.cart.cartitems;

  const navigate = useNavigate();

  function logoutfnc() {
    localStorage.removeItem('Login Token')
    navigate('/signin');
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary text-primary bg-light fw-bold">
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
          <div className="navbar-nav w-100 d-flex justify-content-between">
            <div className="text-success fw-bold h2">Ecommerce</div>
            <div className="d-flex">

            <Link className="nav-link" to="/products">Products</Link>
            <Link className="nav-link" to="/add">Add Product</Link>
            <Link className="nav-link" to="/cart">Cart({cartitems?.length || 0})</Link>
            </div>
            <div style={{borderRadius:"10px"}} onClick={()=>{logoutfnc()}} className="nav-link mb-1 bg-success text-light user-select-none">Logout</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
