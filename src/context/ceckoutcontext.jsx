import React, {useState, useEffect, createContext} from 'react';


export const checkoutcntxt = createContext(null);
export function Checkoutprovider(props) {
    const [count, setcount] = useState(1);
    const [prod, setprod] = useState([]);
    const [prodreview, setprodreview] = useState([]);
    const [prodid, setprodid] = useState(null);
    async function fetchprod() {
        const response = await fetch(`http://127.0.0.1:8000/checkout/${prodid}`, {method:'GET'});
        const prod = await response.json();
        return prod;
    };

    async function fetchprodreviews() {
        const response = await fetch(`http://127.0.0.1:8000/checkout/${prodid}`, {method:'GET'});
        const prodreview = await response.json();
        return prodreview;
    };
    
    useEffect(()=>{
        if (prodid) {
            fetchprod().then((prod)=>{setprod(prod)});
            fetchprod().then((prod)=>{setprodreview(prod)});
        }
    }, [prodid])

    async function handlerevewupload(e) {
        e.preventDefault();
        console.log(e.target.review.value, e.target.owner.value)
        await fetch(`http://127.0.0.1:8000/checkout/${prodid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({review:e.target.review.value, owner:e.target.owner.value})
        });
        e.target.reset();
        fetchprod().then((prod)=>{setprod(prod)});
        fetchprod().then((prod)=>{setprodreview(prod)});
    }

    return (
        <checkoutcntxt.Provider value={{prod, setprodid, count, setcount, handlerevewupload, prodreview}}>
            {props.children}
        </checkoutcntxt.Provider>
    );
    
}