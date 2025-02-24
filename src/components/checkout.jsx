import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { checkoutcntxt } from '../context/ceckoutcontext';
import { cartcntxt } from '../context/cartcontext';


export function Checkout() {
    const prod = useContext(checkoutcntxt);
    const cart = useContext(cartcntxt);
    const params = useParams();
    
    useEffect(() => {
        cart.setCartCount(cart.cart.cartitems?.length || 0);
    }, [cart.cart.cartitems]);

    useEffect(()=>{
        prod.setprodid(params.id);
    }, [params.id])

    const product = prod.prod.prod;
    return (
        product?
        <div className="container">
            <div className="row">
                <div className="col-6">
                {/* http://127.0.0.1:8000/uploads/${prod.picture} */}
                    <img className='img img-fluid' src={`http://127.0.0.1:8000/uploads/${product.picture}`} alt="" />
                </div>
                <div className="col-6">
                    <h1>{product.name}</h1>
                    <p><strong>Description: </strong>{product.description}</p>
                    <p><strong>Available Stock: </strong>{product.stk_available}</p>
                    <p><strong>Price: </strong>{product.price}</p>
                    <p><strong>Select Quantity: </strong></p>
                    <p className='text-center'>
                        <button className="btn btn-success fw-bold w-25" onClick={()=>{prod.count>1?prod.setcount(prod.count-1):<></>}}>-</button>
                        <span className="mx-3">{prod.count}</span>
                        <button className="btn btn-success fw-bold w-25" onClick={()=>{prod.setcount(prod.count+1)}}>+</button>
                    </p>
                    <form action="" onSubmit={cart.addcarthandle}>
                            <input type="hidden" name="prodid" value={product._id} id="" />
                            <input type="hidden" name="quantity" value={prod.count} id="" />
                            <button className="btn btn-primary w-100 mt-1">Add to Cart!</button>
                    </form>
                </div>
            </div><hr />
            
            <div className="row justify-content-center">
                <h1 className="text-info text-center">Product Reviews</h1><hr />
                <div className="col-6">
                    <form action="" onSubmit={prod.handlerevewupload}>
                        <label htmlFor="" className='fw-bold'>Share you'r thouoghts about this Product:</label>
                        <textarea name="review" id="" className='w-100' rows={5}></textarea>
                        <button className="btn btn-primary w-100">Post!</button>
                    </form>
                    {
                    prod.prodreview.reviews?
                    prod.prodreview.reviews.map((rview)=>(
                    <div className="m-2 border p-2 shadow rounded rounded-5">
                    <div className="row align-items-center">
                        <div className="col-2"><img style={{ borderRadius: "50px" }} src="http://127.0.0.1:8000/uploads/profiledefault.png" alt="" className="img img-fluid" /></div>
                        <div className="col-8 fw-bold h3">Basheer</div>
                    </div>
                        <p>{rview.review}</p>

                    </div>))
                    :<h1>No Reviews on this product!</h1>
                    }
                </div>
            </div>
        </div>:
        <h1>No Product found according to this id</h1>
    );
}