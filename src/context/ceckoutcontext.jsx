import React, {useState, useEffect, createContext} from 'react';


export const checkoutcntxt = createContext(null);
export function Checkoutprovider(props) {
    const [count, setcount] = useState(1);
    const [prod, setprod] = useState([]);
    const [prodid, setprodid] = useState(null);
    async function fetchprod() {
        const response = await fetch(`http://127.0.0.1:8000/checkout/${prodid}`, {method:'GET'});
        const prod = response.json();
        return prod;
    };
    
    useEffect(()=>{
        if (prodid) {
            fetchprod().then((prod)=>{setprod(prod)});
        }
    }, [prodid])

    return (
        <checkoutcntxt.Provider value={{prod, setprodid, count, setcount}}>
            {props.children}
        </checkoutcntxt.Provider>
    );
    
}