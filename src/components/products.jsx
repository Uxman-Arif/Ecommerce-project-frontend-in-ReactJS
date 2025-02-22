import React, {useContext} from 'react';
import { productcntxt } from '../context/productcontext';


export function Products() {
    const prods = useContext(productcntxt);
    return (
        <div className="container">
            <div className="row justify-content-center">
                {
                    prods.product.products?
                    prods.product.products.map((prod)=>(
                        <div className="col-4">
                            <div class="card">
                                <img class="card-img-top" src={`http://127.0.0.1:8000/uploads/${prod.picture}`} alt="" />
                                <div class="card-body">
                                    <h5 class="card-title"><strong>{ prod.name }</strong></h5>
                                    <p class="card-text"><strong>Description: </strong>{ prod.description.slice(0, 30) }...</p>
                                    <p class="card-text"><strong>Price: </strong>{ prod.price }</p>
                                    <p class="card-text"><strong>Available Stock: </strong>{ prod.stk_available }</p>
                                    <a href="" className="btn btn-primary w-100 mt-1">Checkout!</a>
                                    <button className="btn btn-primary w-100 mt-1">Add to Cart!</button>
                                </div>
                            </div>
                        </div>

                    )):
                    <h1>No Product Found!</h1>
                }
            </div>
        </div>
    );
};