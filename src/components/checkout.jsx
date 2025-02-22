import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { checkoutcntxt } from '../context/ceckoutcontext';



export function Checkout() {
    const prod = useContext(checkoutcntxt);
    const params = useParams();
    prod.setprodid(params.id);
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

                </div>
            </div>
        </div>:
        <h1>No Product found according to this id</h1>
    );
}