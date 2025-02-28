import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { checkoutcntxt } from '../context/ceckoutcontext';
import { cartcntxt } from '../context/cartcontext';
import {useOutletContext} from 'react-router-dom';

export function Checkout() {
    const prod = useContext(checkoutcntxt);
    const cart = useContext(cartcntxt);
    const params = useParams();
    const {user} = useOutletContext();
    
    useEffect(() => {
        cart.setCartCount(cart.cart.cartitems?.length || 0);
    }, [cart.cart.cartitems]);

    useEffect(() => {
        prod.setprodid(params.id);
    }, [params.id]);

    const product = prod.prod.prod;
    const isInCart = cart?.cart?.cartitems?.some(item => item.product._id === product?._id);

    return product ? (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img className="img img-fluid" src={`http://127.0.0.1:8000/uploads/${product.picture}`} alt={product.name} />
                </div>
                <div className="col-md-6">
                    <h1>{product.name}</h1>
                    <p><strong>Description: </strong>{product.description}</p>
                    <p><strong>Available Stock: </strong>{product.stk_available}</p>
                    <p><strong>Price: </strong>{product.price}</p>
                    <p><strong>Select Quantity: </strong></p>
                    <p className="text-center">
                        <button 
                            className="btn btn-success fw-bold w-25" 
                            onClick={() => prod.count > 1 && prod.setcount(prod.count - 1)}
                        >-</button>
                        <span className="mx-3">{prod.count}</span>
                        <button 
                            className="btn btn-success fw-bold w-25" 
                            onClick={() => prod.setcount(prod.count + 1)}
                        >+</button>
                    </p>
                    <form onSubmit={cart.addcarthandle}>
                        <input type="hidden" name="prodid" value={product._id} />
                        <input type="hidden" name="quantity" value={prod.count} />
                        <button className="btn btn-primary w-100 mt-1" disabled={isInCart}>Add to Cart!</button>
                    </form>
                </div>
            </div>
            <hr />
            
            <div className="row justify-content-center">
                <h1 className="text-info text-center">Product Reviews</h1>
                <hr />
                <div className="col-md-6">
                    <form onSubmit={prod.handlerevewupload}>
                        <label htmlFor="review" className="fw-bold">Share your thoughts about this Product:</label>
                        <textarea name="review" id="review" className="w-100" rows={5}></textarea>
                        <input type="hidden" name="owner" value={user.user._id} id="" />
                        <button className="btn btn-primary w-100">Post!</button>
                    </form>
                    {prod.prodreview.reviews?.length ? (
                        prod.prodreview.reviews.map((review, index) => (
                            <div key={index} className="m-2 border p-2 shadow rounded-5">
                                <div className="row align-items-center">
                                    <div className="col-2">
                                        <img 
                                            style={{ borderRadius: "50px" }} 
                                            src="http://127.0.0.1:8000/uploads/profiledefault.png" 
                                            alt="Profile" 
                                            className="img img-fluid" 
                                        />
                                    </div>
                                    <div className="col-8 fw-bold h3">{review.owner.name}</div>
                                </div>
                                <p>{review.review}</p>
                            </div>
                        ))
                    ) : (
                        <h1>No Reviews on this product!</h1>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <h1>No Product found according to this id</h1>
    );
}
