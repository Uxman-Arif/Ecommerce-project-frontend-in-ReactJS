import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { cartcntxt } from "../context/cartcontext";

const Navbar = () => {
  const cart = useContext(cartcntxt);
  const cartitems = cart.cart.cartitems;
  const navigate = useNavigate();

  function logoutfnc() {
    localStorage.removeItem("Login Token");
    navigate("/signin");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark p-sticky fw-bold">
      <div className="container">
        <Link className="navbar-brand text-success fw-bold h2" to="/">
          Ecommerce
        </Link>

        {/* Navbar Toggler Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/add">
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative text-light" to="/cart">
                <i className="fa-solid fa-cart-shopping fs-5"></i>
                {cartitems?.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartitems.length}
                  </span>
                )}
              </Link>
            </li>



            <li className="nav-item">
              <button
                className="btn btn-success text-light ms-2"
                onClick={logoutfnc}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
