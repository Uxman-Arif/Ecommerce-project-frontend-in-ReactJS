import React, { useContext } from 'react';
import { productcntxt } from '../context/productcontext';
import { cartcntxt } from '../context/cartcontext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from '../css/products.module.css';

export function Products() {
    const { user } = useOutletContext();
    const cart = useContext(cartcntxt);
    const prods = useContext(productcntxt);
    const navigate = useNavigate();

    // Group products into chunks of 3 (Adjust as needed)
    const chunkSize = 3;
    const productChunks = [];
    if (prods.product.products) {
        for (let i = 0; i < prods.product.products.length; i += chunkSize) {
            productChunks.push(prods.product.products.slice(i, i + chunkSize));
        }
    }

    return (
        <div className={`container-fluid ${styles.container}`}>
            <div className={`${styles.cover} row`}>
                <div className="col-md-6 col-9">
                    <h1>Your One-Stop Shop for Quality, Convenience, and Savings!</h1>
                    <button>Explore Brands!</button>
                </div>
            </div>

            {/* Bootstrap Carousel */}
            <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {productChunks.map((chunk, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="row justify-content-center">
                                {chunk.map((prod) => {
                                    const isInCart = cart?.cart?.cartitems.some(item => prod._id === item.product._id);
                                    return (
                                        <div className="col-md-4" key={prod._id}>
                                            <div className={`${styles.card} card`}>
                                                <img className="card-img-top" src={`http://127.0.0.1:8000/uploads/${prod.picture}`} alt="" />
                                                <div className="card-body">
                                                    <h5 className="card-title text-center text-success"><strong>{prod.name}</strong></h5><hr />
                                                    <p className="card-text"><strong>Description: </strong>{prod.description.slice(0, 25)}...</p>
                                                    <div className="row justify-content-between">
                                                        <span className="card-text col-5"><strong>Price: </strong>{prod.price}</span>
                                                        <span className="card-text col-7"><strong>Available Stock: </strong>{prod.stk_available}</span>
                                                    </div>
                                                    <button onClick={() => navigate(`/checkout/${prod._id}`)} className="btn btn-primary w-100 mt-1">Checkout!</button>
                                                    <form onSubmit={cart.addcarthandle}>
                                                        <input type="hidden" name="prodid" value={prod._id} />
                                                        <input type="hidden" name="quantity" value={1} />
                                                        <input type="hidden" name="owner" value={user?.user?._id} />
                                                        <button className="btn btn-primary w-100 mt-1" disabled={isInCart}>Add to Cart!</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Carousel Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};
