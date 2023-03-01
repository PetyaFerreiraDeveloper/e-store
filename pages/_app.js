import "@/styles/globals.css";
import commerce from "../lib/commerce";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await commerce.cart.retrieve();
      setCart(response);
      // console.log('created', cart);
    };
    getData();
  }, []);

  const addToCart = async (productID) => {
    const response = await commerce.cart.add(productID, 1);
    setCart(response);
    // console.log('added product', cart);
    return;
  };

  const updateQuantity = async (productID, quantity) => {
    let response = await commerce.cart.update(productID, {
      quantity: quantity,
    });
    setCart(response);
    return;
  };

  const removeItem = async (productID) => {
    let response = await commerce.cart.remove(productID);
    setCart(response);
    return;
  };

  const emptyCart = async () => {
    let response = await commerce.cart.empty();
    setCart(response);
    // console.log('deleted', cart)
  };

  const refreshCart = async () => {
    let response = await commerce.cart.refresh();
    setCart(response);
  };

  return (
    <>
      <Navbar cart={cart} />
      <Component
        cart={cart}
        addToCart={addToCart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        emptyCart={emptyCart}
        refreshCart={refreshCart}
        {...pageProps}
      />
    </>
  );
}
