import React, { useState, useEffect, createContext } from 'react';

export const cartcntxt = createContext(null);

async function fetchcart() {
    const response = await fetch('http://127.0.0.1:8000/cart', {method:'GET'});
    const cart = response.json();
    return cart;
}

export function Cartcontextprovider(props) {
  const [cartCount, setCartCount] = useState(0);
    const [cart, setcart] = useState([]);
    useEffect(()=>{
        fetchcart().then((crt)=>{setcart(crt)});
    }, []);

  useEffect(() => {
    setCartCount(cart.cartitems?.length || 0);
}, [cart.cartitems]);

    function addcarthandle(e) {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/cart', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({prodid:e.target.prodid.value, quantity:e.target.quantity.value}),
        });
            e.target.reset()
            fetchcart().then((crt)=>{setcart(crt)})
    };


    async function quantityhandle(prodid, action) {
        // preventDefault();
        await fetch('http://127.0.0.1:8000/cart', {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({prodid:prodid, action:action})
        });
        fetchcart().then((crt)=>{setcart(crt)})
    };

    async function deletehandle(prodid) {
        await fetch('http://127.0.0.1:8000/cart', {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({prodid:prodid})
        });
        fetchcart().then((crt)=>{setcart(crt)})
    };

    return (
    <cartcntxt.Provider value={{cart, addcarthandle, quantityhandle, deletehandle, cartCount, setCartCount}}>
        {props.children}
    </cartcntxt.Provider>
    )
}