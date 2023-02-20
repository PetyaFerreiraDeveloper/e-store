import React from "react";
import Head from "next/head";

export default function CartDetail({ cart, updateQuantity, emptyCart }) {
  console.log(cart);
  if (!cart) return <span>Loading...</span>;
  // console.log(cart.currency.code)
  return (
    <>
      <Head>
        <title>E store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {cart ? (
          <>
            <p>There is cart</p>
            {cart.subtotal ? <p>{cart.subtotal.raw}</p> : <p>no subtotal</p>}
            {}

            <h3>Cart Total Price: {cart.subtotal.formatted_with_symbol}</h3>
            <h4 id="cart-items-heading">Cart items: </h4>
            <ul aria-labelledby="cart-items-heading">
              {cart.line_items.map((item) => {
                return <li key={item.id}>{item.name}</li>;
              })}
            </ul>
          </>
        ) : (
          <p>Please Buy Something</p>
        )}
      </main>
    </>
  );
}
