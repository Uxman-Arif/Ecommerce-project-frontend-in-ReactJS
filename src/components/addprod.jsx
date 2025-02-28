import React, {useContext} from 'react';
import { productcntxt } from '../context/productcontext';
import {useOutletContext} from 'react-router-dom';


export function Addprod() {
    const {user} = useOutletContext();
    const prods = useContext(productcntxt);
    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <form action="" encType="multipart/form-data" onSubmit={prods.handleupload}>
                        <label htmlFor="" className='fw-bold'>Name: </label>
                        <input required className='m-1' type="text" name="name" id="" /><br />
                        
                        <label htmlFor="" className='fw-bold'>Description: </label>
                        <input required className='m-1' type="text" name="description" id="" /><br />

                        <label htmlFor="" className='fw-bold'>Available Stock: </label>
                        <input required className='m-1' type="number" name="stk" id="" /><br />

                        <label htmlFor="" className='fw-bold'>Price: </label>
                        <input required className='m-1' type="number" name="price" id="" /><br />

                        <input required className='m-1' type="hidden" value={user?.user?._id} name="owner" id="" />

                        <label htmlFor="" className='fw-bold'>Image: </label>
                        <input required className='m-1' type="file" name="picture" id="" /><br />

                        <button className="btn btn btn-info m-1" type='submit'>Add Product!</button>
                    </form>
                </div>
            </div>
        </div>
    );
}