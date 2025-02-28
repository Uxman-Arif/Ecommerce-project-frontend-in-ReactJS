import React, { useContext } from 'react';
import { productcntxt } from '../context/productcontext';
import { useOutletContext } from 'react-router-dom';

export function Addprod() {
    const { user } = useOutletContext();
    const prods = useContext(productcntxt);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center text-primary fw-bold">Add New Product</h2>
                        <hr />
                        <form encType="multipart/form-data" onSubmit={prods.handleupload}>
                            
                            <div className="mb-3">
                                <label className="form-label fw-bold">Product Name:</label>
                                <input required type="text" name="name" className="form-control" placeholder="Enter product name" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Description:</label>
                                <textarea required name="description" className="form-control" rows="3" placeholder="Enter product description"></textarea>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Available Stock:</label>
                                    <input required type="number" name="stk" className="form-control" placeholder="Enter stock quantity" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Price:</label>
                                    <input required type="number" name="price" className="form-control" placeholder="Enter product price" />
                                </div>
                            </div>

                            <input required type="hidden" value={user?.user?._id} name="owner" />

                            <div className="mb-3">
                                <label className="form-label fw-bold">Upload Image:</label>
                                <input required type="file" name="picture" className="form-control" />
                            </div>

                            <div className="text-center">
                                <button className="btn btn-success w-100 fw-bold" type="submit">
                                    <i className="bi bi-plus-circle"></i> Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
