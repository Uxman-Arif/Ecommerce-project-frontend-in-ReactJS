import React, {useContext} from 'react';
import { productcntxt } from '../context/productcontext';


export function Products() {
    const prods = useContext(productcntxt);
    prods?console.log(prods.product.products):console.log('no product found')
    return (
        <div className="container">
            <div className="row justify-content-center">
                {
                    prods.product.products?
                    prods.product.products.map((prod)=>(
                        <div className="col-3">
                            <div class="card">{prod.picture}
                                <img class="card-img-top" src={`/uploads/${prod.picture}`} alt="" />
                                <div class="card-body">
                                    <h5 class="card-title"><strong>Title</strong>{ prod.name }</h5>
                                    <p class="card-text"><strong>Description: </strong>{ prod.description }</p>
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
            <h1 className='text-danger'>Yes this is product page</h1>
        </div>
    );
};