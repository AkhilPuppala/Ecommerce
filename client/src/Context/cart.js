import React, { useState, useContext, createContext,useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        let existingCart = localStorage.getItem('cart')
        if(existingCart) setCart(JSON.parse(existingCart))
    },[]); 

    return (
      <CartContext.Provider value={[cart,setCart]}>
        {children}
      </CartContext.Provider>
    );
  };
  

export function useCart() {
  return useContext(CartContext);
}
