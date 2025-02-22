import React, {useContext} from 'react';
import { productcntxt } from '../context/productcontext';


export function Addprod() {
    const prods = useContext(productcntxt);
    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <form action="" encType="multipart/form-data" onSubmit={prods.handleupload}>
                        <label htmlFor="" className='fw-bold'>Name: </label>
                        <input className='m-1' type="text" name="name" id="" /><br />
                        
                        <label htmlFor="" className='fw-bold'>Description: </label>
                        <input className='m-1' type="text" name="description" id="" /><br />

                        <label htmlFor="" className='fw-bold'>Available Stock: </label>
                        <input className='m-1' type="text" name="stk" id="" /><br />

                        <label htmlFor="" className='fw-bold'>Price: </label>
                        <input className='m-1' type="text" name="price" id="" /><br />

                        <label htmlFor="" className='fw-bold'>Image: </label>
                        <input className='m-1' type="file" name="picture" id="" /><br />

                        <button className="btn btn btn-info m-1" type='submit'>Add Product!</button>
                    </form>
                </div>
            </div>
        </div>
    );
}