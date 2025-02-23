import React, {useState, useEffect, useContext} from 'react';
import { cartcntxt } from '../context/cartcontext';
import { checkoutcntxt } from '../context/ceckoutcontext';

export function Cart() {
    const quantityhandle = useContext(checkoutcntxt);
    const cart = useContext(cartcntxt);
    const cartitems = cart.cart.cartitems;
    console.log(cart.cart.cartitems);
    return (
        <div className="container mt-4">
            <h2 className="text-center text-success fw-bold mb-4">Shopping Cart</h2>
            
            {cartitems && cartitems.length > 0 ? (
                <div className="card shadow p-4">
                    <table className="table table-hover">
                        <thead className="table-success">
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th className="text-center">Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartitems.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}.</td>
                                    <td className="fw-bold text-success">{item.product.name}</td>
                                    <td className="text-center">
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => cart.quantityhandle(item._id, "subtract")}>-</button>
                                        <span className="mx-3 fw-bold">{item.quantity}</span>
                                        <button className="btn btn-outline-success btn-sm" onClick={() => cart.quantityhandle(item._id, "add")}>+</button>
                                    </td>
                                    <td>Rs. {item.product.price}</td>
                                    <td>Rs. {item.quantity * item.product.price}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => cart.deletehandle(item._id)}>❌ Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    
                    <div className="d-flex justify-content-between align-items-center mt-3 px-3">
                        <h4 className="fw-bold">Total: Rs. {cartitems.reduce((acc, item) => acc + item.quantity * item.product.price, 0)}</h4>
                        <button className="btn btn-success fw-bold px-4 py-2">Proceed to Checkout</button>
                    </div>
                </div>
            ) : (
                <h1 className="text-center text-danger mt-5">No Cart Items Found</h1>
            )}
        </div>
    );
    
}