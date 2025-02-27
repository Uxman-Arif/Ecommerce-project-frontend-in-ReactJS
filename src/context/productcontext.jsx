import React, {createContext, useState, useEffect} from 'react';

export const productcntxt = createContext(null);
async function fetchproducts() {
    const response = await fetch('http://127.0.0.1:8000/products', {method:'GET'});
    const products = response.json();
    return products;
}

export function Productcntxtprovider(props) {
    const [product, setproduct] = useState([]);

    useEffect(()=>{
        fetchproducts().then((prod)=>setproduct(prod));
    }, []);

    async function handleupload(e) {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('description', e.target.description.value);
        formData.append('stk', e.target.stk.value);
        formData.append('price', e.target.price.value);
        formData.append('picture', e.target.picture.files[0]); // Correct way to get the file
    
        try {
            const response = await fetch('http://127.0.0.1:8000/products', {
                method: 'POST',
                body: formData // No need for headers, fetch sets them automatically
            });
    
            if (!response.ok) {
                throw new Error('Failed to upload product');
            }
    
            e.target.reset();
    
            // Ensure fetchproducts updates the state properly
            fetchproducts().then((prod) => setproduct(prod));
    
        } catch (error) {
            console.error('Error uploading product:', error);
        }
    }
    
    

    return (
    <productcntxt.Provider value={{product, handleupload}}>
        {props.children}
    </productcntxt.Provider>);
}