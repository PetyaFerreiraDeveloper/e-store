import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function CartDetail({ cart, updateQuantity, emptyCart }) {
  console.log(cart);
  if (Object.keys(cart).length === 0) return <span>Loading...</span>;
  return (
    <>
      <Head>
        <title>E store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center items-center">
        <Link href="/" className="bg-slate-300 text-blue-600 p-5 mb-10">
          Go to Main Page
        </Link>
        {cart.line_items.length !== 0 ? (
          <>
            <h3>Cart Total Price: {cart.subtotal.formatted_with_symbol}</h3>
            <h4 id="cart-items-heading">Cart items: </h4>
            <ul aria-labelledby="cart-items-heading">
              {cart.line_items.map((item) => {
                return (
                  <li key={item.id}>
                    <p>{item.name}</p>
                    <small>
                    {item.price.formatted_with_symbol} X {item.quantity} = {item.line_total.formatted_with_symbol}
                    </small>
                  </li>
                );
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

// x{item.quantity}={item.line_total.formatted_with_symbol}
