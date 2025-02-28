import React, { useState, useEffect, createContext } from 'react';

export const cartcntxt = createContext(null);

export function Cartcontextprovider(props) {
    const [cartCount, setCartCount] = useState(0);
    const [cart, setcart] = useState([]);
    const [user, setuser] = useState(null);
    
    async function fetchcart() {
        if (!user) return;  // Stop execution if user is null
        try {
            console.log("Fetching cart for user:", user);
            const response = await fetch(`http://127.0.0.1:8000/cart/${user}`, { method: 'GET' });
            if (!response.ok) {
                throw new Error("Failed to fetch cart");
            }
            const cartData = await response.json();
            console.log("Cart Fetched:", cartData);
            return cartData;  // ✅ Ensure the function returns data
        } catch (error) {
            console.error("Error fetching cart:", error);
            return []; // Return an empty array in case of an error
        }
    }

    useEffect(() => {
        console.log('Fetching cart inside useEffect...');
        fetchcart().then((crt) => {
            if (crt) setcart(crt);  // ✅ Ensure we are setting data properly
        });
    }, [user]); // ✅ Runs when `user` changes

    useEffect(() => {
        console.log("Cart Updated:", cart);
        setCartCount(cart?.cartitems?.length || 0);
    }, [cart]); // ✅ Update count whenever `cart` changes

    async function addcarthandle(e) {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/cart', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                prodid: e.target.prodid.value,
                quantity: e.target.quantity.value,
                owner: e.target.owner.value
            }),
        });

        const newcart = await response.json();
        e.target.reset();
        setcart(newcart);  // ✅ Update cart immediately with the new response
        setCartCount(newcart?.cartitems?.length || 0); // ✅ Update cart count
    }

    async function quantityhandle(prodid, action) {
        await fetch('http://127.0.0.1:8000/cart', {
            method:'PATCH',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify({ prodid: prodid, action: action })
        });
        fetchcart().then((crt) => setcart(crt));
    }

    async function deletehandle(prodid) {
        await fetch('http://127.0.0.1:8000/cart', {
            method:'DELETE',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify({ prodid: prodid })
        });
        fetchcart().then((crt) => setcart(crt));
    }

    return (
        <cartcntxt.Provider value={{ cart, user, setuser, addcarthandle, quantityhandle, deletehandle, cartCount, setCartCount }}>
            {props.children}
        </cartcntxt.Provider>
    );
}
