import React from 'react'

const Product = ({product, addToCart}) => {
  return (
    <div>
        <h5>{product.name}</h5>
        <h5>{product.permalink}</h5>
        <p>{product.price?.formatted_with_symbol}</p>
        <button onClick={addToCart}>Add to cart</button>
    </div>
  )
}

export default Product