import React from 'react';

const Payment = ({checkoutToken, shippingData}) => {
  console.log('chekcoutToken', checkoutToken);

  const shippingCharges = checkoutToken.shipping_methods;
  return (
    <div>
      <h3 className="font-bold">{shippingData.firstName} {shippingData.lastName}</h3>

      <p>Address: {shippingData.address}</p>
      <p>Email: {shippingData.email}</p>
      <p>City: {shippingData.city}</p>
      <p>Postal Code: {shippingData.zip}</p>
      <p>Country code: {shippingData.country}</p>
      <p>Subdivision Code: {shippingData.subdivision}</p>

      <h4 className="font-bold">Items you are buying:</h4>

      <ul>
        {checkoutToken.line_items.map(item => {return <li key={item.product_name} >{item.product_name} - {item.line_total.formatted_with_symbol} (Quantity: {item.quantity}) </li>})}
      </ul>

      <p>Total: {checkoutToken.total.formatted_with_symbol}</p>
    </div>
  )
}

export default Payment