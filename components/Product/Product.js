import React from 'react'

const Product = ({product, addToCart}) => {
  return (
    <div className="flex flex-col gap-y-2 items-start mb-10">
      <div className="flex gap-5">
        <h5>{product.name}</h5>
        <p>{product.price?.formatted_with_symbol}</p>
      </div>
        <button onClick={addToCart} className="bg-gray-300 rounded-md px-8 py-2">Add to cart</button>
    </div>
  )
}

export default Product