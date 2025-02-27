import React, { useContext } from 'react';
import { productcntxt } from '../context/productcontext';
import { cartcntxt } from '../context/cartcontext';
import { useNavigate, useOutletContext } from 'react-router-dom';

export function Products() {
    const { user } = useOutletContext();
    const cart = useContext(cartcntxt);
    const prods = useContext(productcntxt);
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="row justify-content-center">
                {prods.product.products ? (
                    prods.product.products.map((prod) => {
                        const isInCart = cart?.cart?.cartitems.some(item => prod._id === item.product._id);
                        return (
                            <div className="col-4" key={prod._id}>
                                <div className="card">
                                    <img className="card-img-top" src={`http://127.0.0.1:8000/uploads/${prod.picture}`} alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title"><strong>{prod.name}</strong></h5>
                                        <p className="card-text"><strong>Description: </strong>{prod.description.slice(0, 30)}...</p>
                                        <p className="card-text"><strong>Price: </strong>{prod.price}</p>
                                        <p className="card-text"><strong>Available Stock: </strong>{prod.stk_available}</p>
                                        <button onClick={() => navigate(`/checkout/${prod._id}`)} className="btn btn-primary w-100 mt-1">Checkout!</button>
                                        <form onSubmit={cart.addcarthandle}>
                                            <input type="hidden" name="prodid" value={prod._id} />
                                            <input type="hidden" name="quantity" value={1} />
                                            <button className="btn btn-primary w-100 mt-1" disabled={isInCart}>Add to Cart!</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h1>No Product Found!</h1>
                )}
            </div>
        </div>
    );
};
